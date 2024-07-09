const { Router } = require("express");
const router = Router();
const shopController = require("../controller/shop.controller");

router.post("/", shopController.createShop);
router.get("/", shopController.getShops);
router.patch("/:id", shopController.updateShop);
router.delete("/:id", shopController.deleteShop);

module.exports = router;
