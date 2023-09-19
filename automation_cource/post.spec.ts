import {test, expect} from '@playwright/test'

const axios = require('axios')

var UserId: number;

var postData = {
  "id": 1236433264000000,
  "category": {
    "id": 0,
    "name": "Arnold"
  },
  "name": "terminator",
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


test('Post', async () => {
    const response = await axios.post('https://petstore.swagger.io/v2/pet', postData);
    console.log(response);
    expect(response.status).toBe(200);
   });