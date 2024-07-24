const { Router } = require("express");
const router = Router();
const userController = require("../controller/user.controller.js");

// when super-admin creates user account for a salesman
router.post("/", userController.createUser); 
router.get("/", userController.getUsers);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
