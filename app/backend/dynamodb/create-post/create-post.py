import json
import boto3
import os
import time
from datetime import datetime


def lambda_handler(event, context):
    target_table = os.environ["TARGET_TABLE"]

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(target_table)
    cognito = boto3.client("cognito-idp")

    try:
        access_token = event["params"]["header"]["access-token"]
        cognito_user = cognito.get_user(AccessToken=access_token)
        coginto_user_id = cognito_user["Username"]

        index = str(int(time.time()))
        date = str(datetime.fromtimestamp(int(time.time())))
        user_id = event["params"]["path"]["user_id"]

        fileName = event["body-json"]["fileName"]
        memo = event["body-json"]["memo"]
    except:
        return {
            "statusCode": 500,
            "body": json.dumps("Data loading or cognito error!"),
        }

    if coginto_user_id == user_id:
        try:
            table.put_item(
                Item={
                    "user-id": user_id,
                    "index": index,
                    "file-name": fileName,
                    "memo": memo,
                    "date": date,
                }
            )
        except:
            return {"statusCode": 500, "body": json.dumps("put item error!!")}

        return {"statusCode": 200, "body": json.dumps("Add in DB successful!!")}
    else:
        return {
            "statusCode": 500,
            "body": json.dumps("You tried to upload to another User!!"),
        }
