import json
import boto3
import base64

client = boto3.client('s3')

def lambda_handler(event, context):
    print(event)
    bucket_name = event['queryStringParameters']['bucketname']
    image_file_name = event['queryStringParameters']['filename']
    print('Bucket Name: ', bucket_name)
    print("Image file name: ", image_file_name)
    response = client.get_object(
        Bucket=bucket_name, 
        Key=image_file_name,
    )
    print("response from s3: ", response)
    image_file_to_download=response['Body'].read()
    
    return {
        'statusCode': 200,
        'body': base64.b64encode(image_file_to_download),
        'isBase64Encoded': True
    }
