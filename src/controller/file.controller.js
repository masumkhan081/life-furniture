const fileService = require("../cervices/file.service");
const httpStatus = require("http-status");

async function createFile(req, res) {
  const result = await fileService.createFile(req.body);
  res.send(result);
}
async function getFiles(req, res) {
  const result = await fileService.getFiles(req.query);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "File fetched successfully",
    data: result,
  });
}
//
async function updateFile(req, res) {
  const result = await fileService.updateFile({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteFile(req, res) {
  const result = await fileService.deleteFile(req.params.id);
  res.send(result);
}
//
module.exports = {
  createFile,
  updateFile,
  deleteFile,
  getFiles,
};
