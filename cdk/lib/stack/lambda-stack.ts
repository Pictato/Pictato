import * as cdk from "aws-cdk-lib";
import {
  ManagedPolicy,
  Role,
  ServicePrincipal,
  CompositePrincipal,
} from "aws-cdk-lib/aws-iam";

import { Construct } from "constructs";

import { getAccountUniqueName } from "../config/accounts";
import { PictatoStackProps } from "../pictato-stack";
import { SYSTEM_NAME } from "../config/commons";

export class PictatoLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PictatoStackProps) {
    super(scope, id, props);

    const lambdaRole = new Role(this, `${SYSTEM_NAME}-lambda-role`, {
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

    // function here
  }
}
