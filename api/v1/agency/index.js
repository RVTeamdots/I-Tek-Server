'use strict';
const express =  require('express');
const router = express.Router();

const AgencyController = require("./agency.controller")

router.post('/add-agency', AgencyController.create);
router.post('/update-agency', AgencyController.updateAgencyDetails);
router.get('/view-agency', AgencyController.getAgencyDetails);
router.get('/view-all-agency', AgencyController.getAllAgency);



module.exports = router;