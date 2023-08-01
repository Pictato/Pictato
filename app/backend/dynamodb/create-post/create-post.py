import json
import boto3
import io


def lambda_handler(event, context):
    target_table = io.envrion["TARGET_TABLE"]

    response_body = json.loads(event["body"])

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(target_table)

    # 일단은 event에 데이터 담겨온다 가정하고 코드 작성
    userID = response_body["user-id"]
    index = response_body["index"]
    memo = response_body["memo"]
    imageFile = response_body["image-file"]

    table.put_item(
        Item={
            "user-id": userID,
            "index": index,
            "image-file-name": imageFile,
            "memo": memo,
        }
    )

    return {"statusCode": 200, "body": json.dumps({"message": "db upload complete!"})}
