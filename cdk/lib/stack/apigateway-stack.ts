import * as cdk from "aws-cdk-lib";

import { Construct } from "constructs";

import { PictatoStackProps } from "../pictato-stack";
import { getAccountUniqueName } from "../config/accounts";
import { SYSTEM_NAME } from "../config/commons";

import * as apigateway from "aws-cdk-lib/aws-apigateway";

import { PictatoLambdaStack } from "./lambda-stack";
import { requestTemplate } from "./mapping-template";

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
          "application/json": requestTemplate,
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

    // POST ./{user-id}
    const createRequest = userId.addMethod(
      "POST",
      new apigateway.LambdaIntegration(lambdaStack.lambdaCreatePostFunction, {
        proxy: false,
        requestTemplates: {
          "application/json": requestTemplate,
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
          "application/json": requestTemplate,
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

    // DELETE ./{user-id}/{index}
    const deletePostRequest = index.addMethod(
      "DELETE",
      new apigateway.LambdaIntegration(lambdaStack.lambdaDeletePostFunction, {
        proxy: false,
        requestTemplates: {
          "application/json": requestTemplate,
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
        contentHandling: apigateway.ContentHandling.CONVERT_TO_TEXT,
        proxy: false,
        requestTemplates: {
          "multipart/form-data": requestTemplate,
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

    // GET ./{user-id}/image
    const getImageRequest = image.addMethod(
      "GET",
      new apigateway.LambdaIntegration(lambdaStack.lambdaGetImageFunction, {
        proxy: false,
        requestTemplates: {
          "application/json": requestTemplate,
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

    getImageRequest.addMethodResponse({
      statusCode: "200",
      responseParameters: {
        "method.response.header.Access-Control-Allow-Origin": true,
      },
    });
  }
}
