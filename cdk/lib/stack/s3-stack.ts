import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";

import { Construct } from "constructs";

import { PictatoStackProps } from "../pictato-stack";
import { getAccountUniqueName } from "../config/accounts";
import { SYSTEM_NAME } from "../config/commons";

export class PictatoS3Stack extends cdk.Stack {
  public bucket: s3.IBucket;

  constructor(scope: Construct, id: string, props: PictatoStackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, `${SYSTEM_NAME}-S3`, {
      bucketName: `${getAccountUniqueName(
        props.context
      )}-pictato-bucket`.toLowerCase(),
      publicReadAccess: false,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        sid: "AddPerm",
        effect: iam.Effect.ALLOW,
        principals: [new iam.AnyPrincipal()],
        actions: ["s3:GetObject"],
        resources: ["arn:aws:s3:::team2-icn-pictato-bucket/*"],
      })
    );
    this.bucket = bucket;
  }
}
