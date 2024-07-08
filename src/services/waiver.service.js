const waiverModel = require("../models/waiver.model");

async function createWaiver(req, res) {
  const addResult = await waiverModel.create(req.body);
  return addResult;
}
async function getClients(req, res) {}
async function updateClients(req, res) {}
async function deleteClient(req, res) {}

module.exports = { createClient, updateClients, deleteClient, getClients };
