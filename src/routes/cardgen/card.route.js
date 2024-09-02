const express = require("express");
const router = express.Router();
const cardController = require("../../controller/cardgen/card.controller"); 
const validateRequest = require("../../middlewares/validateRequest");
//
router.get("/", cardController.getCards);
router.get("/all", cardController.getCardsAll);
// router.post("/", validateRequest(playerSchema), cardController.createPlayer);
router.post("/", cardController.createCard);
router.patch("/:id", cardController.updateCard);
router.delete("/:id", cardController.deleteCard);

module.exports = router;
