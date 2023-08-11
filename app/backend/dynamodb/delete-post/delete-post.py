import json
import boto3
import os


def lambda_handler(event, context):
    target_table = os.environ["TARGET_TABLE"]

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(target_table)
    cognito = boto3.client("cognito-idp")

    try:
        access_token = event["params"]["header"]["access-token"]
        cognito_user = cognito.get_user(AccessToken=access_token)
        coginto_user_id = cognito_user["Username"]

        index = event["params"]["path"]["index"]
        user_id = event["params"]["path"]["user_id"]
    except:
        return {
            "statusCode": 500,
            "body": json.dumps("Data loading or cognito error!"),
        }

    if coginto_user_id == user_id:
        try:
            table.delete_item(Key={"user-id": user_id, "index": index})
        except:
            return {"statusCode": 500, "body": json.dumps("delete item  error!!")}

        return {"statusCode": 200, "body": json.dumps("Delete data successful!!")}
    else:
        return {
            "statusCode": 500,
            "body": json.dumps("You tried to delete to another User!!"),
        }
