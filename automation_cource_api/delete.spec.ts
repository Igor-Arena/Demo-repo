import {test, expect} from '@playwright/test'

const axios = require('axios')

var UserId: number;

var postData = {
  "id": 123643267884000000,
  "category": {
    "id": 0,
    "name": "Jackie Chan delete"
  },
  "name": "bro delete",
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
    UserId = response.id;
   });


test('Delete', async () => {
    const response = await axios.delete('https://petstore.swagger.io/v2/pet/'+UserId);
    expect(response.status).toBe(404);
    console.log(response);
})