import * as cdk from "aws-cdk-lib";
import { AttributeType, BillingMode, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';

import { Construct } from "constructs";

import { PictatoStackProps } from "../pictato-stack";
import { getAccountUniqueName } from "../config/accounts";
import { SYSTEM_NAME } from "../config/commons";

export class PictatoDynamoStack extends cdk.Stack {
  public promptTable: ITable

  constructor(scope: Construct, id: string, props: PictatoStackProps) {
    super(scope, id, props);

    this.promptTable = new Table(this, `${SYSTEM_NAME}-pictato-table`, {
      tableName: `${getAccountUniqueName(props.context)}-pictato-table`.toLowerCase(),
            partitionKey: {
                name: 'user-id',
                type: AttributeType.STRING
            },
            sortKey: {
              name:'index',
              type: AttributeType.STRING
            },
            billingMode: BillingMode.PAY_PER_REQUEST,
    })

  }
}