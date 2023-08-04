import * as cdk from "aws-cdk-lib";

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
import { Service } from "aws-cdk-lib/aws-servicediscovery";

export class PictatoApiGatewayStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: PictatoStackProps,
    lambdaStack: PictatoLambdaStack
  ) {
    super(scope, id, props);

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

    const readRequest = userId.addMethod(
      "GET",
      new apigateway.LambdaIntegration(lambdaStack.lambdaReadPostFunction, {
        proxy: false,
        requestTemplates: {
          "application/json": `{
              "userId": "$input.params('user_id')"
            }`,
        },
        integrationResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Origin": "'*'",
            },
          },
        ],
      })
    );

    readRequest.addMethodResponse({
      statusCode: "200",
      responseParameters: {
        "method.response.header.Access-Control-Allow-Origin": true,
      },
    });

    const createRequest = userId.addMethod(
      "POST",
      new apigateway.LambdaIntegration(lambdaStack.lambdaCreatePostFunction, {
        proxy: false,
        requestTemplates: {
          "application/json": `{
            "userId": "$input.params('user_id')",
            "requestBody": $input.json("$")
            }`,
        },
        integrationResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Origin": "'*'",
            },
          },
        ],
      })
    );

    createRequest.addMethodResponse({
      statusCode: "200",
      responseParameters: {
        "method.response.header.Access-Control-Allow-Origin": true,
      },
    });

    const index = userId.addResource("{index}");

    const oneDataRequest = index.addMethod(
      "GET",
      new apigateway.LambdaIntegration(lambdaStack.lambdaGetOneDataFunction, {
        proxy: false,
        requestTemplates: {
          "application/json": `{
              "userId": "$input.params('user_id')",
              "index": "$input.params('index')"
            }`,
        },
        integrationResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Origin": "'*'",
            },
          },
        ],
      })
    );

    oneDataRequest.addMethodResponse({
      statusCode: "200",
      responseParameters: {
        "method.response.header.Access-Control-Allow-Origin": true,
      },
    });

    const deletePostRequest = index.addMethod(
      "DELETE",
      new apigateway.LambdaIntegration(lambdaStack.lambdaDeletePostFunction, {
        proxy: false,
        requestTemplates: {
          "application/json": `{
              "userId": "$input.params('user_id')",
              "index": "$input.params('index')"
            }`,
        },
        integrationResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Origin": "'*'",
            },
          },
        ],
      })
    );

    deletePostRequest.addMethodResponse({
      statusCode: "200",
      responseParameters: {
        "method.response.header.Access-Control-Allow-Origin": true,
      },
    });
  }
}
