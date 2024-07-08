const { Router } = require("express");
const router = Router();
const clientController = require("../controller/client.controller.js");

router.post("/", clientController.createClient);
router.get("/", clientController.getClients);
router.patch("/:id", clientController.getClients);
router.delete("/:id", clientController.getClients);

module.exports = router;
