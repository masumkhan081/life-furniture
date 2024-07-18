const { Router } = require("express");
const router = Router();
const salesmenController = require("../controller/salesmen.controller");
//

router.post("/", salesmenController.createSalesman);
router.get("/", salesmenController.getSalesmen);
router.patch("/:id", salesmenController.updateSalesman);
router.delete("/:id", salesmenController.deleteSalesman);

module.exports = router;
