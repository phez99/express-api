import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import {
  createTestAddress,
  createTestContact,
  createTestUser,
  getTesContact,
  getTestAddress,
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

  it("status 200 => create address successfully", async () => {
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
    // logger.info(result);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test");
    expect(result.body.data.city).toBe("city test");
    expect(result.body.data.province).toBe("province test");
    expect(result.body.data.country).toBe("country test");
    expect(result.body.data.postal_code).toBe("41253");
  });

  it("status 401 => reject create address because Unauthorize", async () => {
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

  it("status 400 => reject create address because bad request body ", async () => {
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

  it("status 404 => reject create address because contact is not found ", async () => {
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

describe("GET /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("status 200 => get address successfully ", async () => {
    const testContact = await getTesContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set({ Authorization: "test" });
    logger.info(result);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test");
    expect(result.body.data.city).toBe("city test");
    expect(result.body.data.province).toBe("province test");
    expect(result.body.data.country).toBe("country test");
    expect(result.body.data.postal_code).toBe("41253");
  });

  it("status 404 => reject get address because contact is not found ", async () => {
    const testContact = await getTesContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .get(
        "/api/contacts/" + (testContact.id + 1) + "/addresses/" + testAddress.id
      )
      .set({ Authorization: "test" });
    logger.info(result);
    expect(result.status).toBe(404);
  });
  it("status 404 => reject get address because address is not found ", async () => {
    const testContact = await getTesContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .get(
        "/api/contacts/" + testAddress.id + "/addresses/" + (testContact.id + 1)
      )
      .set({ Authorization: "test" });
    logger.info(result);
    expect(result.status).toBe(404);
  });

  it("status 400 => reject get address because Unauthorize  ", async () => {
    const testContact = await getTesContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .get(
        "/api/contacts/" + testAddress.id + "/addresses/" + (testContact.id + 1)
      )
      .set({ Authorization: "salah" });
    logger.info(result);
    expect(result.status).toBe(401);
  });
});

describe("PUT UPDATE /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("status 200 =>  update address successfully ", async () => {
    const testContact = await getTesContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set({ Authorization: "test" })
      .send({
        street: "jalan test4",
        city: "city test4",
        province: "province test4",
        country: "country test4",
        postal_code: "41253",
      });
    // logger.info(result);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test4");
    expect(result.body.data.city).toBe("city test4");
    expect(result.body.data.province).toBe("province test4");
    expect(result.body.data.country).toBe("country test4");
    expect(result.body.data.postal_code).toBe("41253");
  });

  it("status 401 => reject update address because Unauthorize ", async () => {
    const testContact = await getTesContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set({ Authorization: "salah" })
      .send({
        street: "jalan test4",
        city: "city test4",
        province: "province test4",
        country: "country test4",
        postal_code: "41253",
      });
    // logger.info(result);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("status 400 => reject update address because bad req body ", async () => {
    const testContact = await getTesContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set({ Authorization: "test" })
      .send({
        street: "jalan test4",
        city: "city test4",
        province: "province test4",
        country: "",
        postal_code: "",
      });
    // logger.info(result);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("status 404 => reject update address is not found ", async () => {
    const testContact = await getTesContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put(
        "/api/contacts/" + testContact.id + "/addresses/" + (testAddress.id + 1)
      )
      .set({ Authorization: "test" })
      .send({
        street: "jalan test4",
        city: "city test4",
        province: "province test4",
        country: "country test4",
        postal_code: "41253",
      });
    // logger.info(result);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("status 404 => reject update address because contact is not found ", async () => {
    const testContact = await getTesContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put(
        "/api/contacts/" + (testContact.id + 1) + "/addresses/" + testAddress.id
      )
      .set({ Authorization: "test" })
      .send({
        street: "jalan test4",
        city: "city test4",
        province: "province test4",
        country: "country test4",
        postal_code: "41253",
      });
    // logger.info(result);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE,/api/contacts/:contactId/addresses/:addressId ", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("status 200 => remove address successfully  ", async () => {
    const testContact = await getTesContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .delete(
        "/api/contacts/" + testContact.id + "/addresses/" + testAddress.id
      )
      .set({ Authorization: "test" });

    // logger.info(result);
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Ok");
  });

  it("status 404 => reject remove address not found  ", async () => {
    const testContact = await getTesContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .delete(
        "/api/contacts/" + testContact.id + "/addresses/" + (testAddress.id + 1)
      )
      .set({ Authorization: "test" });

    // logger.info(result);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  it("status 404 => reject remove address but contact is not found  ", async () => {
    const testContact = await getTesContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .delete(
        "/api/contacts/" + (testAddress.id + 1) + "/addresses/" + testContact.id
      )
      .set({ Authorization: "test" });

    // logger.info(result);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  it("status 401 => reject remove address because Unauthorize ", async () => {
    const testContact = await getTesContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .delete(
        "/api/contacts/" + testContact.id + "/addresses/" + (testAddress.id + 1)
      )
      .set({ Authorization: "salah" });

    // logger.info(result);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  });
  it("status 200 => remove address successfully  ", async () => {
    const testContact = await getTesContact();
    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + "/addresses")
      .set({ Authorization: "test" });

    logger.info(result);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
  });

  it("status 404 => reject remove address because contact is not found!  ", async () => {
    const testContact = await getTesContact();
    const result = await supertest(web)
      .get("/api/contacts/" + (testContact.id + 1) + "/addresses")
      .set({ Authorization: "test" });

    logger.info(result);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  it("status 401 => reject remove address because Unauthorized  ", async () => {
    const testContact = await getTesContact();
    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + "/addresses")
      .set({ Authorization: "salah" });

    logger.info(result);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
