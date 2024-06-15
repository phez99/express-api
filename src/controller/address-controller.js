import addressService from "../service/address-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const request = req.body;
    const result = await addressService.create(user, contactId, request);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

export default { create };
