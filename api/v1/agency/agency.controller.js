'use strict';
const Agency = require('../models/Agency.model');
const ResponseManager = require('../response/response-manager');

class AgencyController {
static create(req, res, next) {
    let newAgency = {agencyName:req.body.agencyName, agencyImage:req.body.agencyImage};
    
    Agency.create(newAgency, function(err, agency){
       if(err || agency === null){
         console.log("Error "+err);
         if(err.code === 11000){
           return ResponseManager.respondWithError(res, 200, "Agency Already Created");
         } else{
           return ResponseManager.respondWithError(res, 200, "An error was encountered");
         }
       } else {
           return ResponseManager.respondWithSuccess(res, 200, "Agency added successfully", agency);
       }
    });
}

static async getAgencyDetails(req, res, next) {
    console.log(req.query.agency_id, "query");
    if (!req.query.agency_id) {
      throw new Error("Agency Id not find");
    }
    try {
      const agencyDetails = await Agency.findOne({ _id: req.query.agency_id });
      if (!agencyDetails) {
        return ResponseManager.respondWithError(
          res,
          200,
          "Category not find plz check id"
        );
      } else {
        return ResponseManager.respondWithSuccess(
          res,
          200,
          "success",
          agencyDetails
        );
      }
    } catch (error) {
      console.log(error, "error");
      return ResponseManager.respondWithError(res, 200, "An error encounterd");
    }
  }

  static getAllAgency(req, res, next) {
    Agency.find({},function(err, users){
      if(err)
        return ResponseManager.respondWithError(res, 404, err);
      else
         return ResponseManager.respondWithSuccess(res, 200, "", users);
     });
 }

 static async updateAgencyDetails (req, res, next) {
    try {
      const update = { ...req.body };
      const found = { _id: req.query.agency_id };
      const updateAgencyDetails = await Agency.findOneAndUpdate(found, update, {
        new: true,
      });
      if (!updateAgencyDetails) {
        return ResponseManager.respondWithError(
          res,
          200,
          "category not found plz check id"
        );
      } else {
        return ResponseManager.respondWithSuccess(
          res,
          200,
          "success",
          updateAgencyDetails
        );
      }
    } catch (error) {
      console.log(error, "error");
      return ResponseManager.respondWithError(res, 200, "An error encounterd");
    }
  }

}


exports = module.exports = AgencyController;