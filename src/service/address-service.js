import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import { ResponseError } from "../error/response-error.js";
import utils from "../util/util.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validation/address-validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const checkContactInDatabaseifExist = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });
  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found!");
  }

  return contactId;
};

const create = async (user, contactId, request) => {
  contactId = await checkContactInDatabaseifExist(user, contactId);
  const address = await validate(createAddressValidation, request);
  address.contact_id = contactId;
  return prismaClient.address.create({
    data: address,
    select: utils.selectAddress,
  });
};

const get = async (user, contactId, addressId) => {
  contactId = await checkContactInDatabaseifExist(user, contactId);
  addressId = await validate(getAddressValidation, addressId);
  const address = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: addressId,
    },
    select: utils.selectAddress,
  });

  if (!address) throw new ResponseError(404, "address is not found!");

  return address;
};

const update = async (user, contactId, request) => {
  contactId = await checkContactInDatabaseifExist(user, contactId);
  const address = await validate(updateAddressValidation, request);
  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: address.id,
    },
  });

  if (totalAddressInDatabase !== 1)
    throw new ResponseError(404, "address is not found!");
  return prismaClient.address.update({
    where: {
      contact_id: contactId,
      id: address.id,
    },
    data: address,
    select: utils.selectAddress,
  });
};

const remove = async (user, contactId, addressId) => {
  contactId = await checkContactInDatabaseifExist(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: addressId,
    },
  });

  if (totalAddressInDatabase !== 1)
    throw new ResponseError(404, "address is not found!");

  return prismaClient.address.delete({ where: { id: addressId } });
};

const list = async (user, contactId) => {
  contactId = await checkContactInDatabaseifExist(user, contactId);
  return prismaClient.address.findMany({
    where: {
      contact_id: contactId,
    },
    select: utils.selectAddress,
  });
};

export default { create, get, update, remove, list };
