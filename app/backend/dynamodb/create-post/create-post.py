import json
import boto3
import base64
import os
import time
from datetime import datetime


def lambda_handler(event, context):
    target_table = os.environ["TARGET_TABLE"]
    target_bucket = os.environ["TARGET_BUCKET"]

    s3 = boto3.client("s3")
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

        form_data = event["body-json"]
        decoded_form = base64.b64decode(form_data)
        image_start = decoded_form.index(b"\xff\xd8")
        image_end = decoded_form.rindex(b"\xff\xd9")
        if image_start == -1 or image_end == -1:
            raise ValueError("Invalid image data")
        decoded_image = decoded_form[image_start : image_end + 2]
        decoded_string = decoded_form[image_end + 2 :].decode("utf-8").split("\r\n")

        file_name = f"{index}_{decoded_string[4]}"
        memo = decoded_string[8]

        key_for_resize = f"before-resize/{user_id}/{file_name}"
    except:
        return {
            "statusCode": 500,
            "body": json.dumps("Data loading or cognito error!"),
        }

    if coginto_user_id == user_id:
        try:
            s3.put_object(
                Body=decoded_image,
                Bucket=target_bucket,
                Key=key_for_resize,
                ContentType="image/jpeg",
            )
            table.put_item(
                Item={
                    "user-id": user_id,
                    "index": index,
                    "file-name": file_name,
                    "memo": memo,
                    "date": date,
                }
            )
        except:
            return {"statusCode": 500, "body": json.dumps("put item/object error!!")}

        return {"statusCode": 200, "body": json.dumps("Add in DB ans S3 successful!!")}
    else:
        return {
            "statusCode": 500,
            "body": json.dumps("You tried to upload to another User!!"),
        }
