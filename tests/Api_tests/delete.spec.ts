import {test, expect} from '@playwright/test'
import axios from 'axios';
import {faker, simpleFaker} from '@faker-js/faker';
import { postAndGetPet } from '../Global_settings/fake_global_values';


let petId: number;
let randomFirstName = faker.person.firstName(undefined);
let randomSecondName = faker.person.lastName(undefined);
let randomId = simpleFaker.string.numeric(10);

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
    console.log(response);
    expect(response.status).toBe(200);
    petId = response.data.id;
   });


test('Delete', async () => {
    const response = await axios.delete(`${postAndGetPet}${petId}`);
    console.log(response);
    expect(response.status).toBe(200);
})