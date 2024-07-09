const clientModel = require("../models/client.model");

async function createClient(data) {
  const addResult = await clientModel.create(data);
  return addResult;
}
async function getClients() {
  const fetchResult = await clientModel.find();
  return fetchResult;
}
async function updateClients({ id, data }) {
  const editResult = await clientModel.findByIdAndUpdate(id, data);
  return editResult;
}
async function deleteClient(id) {
  const deletionResult = await clientModel.findByIdAndDelete(id);
  return deletionResult;
}

module.exports = { createClient, updateClients, deleteClient, getClients };
