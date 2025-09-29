import pactum from "pactum";
import { StatusCodes } from "http-status-codes";
import { SimpleReporter } from "../simple-reporter";

describe("API Reqres com API Key", () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = "https://reqres.in/api";
  const apiKey = "reqres-free-v1";

  p.request.setDefaultTimeout(10000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe("USUÁRIOS", () => {
    it("Listar Usuários - Paginado", async () => {
      await p
        .spec()
        .get(`${baseUrl}/users?page=1`)
        .withHeaders("x-api-key", apiKey)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          page: 1
        });
    });


     // Obter user por ID
     it("Obter Usuário por ID", async () => {
      await p
        .spec()
        .get(`${baseUrl}/users/2`)
        .withHeaders("x-api-key", apiKey)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          data: {
            id: 2,
            email: "janet.weaver@reqres.in"
          }
        });
    });

    // Atualizar user via PUT
    it("Atualizar Usuário (PUT)", async () => {
      await p
        .spec()
        .put(`${baseUrl}/users/2`)
        .withHeaders("x-api-key", apiKey)
        .withJson({
          first_name: "Bruno",
          last_name: "Girardi"
        })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          first_name: "Bruno",
          last_name: "Girardi"
        });
    });

    // Atualizar user via PATCH
    it("Atualizar Usuário (PATCH)", async () => {
      await p
        .spec()
        .patch(`${baseUrl}/users/2`)
        .withHeaders("x-api-key", apiKey)
        .withJson({
          last_name: "Dev"
        })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          last_name: "Dev"
        });
    });

    // Deletar user
    it("Deletar Usuário", async () => {
      await p
        .spec()
        .delete(`${baseUrl}/users/2`)
        .withHeaders("x-api-key", apiKey)
        .expectStatus(StatusCodes.NO_CONTENT);
    });
  });

  });