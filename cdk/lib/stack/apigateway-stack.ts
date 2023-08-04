import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";

import { Construct } from "constructs";

import { PictatoStackProps } from "../pictato-stack";
import { getAccountUniqueName } from "../config/accounts";
import { SYSTEM_NAME } from "../config/commons";

import * as apigateway from "aws-cdk-lib/aws-apigateway";
import {
  ManagedPolicy,
  Role,
  ServicePrincipal,
  CompositePrincipal,
} from "aws-cdk-lib/aws-iam";
import { PictatoLambdaStack } from "./lambda-stack";

export class PictatoApiGatewayStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: PictatoStackProps,
    lambdaStack: PictatoLambdaStack
  ) {
    super(scope, id, props);

    const lambdaAccessRole = new Role(
      this,
      `${getAccountUniqueName(props.context)}-api-lambda-access-role`,
      {
        assumedBy: new CompositePrincipal(
          new ServicePrincipal("lambda.amazonaws.com")
        ),
        managedPolicies: [
          ManagedPolicy.fromAwsManagedPolicyName(
            "service-role/AWSLambdaBasicExecutionRole"
          ),
        ],
      }
    );

    const api = new apigateway.RestApi(this, `${SYSTEM_NAME}-pictato-api`, {
      endpointConfiguration: {
        types: [apigateway.EndpointType.REGIONAL],
      },
      restApiName: `${getAccountUniqueName(
        props.context
      )}-pictato-api`.toLowerCase(),
      deployOptions: {
        stageName: "dev",
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
        ],
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowCredentials: true,
        allowOrigins: ["*"],
      },
    });
    const users = api.root.addResource("gallery");
    const userId = users.addResource("{user_id}");

    userId.addMethod(
      "GET",
      new apigateway.LambdaIntegration(lambdaStack.lambdaReadPostFunction, {
        proxy: false,
        requestTemplates: {
          "application/json": `{
              "userId": "$input.params('user_id')"
            }`,
        },
      })
    );

    userId.addMethod(
      "POST",
      new apigateway.LambdaIntegration(lambdaStack.lambdaCreatePostFunction, {
        proxy: false,
        requestTemplates: {
          "application/json": `{
            "userId": "$input.params('user_id')",
            "requestBody": $input.json("$")
            }`,
        },
      })
    );
  }
}
