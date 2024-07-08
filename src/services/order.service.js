const orderModel = require("../models/order.model");

async function createClient(req, res) {
  const addResult = await orderModel.create(req.body);
  return addResult;
}
async function getClients(req, res) {}
async function updateClients(req, res) {}
async function deleteClient(req, res) {}

module.exports = { createClient, updateClients, deleteClient, getClients };
