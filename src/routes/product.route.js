const { Router } = require("express");
const router = Router();
const productController = require("../controller/client.controller.js");

router.post("/", productController.createClient);
router.get("/", productController.getClients);
router.patch("/:id", productController.getClients);
router.delete("/:id", productController.getClients);

module.exports = router;
