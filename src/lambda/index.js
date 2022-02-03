const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');
const AWSXRay = require('aws-xray-sdk');

// code outside the handler
const client = AWSXRay.captureAWSv3Client(new SSMClient({}));
let value;

module.exports.handler = async () => {

  // check if values is cached
  if (!value) {
    const params = {
      Name: process.env.SSM_PARAMETER,
    };

    const { Parameter } = await client.send(new GetParameterCommand(params));
    value = Parameter.Value;
  }

  return value;
};