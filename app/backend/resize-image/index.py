import json
import boto3
import os
from PIL import Image
from io import BytesIO

s3 = boto3.client("s3")


def resize_image(image_data):
    image = Image.open(BytesIO(image_data))
    new_width = 300
    new_height = int(image.height * (new_width / image.width))
    resized_image = image.resize((new_width, new_height))

    output_buffer = BytesIO()
    resized_image.save(output_buffer, format="JPEG")
    return output_buffer.getvalue()


def lambda_handler(event, context):
    try:
        bucket = event["Records"][0]["s3"]["bucket"]["name"]
        key = event["Records"][0]["s3"]["object"]["key"]

        if key.startswith("resized/"):
            print("Image already resized:", key)
            return {"statusCode": 200, "body": json.dumps("Image already resized.")}

        response = s3.get_object(Bucket=bucket, Key=key)
        image_data = response["Body"].read()

        resized_image = resize_image(image_data)

        target_bucket = os.environ["TARGET_BUCKET"]
        target_key = "resized/" + key
        s3.put_object(Bucket=target_bucket, Key=target_key, Body=resized_image)

        return {"statusCode": 200, "body": json.dumps("Image resized successfully!")}

    except Exception as e:
        print("Error:", e)
        return {"statusCode": 500, "body": json.dumps("Image resizing failed.")}
