import Joi from "joi";

const createAddressValidation = Joi.object({
  street: Joi.string().max(100).optional(),
  city: Joi.string().max(100).optional(),
  province: Joi.string().max(100).optional(),
  country: Joi.string().max(100).required(),
  postal_code: Joi.string().required(),
});

export { createAddressValidation };
