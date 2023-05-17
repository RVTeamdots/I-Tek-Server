'use strict';
const express =  require('express');
const router = express.Router();

const CrimeController = require("./crime.controller")

router.post('/add-crime', CrimeController.create);
router.post('/update-crime', CrimeController.updateCrimeDetails);
router.get('/view-crime', CrimeController.getCrimeDetails);
router.get('/view-all-crime', CrimeController.getAllCrime);
router.get('/search-crime', CrimeController.fetchCrimeDetails)



module.exports = router;