import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event) => {
  const params = {
    TableName: "posts",
  };

  try {
    const data = await client.send(new ScanCommand(params));
    const items = data.Items;

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
