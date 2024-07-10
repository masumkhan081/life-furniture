const { Router } = require("express");
const router = Router();
const userController = require("../controller/user.controller.js");

// when super-admin creates user account for a salesman
router.post("/", userController.createUser);

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.get("/logout", userController.logout);

router.post("/recovery", userController.sendResetMail);

router.get("/recovery/:token", userController.resetPw);

router.post("/reset-password", userController.updatePw);

router.post("/email-verification", userController.sendOTPToEmail);

router.post("/verify-email", userController.validateEmail);

router.patch(":id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
