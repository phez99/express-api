import supertest from "supertest";
import { prismaClient } from "../src/application/database.js";
import { web } from "../src/application/web.js";

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
});
