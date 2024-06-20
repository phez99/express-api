import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const selectContact = {
  id: true,
  first_name: true,
  last_name: true,
  email: true,
  phone: true,
};

const selectAddress = {
  id: true,
  street: true,
  city: true,
  province: true,
  country: true,
  postal_code: true,
};

export default {
  selectContact,
  selectAddress,
};
