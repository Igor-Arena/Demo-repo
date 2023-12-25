import {test, expect} from '@playwright/test';
import axios from 'axios';
import {faker, simpleFaker} from '@faker-js/faker'
import { baseApiUrl } from '../../../constant';


let randomFirstName = faker.person.firstName();
let randomSecondName = faker.person.lastName();
let randomId = faker.number.int(10);
let petId: number;


let postData = {
  "id": randomId,
  "category": {
    "id": 0,
    "name": randomFirstName,
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

test('Get', async () => {
    const response = await axios.get(`${baseApiUrl}${petId}`);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(expect.objectContaining(postData));
});


