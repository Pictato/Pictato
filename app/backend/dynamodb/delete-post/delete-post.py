import json
import boto3
import os


def lambda_handler(event, context):
    target_table = os.environ["TARGET_TABLE"]

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(target_table)

    try:
        index = event["index"]
        userID = event["userId"]

    except:
        return {
            "statusCode": 500,
            "body": json.dumps("Data loading error!"),
            "error": event,
        }

    try:
        table.delete_item(Key={"user-id": userID, "index": index})
    except:
        return {"statusCode": 500, "body": json.dumps("delete item  error!!")}

    return {"statusCode": 200, "body": json.dumps("Delete data successful!!")}
