import json
import boto3
import io
import time
from datetime import datetime


def lambda_handler(event, context):
    target_table = io.envrion["TARGET_TABLE"]

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(target_table)

    try:
        index = str(int(time.time()))
        date = str(datetime.fromtimestamp(int(time.time())))
        userID = event["userId"]

        fileName = event["requestBody"]["fileName"]
        memo = event["requestBody"]["memo"]
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
