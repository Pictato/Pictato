import json
import boto3
import os
from boto3.dynamodb.conditions import Key
from datetime import datetime
from dateutil.relativedelta import relativedelta


def toTimestamp(year, month):
    start_month = datetime(year, month, 1)
    end_month = start_month + relativedelta(months=1)

    start_stamp = str(int(start_month.timestamp()))
    end_stamp = str(int(end_month.timestamp()) - 1)

    return start_stamp, end_stamp


def lambda_handler(event, context):
    target_table = os.environ["TARGET_TABLE"]

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(target_table)

    try:
        user_id = event["params"]["path"]["user_id"]
        year = int(event["params"]["querystring"]["year"])
        month = int(event["params"]["querystring"]["month"])

        start_stamp, end_stamp = toTimestamp(year, month)

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps("data loading loading error!"),
            "error": json.dumps(str(e)),
        }

    try:
        # user-id 속성이 같은 놈들 return
        query = table.query(
            KeyConditionExpression=(
                Key("user-id").eq(user_id)
                & Key("index").between(start_stamp, end_stamp)
            ),
            ScanIndexForward=False,
        )
        # user-id 파티션의 각 튜플들을 dic 형태로 가지는 list
        # [{}, {}, {}]
        items = query["Items"]

        return {"statusCode": 200, "body": items}
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps("query problem"),
            "error": json.dumps(str(e)),
        }
