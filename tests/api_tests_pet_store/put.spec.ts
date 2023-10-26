import {test, expect} from '@playwright/test'
import axios from 'axios';
import { baseApiUrl } from '../../constant';
import {faker, simpleFaker} from '@faker-js/faker';


let randomFirstName = faker.person.firstName();
let randomSecondName = faker.person.lastName();
let randomId = faker.number.int(10);
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
    const response = await axios.post(baseApiUrl, postData);
    petId = response.data.id;
   });

test.afterAll(async () => {
    await axios.delete(`${baseApiUrl}${petId}`);
});


test('PutRequest', async () => {
    const response = await axios.put(baseApiUrl, 
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
    expect(response.data).toMatchObject({
      "id": petId,
      "category": {
        "name": updatedFirstName
      },
      "name": updatedSecondName
    });
   });


