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

        content_type = event["params"]["header"]["content-type"]

        boundary = "--" + content_type.split("=")[1]
        boundary = bytes(boundary, "utf-8")

        parsed = decoded_form.split(boundary)
        image_data = parsed[1].split(b"Content-Type: ")[1]
        filename_data = parsed[2].decode("utf-8").split("\r\n")
        memo_data = parsed[3].decode("utf-8").split("\r\n")

        # print("====================================================")
        # print(image_data)
        # print("====================================================")
        # print(filename_data)
        # print("====================================================")
        # print(memo_data)

        if image_data.find(b"jpeg" or b"jpg") >= 0:
            image_start = image_data.index(b"\xff\xd8")
            decoded_image = image_data[image_start:]
        elif image_data.find(b"png") >= 0:
            image_start = image_data.index(b"\x89PNG")
            decoded_image = image_data[image_start:]

        file_name = f"{index}_{filename_data[3]}"
        memo = memo_data[3]

        key_for_resize = f"before-resize/{user_id}/{file_name}"

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps("Data loading or cognito error!"),
            "error": json.dumps(str(e)),
        }

    if coginto_user_id == user_id:
        try:
            s3.put_object(
                Body=decoded_image,
                Bucket=target_bucket,
                Key=key_for_resize,
                ContentType="image/*",
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
        except Exception as e:
            print(e)
            return {"statusCode": 500, "body": json.dumps("put item/object error!!")}

        return {"statusCode": 200, "body": json.dumps("Add in DB ans S3 successful!!")}
    else:
        return {
            "statusCode": 500,
            "body": json.dumps("You tried to upload to another User!!"),
        }
