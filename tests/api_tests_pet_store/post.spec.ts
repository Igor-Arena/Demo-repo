import {test, expect} from '@playwright/test'
import axios from 'axios';
import {faker, simpleFaker} from '@faker-js/faker';
import { baseApiUrl } from '../../constant';


let randomFirstName = faker.person.firstName();
let randomSecondName = faker.person.lastName();
let randomIdNumber = faker.number.int(10)
let petId: number;


let postData = {
  "id": randomIdNumber,
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


test.afterAll(async () => {
  await axios.delete(`${baseApiUrl}${petId}`);
});

test('Post', async () => {
    const response = await axios.post(baseApiUrl, postData);
    petId = response.data.id;
    expect(response.status).toBe(200);
    expect(response.data).toEqual(expect.objectContaining(postData));
   });


