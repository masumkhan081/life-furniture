const { Router } = require("express");
const router = Router();
const showroomController = require("../controller/showroom.controller");
//

router.post("/", showroomController.createshowroom);
router.get("/", showroomController.getshowrooms);
router.patch("/:id", showroomController.updateshowroom);
router.delete("/:id", showroomController.deleteshowroom);

module.exports = router;
