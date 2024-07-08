const Salesman = require("../models/salesman.model");

async function createSalesman(req, res) {
  const addResult = await Salesman.create(req.body);
  return addResult;
}
async function getClients(req, res) {}
async function updateClients(req, res) {}
async function deleteClient(req, res) {}

module.exports = {
  createClient: createSalesman,
  updateClients,
  deleteClient,
  getClients,
};
