import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import {
  createTestContact,
  createTestUser,
  getTesContact,
  removeAllTestContact,
  removeTestUser,
} from "./test-util.js";
describe("POST /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can contact create ", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set({ Authorization: "test" })
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@pzn.com",
        phone: "082220890338",
      });
    // logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@pzn.com");
    expect(result.body.data.phone).toBe("082220890338");
  });

  it("should reject if bad request ", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set({ Authorization: "test" })
      .send({
        first_name: "",
        last_name: "test",
        email: "test",
        phone: "08222089033812313132132132132132131321321321321",
      });
    // logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const testContact = await getTesContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id)
      .set({ Authorization: "test" });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe(testContact.first_name);
    expect(result.body.data.last_name).toBe(testContact.last_name);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it("should 404 if contact id is not found", async () => {
    const testContact = await getTesContact();

    const result = await supertest(web)
      .get("/api/contacts/" + (testContact.id + 1))
      .set({ Authorization: "test" });

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });
  it("should can update contact", async () => {
    const testContact = await getTesContact();
    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set({ Authorization: "test" })
      .send({
        first_name: "test2",
        last_name: "test2",
        email: "test2@mail.com",
        phone: "123123123123",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test2");
    expect(result.body.data.last_name).toBe("test2");
    expect(result.body.data.email).toBe("test2@mail.com");
    expect(result.body.data.phone).toBe("123123123123");
  });
  it("should 404 if contact is not found", async () => {
    const testContact = await getTesContact();
    const result = await supertest(web)
      .put("/api/contacts/" + (testContact.id + 1))
      .set({ Authorization: "test" })
      .send({
        first_name: "test2",
        last_name: "test2",
        email: "test2@mail.com",
        phone: "123123123123",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("should 401 if  is invalid request ", async () => {
    const testContact = await getTesContact();
    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set({ Authorization: "salah" })
      .send({
        first_name: "test2",
        last_name: "test2",
        email: "test2@mail.com",
        phone: "123123123123",
      });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
