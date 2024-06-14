import supertest from "supertest";
import { prismaClient } from "../src/application/database.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/users", function () {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "codephez",
      },
    });
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "codephez",
      password: "rahasia",
      name: "aseptian abdurohman",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("codephez");
    expect(result.body.data.name).toBe("aseptian abdurohman");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if username is already registered", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "codephez",
      password: "rahasia",
      name: "aseptian abdurohman",
    });
    logger.info(result.body);
    result = await supertest(web).post("/api/users").send({
      username: "codephez",
      password: "rahasia",
      name: "aseptian abdurohman",
    });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
