import {test, expect} from '@playwright/test'
import axios from 'axios';
import {faker, simpleFaker} from '@faker-js/faker';
import { postAndGetPet } from '../Global_settings/constant';


let randomFirstName = faker.person.firstName();
let randomSecondName = faker.person.lastName();
let randomId = simpleFaker.string.numeric(10);
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
    const response = await axios.post(postAndGetPet, postData);
    petId = response.data.id;
   });


test('Delete', async () => {
    const response = await axios.delete(`${postAndGetPet}${petId}`);
    expect(response.status).toBe(200);
});