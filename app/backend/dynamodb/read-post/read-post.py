import json
import boto3
from boto3.dynamodb.conditions import Key
import os


def lambda_handler(event, context):
    target_table = os.environ["TARGET_TABLE"]

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(target_table)

    # 데이터 조회하기 위한 user-id 받아오기
    try:
        userID = event["userId"]
    except:
        return {
            "statusCode": 500,
            "body": json.dumps("userID loading error!"),
        }

    try:
        # user-id 속성이 같은 놈들 return
        query = table.query(KeyConditionExpression=Key("user-id").eq(userID))
        # user-id 파티션의 각 튜플들을 dic 형태로 가지는 list
        # [{}, {}, {}]
        items = query["Items"]

        return {"statusCode": 200, "body": items}
    except:
        return {"statusCode": 500, "body": json.dumps("query problem")}
