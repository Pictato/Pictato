import json
import boto3
from boto3.dynamodb.conditions import Key
import io


def lambda_handler(event, context):
    target_table = io.envrion["TARGET_TABLE"]

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(target_table)

    userID = event["user-id"]

    # user-id 속성이 같은 놈들 return
    query = table.query(KeyConditionExpression=Key("user-id").eq(userID))

    # user-id 파티션의 각 튜플들을 dic 형태로 가지는 list
    # [{}, {}, {}]
    items = query["Items"]

    return {"statusCode": 200, "body": json.dumps(items)}
