const express = require("express");
const router = express.Router();


const { createEmployee,employeeList,updateEmployee,deleteEmploye,employe,search  } = require("../controller/employe")

router.post("/createEmploye", createEmployee)

router.get("/employeList", employeeList)

router.get("/employe/:id", employe)

router.get("/employees", search)

router.put("/updateEmploye/:id",updateEmployee)

router.delete(`/deleteEmploye/:id`, deleteEmploye )









module.exports = router;