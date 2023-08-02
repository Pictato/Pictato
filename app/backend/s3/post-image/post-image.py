import json
import base64

import boto3
client = boto3.client('s3')

def lambda_handler(event, context):
    print(event)
    try:
        filename = event['queryStringParameters']['filename']
        image_data = event['body']
        image_file = base64.b64decode(image_data)
        
        print(filename, image_data)

        response = client.put_object(
            Body=image_file,
            Bucket='pictato-s3-bucket',
            Key=filename
        )

        print(response)
        return {
            'statusCode': 200,
            'body': json.dumps('Image uploaded successfully')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
