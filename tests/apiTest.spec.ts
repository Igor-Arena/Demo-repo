import {test, expect} from '@playwright/test';

var userId;

test ('Get user', async ({request})=>{
    const response = await request.get('https://reqres.in/api/user?page=2')
    console.log(await response.json())
    expect(response.status()).toBe(200)
});

test ('Create user', async ({request})=>{
    const response = await request.post('https://reqres.in/api/users', 
    {
        data: {
            "name": "Igor",
            "job": "traineer"
        },
        headers: {
            "Accept": "aplication/json"
        }
    })

    console.log(await response.json())
    expect(response.status()).toBe(201)

    var res = await response.json()
    userId = res.id
});

test ('Update user', async ({request})=>{
    const response = await request.put('https://reqres.in/api/users/'+userId, 
    {
        data: {
            "name": "IgorQA2",
            "job": "traineer"
        },
        headers: {
            "Accept": "aplication/json"
        }
    })

    console.log(await response.json())
    expect(response.status()).toBe(200)

})

test ('Delete user', async ({request})=>{
    const response = await request.delete('https://reqres.in/api/users/'+userId)
    expect(response.status()).toBe(204)
})