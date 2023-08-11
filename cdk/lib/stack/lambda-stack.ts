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

import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

import * as path from "path";

import { Construct } from "constructs";

import { getAccountUniqueName } from "../config/accounts";
import { PictatoStackProps } from "../pictato-stack";
import { SYSTEM_NAME } from "../config/commons";

export class PictatoLambdaStack extends cdk.Stack {
  public lambdaReadPostFunction: PythonFunction;
  public lambdaCreatePostFunction: PythonFunction;
  public lambdaDeletePostFunction: PythonFunction;
  public lambdaGetOneDataFunction: PythonFunction;
  public lambdaPostImageFunction: PythonFunction;
  public lambdaGetImageFunction: PythonFunction;

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
    const lambdaRoleForDynamo = new Role(
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

    //lambda와 dynamodb를 위한 role
    const lambdaRoleForDynamoAndS3 = new Role(
      this,
      `${SYSTEM_NAME}-lambda-dynamo-s3-role`,
      {
        roleName: `${getAccountUniqueName(
          props.context
        )}-lambda-dynamo-s3-role`,
        assumedBy: new CompositePrincipal(
          new ServicePrincipal("lambda.amazonaws.com")
        ),
        managedPolicies: [
          ManagedPolicy.fromAwsManagedPolicyName(
            "service-role/AWSLambdaBasicExecutionRole"
          ),
          ManagedPolicy.fromAwsManagedPolicyName("AmazonDynamoDBFullAccess"),
          ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess"),
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
        prefix: "before-resize/",
      }
    );

    bucket.grantReadWrite(imageResizerFunction);

    const table = dynamodb.Table.fromTableName(
      this,
      "pictatoTable",
      `${getAccountUniqueName(props.context)}-pictato-table`.toLowerCase()
    );

    // POST create post lambda function
    const createPostFunction = new PythonFunction(
      this,
      `${SYSTEM_NAME}-create-post`,
      {
        functionName: `${getAccountUniqueName(props.context)}-create-post`,
        runtime: Runtime.PYTHON_3_10,
        entry: path.join(
          __dirname,
          "../../../app/backend/dynamodb/create-post"
        ),
        index: "create-post.py",
        handler: "lambda_handler",
        role: lambdaRoleForDynamoAndS3,
        environment: {
          TARGET_BUCKET: bucket.bucketName,
          TARGET_TABLE: table.tableName,
        },
        timeout: cdk.Duration.seconds(10),
      }
    );
    this.lambdaCreatePostFunction = createPostFunction;

    //GET read post lambda function
    const readPostFunction = new PythonFunction(
      this,
      `${SYSTEM_NAME}-read-post`,
      {
        functionName: `${getAccountUniqueName(props.context)}-read-post`,
        runtime: Runtime.PYTHON_3_10,
        entry: path.join(__dirname, "../../../app/backend/dynamodb/read-post"),
        index: "read-post.py",
        handler: "lambda_handler",
        role: lambdaRoleForDynamo,
        environment: {
          TARGET_TABLE: table.tableName,
        },
      }
    );
    this.lambdaReadPostFunction = readPostFunction;

    // DELETE post lambda function
    const deletePostFunction = new PythonFunction(
      this,
      `${SYSTEM_NAME}-delete-post`,
      {
        functionName: `${getAccountUniqueName(props.context)}-delete-post`,
        runtime: Runtime.PYTHON_3_10,
        entry: path.join(
          __dirname,
          "../../../app/backend/dynamodb/delete-post"
        ),
        index: "delete-post.py",
        handler: "lambda_handler",
        role: lambdaRoleForDynamo,
        environment: {
          TARGET_TABLE: table.tableName,
        },
      }
    );
    this.lambdaDeletePostFunction = deletePostFunction;

    // GET one data lambda function
    const getOneDataFunction = new PythonFunction(
      this,
      `${SYSTEM_NAME}-get-one-data`,
      {
        functionName: `${getAccountUniqueName(props.context)}-get-one-data`,
        runtime: Runtime.PYTHON_3_10,
        entry: path.join(
          __dirname,
          "../../../app/backend/dynamodb/get-one-data"
        ),
        index: "get-one-data.py",
        handler: "lambda_handler",
        role: lambdaRoleForDynamo,
        environment: {
          TARGET_TABLE: table.tableName,
        },
      }
    );
    this.lambdaGetOneDataFunction = getOneDataFunction;

    // Post image lambdag function
    const postImageFunction = new PythonFunction(
      this,
      `${SYSTEM_NAME}-post-image`,
      {
        functionName: `${getAccountUniqueName(props.context)}-post-image`,
        runtime: Runtime.PYTHON_3_10,
        entry: path.join(__dirname, "../../../app/backend/s3/post-image"),
        index: "post-image.py",
        handler: "lambda_handler",
        role: lambdaRoleForS3,
        environment: {
          TARGET_BUCKET: bucket.bucketName,
        },
      }
    );
    this.lambdaPostImageFunction = postImageFunction;

    // GET image lambdag function
    const getImageFunction = new PythonFunction(
      this,
      `${SYSTEM_NAME}-get-image`,
      {
        functionName: `${getAccountUniqueName(props.context)}-get-image`,
        runtime: Runtime.PYTHON_3_10,
        entry: path.join(__dirname, "../../../app/backend/s3/get-image"),
        index: "get-image.py",
        handler: "lambda_handler",
        role: lambdaRoleForS3,
        environment: {
          TARGET_BUCKET: bucket.bucketName,
        },
      }
    );
    this.lambdaGetImageFunction = getImageFunction;
  }
}
