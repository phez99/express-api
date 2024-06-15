import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import {
  createTestContact,
  createTestUser,
  getTesContact,
  removeAllTestAddresses,
  removeAllTestContact,
  removeTestUser,
} from "./test-util.js";

describe("POST /api/contacts/:contactId/addresses", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can create address", async () => {
    const testContact = await getTesContact();
    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set({ Authorization: "test" })
      .send({
        street: "jalan test",
        city: "city test",
        province: "province test",
        country: "country test",
        postal_code: "41253",
      });
    logger.info(result);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test");
    expect(result.body.data.city).toBe("city test");
    expect(result.body.data.province).toBe("province test");
    expect(result.body.data.country).toBe("country test");
    expect(result.body.data.postal_code).toBe("41253");
  });

  it("should 401  bad header token", async () => {
    const testContact = await getTesContact();
    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set({ Authorization: "salah" })
      .send({
        street: "jalan test",
        city: "city test",
        province: "province test",
        country: "country test",
        postal_code: "41253",
      });
    logger.info(result);
    expect(result.status).toBe(401);
  });

  it("should 400  bad request body (field country And postal_code required) ", async () => {
    const testContact = await getTesContact();
    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set({ Authorization: "test" })
      .send({
        street: "jalan test",
        city: "city test",
        province: "province test",
        country: "",
        postal_code: "",
      });
    logger.info(result);
    expect(result.status).toBe(400);
  });

  it("should 404  contact is not found ", async () => {
    const testContact = await getTesContact();
    const result = await supertest(web)
      .post("/api/contacts/" + (testContact.id + 1) + "/addresses")
      .set({ Authorization: "test" })
      .send({
        street: "jalan test",
        city: "city test",
        province: "province test",
        country: "",
        postal_code: "",
      });
    logger.info(result);
    expect(result.status).toBe(404);
  });
});
