import json
import boto3
import os
import time
from datetime import datetime


def lambda_handler(event, context):
    target_table = os.environ["TARGET_TABLE"]

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(target_table)

    try:
        index = str(int(time.time()))
        date = str(datetime.fromtimestamp(int(time.time())))
        userID = event["params"]["path"]["user_id"]

        fileName = event["body-json"]["fileName"]
        memo = event["body-json"]["memo"]
    except:
        return {
            "statusCode": 500,
            "body": json.dumps("Data loading error!"),
        }

    try:
        table.put_item(
            Item={
                "user-id": userID,
                "index": index,
                "file-name": fileName,
                "memo": memo,
                "date": date,
            }
        )
    except:
        return {"statusCode": 500, "body": json.dumps("put item error!!")}

    return {"statusCode": 200, "body": json.dumps("Add in DB successful!!")}
