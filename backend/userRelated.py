import boto3

dynamodb = boto3.resource('dynamodb', region_name='us-east-2');
def create_user(request):
    table = dynamodb.Table('RegisterTable')
    values = request.json['values']
    response = table.put_item(
        Item={
            "userId": values['userId'],
            "password": values['password'],
            "name": values['name']
        })
    return response