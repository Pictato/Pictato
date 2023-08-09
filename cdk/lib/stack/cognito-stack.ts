import * as cdk from "aws-cdk-lib";
import { Duration } from "aws-cdk-lib";
import * as cognito from "aws-cdk-lib/aws-cognito";

import { Construct } from "constructs";

import { PictatoStackProps } from "../pictato-stack";
import { getAccountUniqueName } from "../config/accounts";
import { SYSTEM_NAME } from "../config/commons";

export class PictatoCognitoStack extends cdk.Stack {
  public userPool: cognito.UserPool;

  constructor(scope: Construct, id: string, props: PictatoStackProps) {
    super(scope, id, props);

    // UserPool 정의
    const userPool = new cognito.UserPool(
      this,
      `${SYSTEM_NAME}-pictato-cognito`,
      {
        userPoolName: `${getAccountUniqueName(
          props.context
        )}-pictato-cognito`.toLowerCase(),
        signInAliases: { username: true },
        passwordPolicy: {
          minLength: 8,
          requireUppercase: false,
          requireLowercase: true,
          requireDigits: true,
          requireSymbols: true,
          tempPasswordValidity: Duration.days(7),
        },
        accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
        selfSignUpEnabled: true,
        userVerification: {
          emailSubject: "Verify your email for our Pictato app!",
          emailBody:
            "Please click the link below to verify your email address. {##Verify Email##}",
          emailStyle: cognito.VerificationEmailStyle.LINK,
        },
        deletionProtection: true,
      }
    );

    // UserPool Client 정의
    const client = userPool.addClient(`${SYSTEM_NAME}-pictato-cognito-client`, {
      userPoolClientName: `${getAccountUniqueName(
        props.context
      )}-pictato-cognito-client`.toLowerCase(),
      preventUserExistenceErrors: true,
      authFlows: { userSrp: true },
    });

    // UserPool Domain
    const domain = userPool.addDomain(`${SYSTEM_NAME}-pictato-cognito-domain`, {
      cognitoDomain: {
        domainPrefix: "pictato",
      },
    });

    this.userPool = userPool;
  }
}
