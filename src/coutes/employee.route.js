const { Router } = require("express");
const router = Router();
const employeeController = require("../controller/employee.controller");
//

router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getEmployees);
router.patch("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
