const { Router } = require("express");
const router = Router();
const authController = require("../../controller/auth/auth.controller.js");

//
router.post("/", authController.createUser);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.post("/recovery", authController.sendResetMail);

router.get("/recovery/:token", authController.resetPw);

router.post("/reset-password", authController.updatePw);

router.post("/email-verification", authController.sendOTPToEmail);

router.post("/verify-email", authController.validateEmail);

router.patch(":id", authController.updateUser);

router.delete("/:id", authController.deleteUser);

//  Authorization routes

//  social login routes

// router.get(
//   "/facebook",
//   require("../../controller/strategies/facebook.route.js")
// );

module.exports = router;
