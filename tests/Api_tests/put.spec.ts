import {test, expect} from '@playwright/test'
import axios from 'axios';
import { postAndGetPet } from '../Global_settings/constant';
import {faker, simpleFaker} from '@faker-js/faker';


let randomFirstName = faker.person.firstName();
let randomSecondName = faker.person.lastName();
let randomId = simpleFaker.string.numeric(10);
let updatedFirstName = faker.person.firstName();
let updatedSecondName = faker.person.firstName();
let petId: number;


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
    expect(response.status).toBe(200);
   });


test.afterAll(async () => {
    await axios.delete(`${postAndGetPet}${petId}`);
});