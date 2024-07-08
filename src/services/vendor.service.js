const vendorModel = require("../models/vendor.model");

async function createVendor(req, res) {
  const addResult = await vendorModel.create(req.body);
  return addResult;
}
async function getClients(req, res) {}
async function updateClients(req, res) {}
async function deleteClient(req, res) {}

module.exports = { createClient, updateClients, deleteClient, getClients };
