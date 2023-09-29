import {test, expect} from '@playwright/test'
import axios from 'axios';
import { postAndGetPet } from '../Global_settings/fake_global_values';
import {faker, simpleFaker} from '@faker-js/faker';

let petId: number;
let randomFirstName = faker.person.firstName(undefined);
let randomSecondName = faker.person.lastName(undefined);
let randomId = simpleFaker.string.numeric(10);
let updatedFirstName = faker.person.firstName(undefined);
let updatedSecondName = faker.person.firstName(undefined);

let postData = {
  "id": randomId,
  "category": {
    "id": 0,
    "name": randomFirstName
  },
  "name": randomSecondName,
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
    const response = await axios.post(postAndGetPet, postData);
    console.log(response);
    expect(response.status).toBe(200);
    petId = response.data.id;
   });


test('PutRequest', async () => {
    const response = await axios.put(postAndGetPet, 
    { 
      data: {
        "id": petId,
        "category": {
          "id": 0,
          "name": updatedFirstName
        },
        "name": updatedSecondName,
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
   });