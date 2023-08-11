import json
import base64
import boto3
import os


def lambda_handler(event, context):
    bucket_name = os.environ["TARGET_BUCKET"]

    client = boto3.client("s3")
    cognito = boto3.client("cognito-idp")
    try:
        access_token = event["params"]["header"]["access-token"]
        cognito_user = cognito.get_user(AccessToken=access_token)
        coginto_user_id = cognito_user["Username"]

        user_id = event["params"]["path"]["user_id"]
        image_data = event["body-json"]
        filename = event["params"]["querystring"]["filename"]
    except Exception as e:
        return {"statusCode": 500, "body": json.dumps(f"Error: {str(e)}")}

    if coginto_user_id == user_id:
        try:
            image_decode = base64.b64decode(image_data)
            image_start = image_decode.index(b"\xff\xd8")
            image_end = image_decode.rindex(b"\xff\xd9")
            if image_start == -1 or image_end == -1:
                raise ValueError("Invalid image data")
            decoded_image = image_decode[image_start : image_end + 2]
            response = client.put_object(
                Body=decoded_image,
                Bucket=bucket_name,
                Key=filename,
                ContentType="image/jpeg",
            )

            return {
                "statusCode": 200,
                "body": json.dumps("Image uploaded successfully"),
            }
        except:
            return {"statusCode": 500, "body": json.dumps("Image uploading error!")}
    else:
        return {
            "statusCode": 500,
            "body": json.dumps("You tried to upload to another User!!"),
        }
