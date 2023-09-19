import {test, expect} from '@playwright/test'

const axios = require('axios')

var UserId: number;

var postData = {
  "id": 123643311329864000000,
  "category": {
    "id": 0,
    "name": "Jackie Chan get2"
  },
  "name": "bro get2",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
 };


test.beforeAll(async () => {
    const response = await axios.post('https://petstore.swagger.io/v2/pet', postData);
    console.log(response);
    expect(response.status).toBe(200);
    UserId = response.id
   });

test('Get', async () => {
    const response = await axios.get('https://petstore.swagger.io/v2/pet/'+UserId);
    console.log(response);
    expect(response.status).toBe(200);
})