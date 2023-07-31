import json
import boto3
from boto3.dynamodb.conditions import Key
import io


def lambda_handler(event, context):
    target_table = io.envrion["TARGET_TABLE"]

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(target_table)

    # 삭제하기 위한 user-id, index 받아오기 > 이후 수정 필요
    userID = event["user-id"]
    index = event["index"]

    # user-id 와 index 를 통해 튜플 삭제
    table.delete_item(Key={"user-id": userID, "index": index})

    return {"statusCode": 200, "body": json.dumps({"message": "delete post complete!"})}
