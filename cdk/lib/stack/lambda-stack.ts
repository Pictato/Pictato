import * as cdk from "aws-cdk-lib";
import {
  ManagedPolicy,
  Role,
  ServicePrincipal,
  CompositePrincipal,
} from "aws-cdk-lib/aws-iam";
import { LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { PythonFunction } from "@aws-cdk/aws-lambda-python-alpha";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3n from "aws-cdk-lib/aws-s3-notifications";

import * as path from "path";

import { Construct } from "constructs";

import { getAccountUniqueName } from "../config/accounts";
import { PictatoStackProps } from "../pictato-stack";
import { SYSTEM_NAME } from "../config/commons";

export class PictatoLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PictatoStackProps) {
    super(scope, id, props);

    //lambda와 s3를 위한 role
    const lambdaRoleForS3 = new Role(this, `${SYSTEM_NAME}-lambda-role`, {
      roleName: `${getAccountUniqueName(props.context)}-lambda-role`,
      assumedBy: new CompositePrincipal(
        new ServicePrincipal("lambda.amazonaws.com")
      ),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
        ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess"),
      ],
    });

    //lambda와 dynamodb를 위한 role
    const lambdaRole_for_dynamo = new Role(
      this,
      `${SYSTEM_NAME}-lambda-dynamo-role`,
      {
        roleName: `${getAccountUniqueName(props.context)}-lambda-dynamo-role`,
        assumedBy: new CompositePrincipal(
          new ServicePrincipal("lambda.amazonaws.com")
        ),
        managedPolicies: [
          ManagedPolicy.fromAwsManagedPolicyName(
            "service-role/AWSLambdaBasicExecutionRole"
          ),
          ManagedPolicy.fromAwsManagedPolicyName("AmazonDynamoDBFullAccess"),
        ],
      }
    );

    // 이미지 리사이징
    const bucket = s3.Bucket.fromBucketName(
      this,
      "ExistingBucket",
      `${getAccountUniqueName(props.context)}-pictato-bucket`.toLowerCase()
    );

    const imageResizerFunction = new PythonFunction(
      this,
      `${SYSTEM_NAME}-resize-image`,
      {
        functionName: `${getAccountUniqueName(props.context)}-resize-image`,
        runtime: Runtime.PYTHON_3_10,
        entry: path.join(__dirname, "../../../app/backend/resize-image"),
        index: "index.py",
        handler: "lambda_handler",
        role: lambdaRoleForS3,
        timeout: cdk.Duration.seconds(10),
        environment: {
          TARGET_BUCKET: bucket.bucketName,
        },
      }
    );
    imageResizerFunction.addLayers(
      LayerVersion.fromLayerVersionArn(
        this,
        "Pillow",
        "arn:aws:lambda:ap-northeast-2:770693421928:layer:Klayers-p310-Pillow:2"
      )
    );

    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(imageResizerFunction),
      {
        prefix: "",
      }
    );

    bucket.grantReadWrite(imageResizerFunction);
  }
}
