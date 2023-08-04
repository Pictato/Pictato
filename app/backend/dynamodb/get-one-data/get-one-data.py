import json
import boto3
import os


def lambda_handler(event, context):
    target_table = os.environ["TARGET_TABLE"]

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(target_table)

    try:
        userId = event["userId"]
        index = event["index"]
    except:
        return {"statusCode": 500, "event": event}

    item = table.get_item(Key={"user-id": userId, "index": index})["Item"]

    return {"statusCode": 200, "body": item}
