#!/usr/bin/env node
import "source-map-support/register";

import * as cdk from "aws-cdk-lib";

import { PictatoStack } from "../lib/pictato-stack";
import { getAccountUniqueName, getDevAccount } from "../lib/config/accounts";

const app = new cdk.App();
const devAccount = getDevAccount("team2");
if (devAccount !== undefined) {
  new PictatoStack(app, `${getAccountUniqueName(devAccount)}`, {
    env: devAccount,
    context: devAccount,
  });
}

app.synth();
