import {test, expect} from '@playwright/test';
import axios from 'axios';
import {faker, simpleFaker} from '@faker-js/faker'
import { baseUrl } from '../Global_settings/constant';


let randomFirstName = faker.person.firstName();
let randomSecondName = faker.person.lastName();
let randomId = simpleFaker.string.numeric(10);
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
    const response = await axios.post(baseUrl, postData);
    petId = response.data.id;
   });

test.afterAll(async () => {
    await axios.delete(`${baseUrl}${petId}`);
  });

test('Get', async () => {
    const response = await axios.get(`${baseUrl}${petId}`);
    expect(response.data.id).toEqual(randomId);
    expect(response.data.category.name).toEqual(randomFirstName);
    expect(response.data.name).toEqual(randomSecondName);
    expect(response.status).toBe(200);
});


