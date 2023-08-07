import json
import boto3
import base64
import os


def lambda_handler(event, context):
    s3_client = boto3.client("s3")
    try:
        filename = event["params"]["querystring"]["filename"]
        bucket_name = os.environ("TARGET_BUCKET")
        response = s3_client.get_object(
            Bucket=bucket_name,
            Key=filename,
        )
        image_file_to_download = response["Body"].read()
        encoded_image = base64.b64encode(image_file_to_download).decode("utf-8")
        return {"statusCode": 200, "body": encoded_image, "isBase64Encoded": True}
    except Exception as e:
        return {"statusCode": 500, "body": json.dumps(f"Error: {str(e)}")}
