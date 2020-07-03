'use strict'

const AWS = require('aws-sdk')

const tableName = process.env.DDB_TABLE
const docClient = new AWS.DynamoDB.DocumentClient()

exports.todoCount = (event, context, callback) => {
  console.log('Received Event:', JSON.stringify(event))

  const params = {
    TableName: tableName,
    Select: 'COUNT'
  }

  docClient.scan(params, (err, data) => {
    console.log(data)
    if (err) {
      console.log(err)
      callback(err)
    }

    console.log(`Returning Count of ToDos = ${data.Count}`)
    callback(null, data.Count)
  })
}
