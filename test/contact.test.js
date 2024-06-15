import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import {
  createManyTestContact,
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

  it("should 401 if  is invalid request header ", async () => {
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
  it("should 400 if  is invalid request body ", async () => {
    const testContact = await getTesContact();
    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set({ Authorization: "test" })
      .send({
        first_name: "",
        last_name: "test2",
        email: "test2",
        phone: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });
  it("should can delete contact ", async () => {
    let testContact = await getTesContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id)
      .set({ Authorization: "test" });
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Ok");
    testContact = await getTesContact();
    expect(testContact).toBeNull();
  });
  it("should 404 contact is not found ", async () => {
    const testContact = await getTesContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + (testContact.id + 1))
      .set({ Authorization: "test" });
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("should 401 bad request header ", async () => {
    const testContact = await getTesContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + (testContact.id + 1))
      .set({ Authorization: "salah" });
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can search contact", async () => {
    // const testContact = await getTesContact();

    const result = await supertest(web)
      .get("/api/contacts")
      .set({ Authorization: "test" });
    expect(result.status).toBe(200);
    expect(result.body.paging.total_item).toBe(16);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.page).toBe(1);
  });

  it("should can search with name", async () => {
    // const testContact = await getTesContact();

    const result = await supertest(web)
      .get("/api/contacts")
      .query({ name: "test 1" })
      .set({ Authorization: "test" });
    expect(result.status).toBe(200);
    expect(result.body.paging.total_item).toBe(7);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.page).toBe(1);
  });
  it("should can search with email", async () => {
    // const testContact = await getTesContact();

    const result = await supertest(web)
      .get("/api/contacts")
      .query({ email: ".com" })
      .set({ Authorization: "test" });
    expect(result.status).toBe(200);
    expect(result.body.paging.total_item).toBe(16);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.page).toBe(1);
  });

  it("should can search with page", async () => {
    // const testContact = await getTesContact();

    const result = await supertest(web)
      .get("/api/contacts")
      .query({ page: 2 })
      .set({ Authorization: "test" });
    logger.info(result.body.paging);
    expect(result.status).toBe(200);
    expect(result.body.paging.total_item).toBe(16);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.page).toBe(2);
  });

  it("should can search but unauthorize", async () => {
    // const testContact = await getTesContact();

    const result = await supertest(web)
      .get("/api/contacts")
      .query({ email: ".com" })
      .set({ Authorization: "salah" });
    expect(result.status).toBe(401);
  });
});
