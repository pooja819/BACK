const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const MiddleWare = require("../middle_ware");

router.get("/get/all/customer", MiddleWare, customerController.getAllCustomers);
router.post("/create/customer", customerController.createCustomer);

module.exports = router;
