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
      binaryMediaTypes: ["multipart/form-data"],
    });
    const users = api.root.addResource("gallery");
    const userId = users.addResource("{user_id}");
    const index = userId.addResource("{index}");

    // GET ./{user-id}
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

    // POST {user-id}
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

    // GET ./{user-id}/{index}
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

    // POST ./{user-id}/{index}
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

    // POST ./{user-id}/image
    const image = userId.addResource("image");
    const postImageRequest = image.addMethod(
      "POST",
      new apigateway.LambdaIntegration(lambdaStack.lambdaPostImageFunction, {
        proxy: false,
        requestTemplates: {
          "multipart/form-data": `##  See http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html
          ##  This template will pass through all parameters including path, querystring, header, stage variables, and context through to the integration endpoint via the body/payload
          #set($allParams = $input.params())
          {
          "body-json" : $input.json('$'),
          "params" : {
          #foreach($type in $allParams.keySet())
              #set($params = $allParams.get($type))
          "$type" : {
              #foreach($paramName in $params.keySet())
              "$paramName" : "$util.escapeJavaScript($params.get($paramName))"
                  #if($foreach.hasNext),#end
              #end
          }
              #if($foreach.hasNext),#end
          #end
          },
          "stage-variables" : {
          #foreach($key in $stageVariables.keySet())
          "$key" : "$util.escapeJavaScript($stageVariables.get($key))"
              #if($foreach.hasNext),#end
          #end
          },
          "context" : {
              "account-id" : "$context.identity.accountId",
              "api-id" : "$context.apiId",
              "api-key" : "$context.identity.apiKey",
              "authorizer-principal-id" : "$context.authorizer.principalId",
              "caller" : "$context.identity.caller",
              "cognito-authentication-provider" : "$context.identity.cognitoAuthenticationProvider",
              "cognito-authentication-type" : "$context.identity.cognitoAuthenticationType",
              "cognito-identity-id" : "$context.identity.cognitoIdentityId",
              "cognito-identity-pool-id" : "$context.identity.cognitoIdentityPoolId",
              "http-method" : "$context.httpMethod",
              "stage" : "$context.stage",
              "source-ip" : "$context.identity.sourceIp",
              "user" : "$context.identity.user",
              "user-agent" : "$context.identity.userAgent",
              "user-arn" : "$context.identity.userArn",
              "request-id" : "$context.requestId",
              "resource-id" : "$context.resourceId",
              "resource-path" : "$context.resourcePath"
              }
          }
          `,
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

    postImageRequest.addMethodResponse({
      statusCode: "200",
      responseParameters: {
        "method.response.header.Access-Control-Allow-Origin": true,
      },
    });
  }
}
