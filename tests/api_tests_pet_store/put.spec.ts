import {test, expect} from '@playwright/test'
import axios from 'axios';
import { baseUrl } from '../global_settings/constant';
import {faker, simpleFaker} from '@faker-js/faker';


let randomFirstName = faker.person.firstName();
let randomSecondName = faker.person.lastName();
let randomId = simpleFaker.string.numeric(10);
let updatedFirstName = faker.person.firstName();
let updatedSecondName = faker.person.lastName();
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


test.beforeAll(async () => {
    const response = await axios.post(baseUrl, postData);
    petId = response.data.id;
    expect(response.status).toBe(200);
   });

test.afterAll(async () => {
    await axios.delete(`${baseUrl}${petId}`);
});


test('PutRequest', async () => {
    const response = await axios.put(baseUrl, 
    { 
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
        "status": "available"
    });
    expect(response.status).toBe(200);
    expect(response.data.category.name).toEqual(updatedFirstName);
    expect(response.data.name).toEqual(updatedSecondName);
   });


