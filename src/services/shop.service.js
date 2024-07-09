const shopModel = require("../models/showroom.model");

async function createShop(data) {
  const addResult = await shopModel.create(data);
  return addResult;
}
async function getShops() {
  const fetchResult = await shopModel.find();
  return fetchResult;
}
async function updateShop({ id, data }) {
  const editResult = await shopModel.findByIdAndUpdate(id, data);
  return editResult;
}
async function deleteShop(id) {
  const deleteResult = await shopModel.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createShop,
  updateShop,
  deleteShop,
  getShops,
};
