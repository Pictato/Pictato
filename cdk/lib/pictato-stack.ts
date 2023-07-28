import * as cdk from "aws-cdk-lib";

import { Construct } from "constructs";

import { PictatoS3Stack } from "./stack/s3-stack";
import { PictatoLambdaStack } from "./stack/lambda-stack";
import { Account } from "./config/accounts";
import { SYSTEM_NAME } from "./config/commons";

export interface PictatoStackProps extends cdk.StackProps {
  context: Account;
  s3Stack?: PictatoS3Stack;
}

export class PictatoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PictatoStackProps) {
    super(scope, id, props);

    const s3Stack = new PictatoS3Stack(this, `${SYSTEM_NAME}-s3Stack`, props);
    props.s3Stack = s3Stack;

    new PictatoLambdaStack(this, `${SYSTEM_NAME}-lambdaStack`, props);
  }
}
