import boto3

dynamodb = boto3.resource('dynamodb', region_name='us-east-2');
def create_job(request):
    table = dynamodb.Table('addJob')
    values = request.json['values']
    response = table.put_item(
        Item=values)
    return response