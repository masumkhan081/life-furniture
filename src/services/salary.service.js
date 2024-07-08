const salaryModel = require("../models/salary.model");

async function createClient(req, res) {
  const addResult = await salaryModel.create(req.body);
  return addResult;
}
async function getClients(req, res) {}
async function updateClients(req, res) {}
async function deleteClient(req, res) {}

module.exports = { createClient, updateClients, deleteClient, getClients };
