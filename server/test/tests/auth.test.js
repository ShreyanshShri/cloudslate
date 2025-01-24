const axios = require("../my_axios");

const BACKEND_URL = require("../backend_url");

const unauthorized_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODllNmRmMTEwNTcxMGE5MjQ5OTIzZCIsImlhdCI6MTczNzExNTA1NX0.RjMn0SPyAmnQeVXz6h3y-JFqlRtptIOlFEc86nZ7-74";

describe("Authentication", () => {
  
  test('User is able to sign up only once', async () => {
    const username = "shreyansh" + Math.random(); 
    const email = "shreyansh" + Math.random() + "@gmail.com"; 
    const password = "test-pass";
    const response = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
        username,
        password,
        email,
    })
    expect(response.status).toBe(200)
    
    const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
        username,
        password,
        email
    })
    expect(updatedResponse.status).toBe(400);
  });

  test('Signup request fails if the username is empty', async () => {
      // const username = `kirat-${Math.random()}` 
      const password = "123456"

      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
          password
      });
      expect(response.status).toBe(400)
  });

  test('Signin succeeds if the username and password are correct', async() => {
      const username = `shreyansh-${Math.random()}`;
      const email = `shreyansh-${Math.random()}@gmail.com`;
      const password = "test-pass";

      await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
          username,
          password,
          email
      });

      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, {
          email,
          password
      });

      expect(response.status).toBe(200)
      expect(response.data.token).toBeDefined()
  })

  test('Signin fails if the username and password are incorrect', async() => {
      const username = `shreyansh-${Math.random()}`;
      const email = `shreyansh-${Math.random()}@gmail.com`;
      const password = "test-pass";

      await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
          username,
          password,
          email
      });

      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, {
          username: "WrongUsername",
          password
      })

      expect(response.status).toBe(400)
  })
})
