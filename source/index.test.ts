import { createFastifyInstance } from '../source/app'; // Supondo que você tenha uma função que constrói sua instância Fastify

const fastify = createFastifyInstance()

beforeAll(async () => {
  await fastify.ready();
});

afterAll(async () => {
  await fastify.close();
});

describe('Testes de integração para as rotas de usuário', () => {
  test('GET /user - deve retornar uma lista de usuários', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/user',
    })

    const responseParsed = response.json()

    expect(response.statusCode).toBe(201);
    expect(responseParsed?.users).toBeInstanceOf(Array);
  });

  test('POST /user - deve criar um novo usuário', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/user',
      payload: {
        name: 'test',
        email: 'test@test.com',
        password: 'test',
      }
    })

    const responseParsed = response.json()
    console.log('responseParsed', responseParsed)

    expect(response.statusCode).toBe(200);
    expect(responseParsed?.users).toBeInstanceOf(Array);
  });
});
