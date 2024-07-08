const vendorService = require("../services/vendor.service");

async function createClient(req, res) {
  const result = await vendorService.createClient(req.body);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Client Created successfully",
    data: result,
  });
}
async function getClients(req, res) {}
async function updateClients(req, res) {}
async function deleteClient(req, res) {}

module.exports = { createClient, updateClients, deleteClient, getClients };
