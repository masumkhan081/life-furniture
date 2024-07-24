const { Router } = require("express");
const router = Router();
const authController = require("../controller/auth.controller.js");

// when super-admin creates user account for a salesman
router.post("/", authController.createUser);

router.post("/login", (req, res) => {
  authController.login(req, res);
});

router.get("/logout", authController.logout);

router.post("/recovery", authController.sendResetMail);

router.get("/recovery/:token", authController.resetPw);

router.post("/reset-password", authController.updatePw);

router.post("/email-verification", authController.sendOTPToEmail);

router.post("/verify-email", authController.validateEmail);

router.patch(":id", authController.updateUser);

router.delete("/:id", authController.deleteUser);

module.exports = router;
