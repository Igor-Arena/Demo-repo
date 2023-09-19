import {test, expect} from '@playwright/test'

const axios = require('axios')

var UserId: number;

var postData = {
  "id": 12364326444000000,
  "category": {
    "id": 0,
    "name": "Jackie Chan get"
  },
  "name": "bro get",
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
    UserId = response.id
   });


test('PutRequest', async () => {
    const response = await axios.put('https://petstore.swagger.io/v2/pet', 
    { 
      data: {
        "id": 12364326444000000,
        "category": {
          "id": 0,
          "name": "Van Dam"
        },
        "name": "Doggy boggy",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"}
    });
    console.log(response);
    expect(response.status).toBe(200);
   })