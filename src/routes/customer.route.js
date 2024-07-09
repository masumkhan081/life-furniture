const { Router } = require("express");
const router = Router();
const customerController = require("../controller/customer.controller.js");

router.post("/", customerController.createClient);
router.get("/", customerController.getClients);
router.patch("/:id", customerController.updateClient);
router.delete("/:id", customerController.deleteClient);

module.exports = router;
