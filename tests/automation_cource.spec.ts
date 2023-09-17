import {test, expect} from '@playwright/test'

const axios = require('axios')

var UserId;

var postData = {
  "id": 0,
  "category": {
    "id": 0,
    "name": "Jackie Chan"
  },
  "name": "bro",
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


   test('Post1', async () => {
    const response = await axios.post('https://petstore.swagger.io/v2/pet', 
    {
      data: {"id": 564756345694354938543656,
          "category": {
            "id": 25748354936584760549645,
            "name": "Sharik"
          },
          "name": "SnoopDog",
          "photoUrls": [
            "string"
          ],
          "tags": [
            {
              "id": 49055467549067549685946,
              "name": "string"
            }
          ],
          "status": "available"}
    });
    console.log(response);
    expect(response.status()).toBe(201);
   });


   test('Post2', async () => {
    const response = await axios.post('https://petstore.swagger.io/v2/pet', postData);
    console.log(response);
    expect(response.status()).toBe(201);
    UserId = response.id
   });


   test('Post3', async () => {
    try {
      const response = await axios.post('https://petstore.swagger.io/v2/pet', postData);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
   })


   test('Get', async() => {
    const response = await  axios.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
    console.log(response);
    expect(response.status()).toBe(200);
   });


   test.only('GetById', async() => {
    const response = await axios.get('https://petstore.swagger.io/v2/pet/9223372036854030000');
    console.log(response);
    expect(response.status()).toBe(200);
   });


   test('PutRequest', async () => {
    const response = await axios.put('https://petstore.swagger.io/v2/pet', 
    { 
      data: {
        "id": 0,
        "category": {
          "id": 0,
          "name": "string"
        },
        "name": "doggie_boggy",
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
    expect(response.status()).toBe(200);
   })


   test('Delete', async() => {
    const response = await  axios.get('https://petstore.swagger.io/v2/pet/'+UserId);
    expect(response.status()).toBe(204);
    console.log(response)
   });

  