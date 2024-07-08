const purchaseModel = require("../models/purchase.model");

async function createClient(req, res) {
  const addResult = await purchaseModel.create(req.body);
  return addResult;
}
async function getClients(req, res) {}
async function updateClients(req, res) {}
async function deleteClient(req, res) {}

module.exports = { createClient, updateClients, deleteClient, getClients };
