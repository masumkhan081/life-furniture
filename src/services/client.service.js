const clientModel = require("../models/client.model");

async function createClient(req, res) {
  const addResult = await clientModel.create(req.body);
  return addResult;
}
async function getClients(req, res) {}
async function updateClients(req, res) {}
async function deleteClient(req, res) {}

module.exports = { createClient, updateClients, deleteClient, getClients };
