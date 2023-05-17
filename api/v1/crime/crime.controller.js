'use strict';
const Crime = require('../models/Crime.model');
const ResponseManager = require('../response/response-manager');

class CrimeController {
static create(req, res, next) {
   var uniqueCrimeNo =  req.body.crName.substr(0,4)+req.body.crTelephone.substr(0,4)+req.body.typeOfCrime.substr(0,2);
    let newCrime = {
        uniqueCrimeNo:uniqueCrimeNo,
        caseReportedBy:req.body.crName,
        address:req.body.crAddress,
        telephoneNo:req.body.crTelephone,
        meansOfIdentification:req.body.crIdentification,
        identificationNo:req.body.crIdentificationNo,
        typeOfCrime:req.body.typeOfCrime,
        dateOfCrime:req.body.dateOfCrime,
        dateReported:req.body.reportedOfDate,
        statement:req.body.statement,
        witnessedBy:req.body.wName,
        witnessAddress:req.body.wAddress,
        witnessTelephoneNo:req.body.wTelephone,
        witnessMeansOfIdentification:req.body.wIdentification,
        witnessIdentificationNo:req.body.wIdentificationNo,
        officerOnDuty:req.body.onDutyOName,
        badgeNo:req.body.onDutyOBudgeNo,
        policeStationAddress:req.body.onDutyAddress,
        policeStationTelephoneNo:req.body.onDutyTelephone,
        updateOrFindings:req.body.onDutyInvestigation,
        caseAssignedTo:req.body.assignedOName,
        caseAssignedBadgeNo:req.body.assignedOBudgeNo,
        dateCaseClosed:req.body.closedCaseDate,
        closedBy:req.body.caseClosedOName,
        closedByBadgeNo:req.body.caseClosedOBudgeNo,
        finalReport:req.body.closureReport,
        approvedBy:req.body.approvedOName,
        approvedByBadgeNo:req.body.approvedOBudgeNo
    };
    
    Crime.create(newCrime, function(err, crime){
       if(err || crime === null){
         console.log("Error "+err);
         if(err.code === 11000){
           return ResponseManager.respondWithError(res, 200, "Crime Already Created");
         } else{
           return ResponseManager.respondWithError(res, 200, "An error was encountered");
         }
       } else {
           return ResponseManager.respondWithSuccess(res, 200, "Crime added successfully", crime);
       }
    });
}

static async getCrimeDetails(req, res, next) { 
  
    console.log(req.query.case_id, "query");
    if (!req.query.case_id) {
      throw new Error("Case Id not find");
    }
    try {
      
      const crimeDetails = await Crime.findOne({ _id: req.query.case_id });
      if (!crimeDetails) {
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
          crimeDetails
        );
      }
    } catch (error) {
      console.log(error, "error");
      return ResponseManager.respondWithError(res, 200, "An error encounterd");
    }
  }

  static async fetchCrimeDetails(req, res, next) { debugger
    console.log(req.query, "query");
  
    const { uniqueCrimeNo, caseReportedBy, dateOfCrime, dateReported, typeOfCrime } = req.query;
  
    if (!uniqueCrimeNo && !caseReportedBy && !dateOfCrime && !dateReported && !typeOfCrime) {
      throw new Error("Please provide at least one search parameter.");
    }
  
    const searchQuery = {};
  
    if (uniqueCrimeNo && uniqueCrimeNo!='undefined') {
      searchQuery.uniqueCrimeNo = uniqueCrimeNo;
    }
    if (dateOfCrime && dateOfCrime!='undefined') {
      searchQuery.dateOfCrime = dateOfCrime;
    }
    if (caseReportedBy && caseReportedBy!='undefined') {
      searchQuery.caseReportedBy = caseReportedBy;
    }
    if (dateReported && dateReported!='undefined'){
      searchQuery.dateReported = dateReported;
    }
    if (typeOfCrime && typeOfCrime!='undefined') {
      searchQuery.typeOfCrime = typeOfCrime;
    }
    console.log(searchQuery)
    
    try {
      // if (caseReportedBy && caseReportedBy!='undefined') {
      //    const crimeDetails = await Crime.find({$and: [{searchQuery},{$or: [{witnessedBy:caseReportedBy},{officerOnDuty:caseReportedBy},{caseAssignedTo:caseReportedBy},{closedBy:caseReportedBy},{approvedBy:caseReportedBy},{caseReportedBy:caseReportedBy}]}] });
      // }else{
        const crimeDetails = await Crime.find(searchQuery);
      //}
      console.log(crimeDetails)
  
      if (!crimeDetails) {
        return ResponseManager.respondWithError(res, 200, "No matching crime details found.");
      } else {
        return ResponseManager.respondWithSuccess(res, 200, "Success", crimeDetails);
      }
    } catch (error) {
      console.log(error, "error");
      return ResponseManager.respondWithError(res, 200, "An error encountered.");
    }
  }

  static getAllCrime(req, res, next) {
    Crime.find({},function(err, users){
      if(err)
        return ResponseManager.respondWithError(res, 404, err);
      else
         return ResponseManager.respondWithSuccess(res, 200, "", users);
     });
 }

 static async updateCrimeDetails (req, res, next) {
  debugger
    try {
      const update = { ...req.body };
      const found = { _id: req.query.case_id };
      const updateCrimeDetails = await Crime.findOneAndUpdate(found, update, {
        new: true,
      });
      if (!updateCrimeDetails) {
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
          updateCrimeDetails
        );
      }
    } catch (error) {
      console.log(error, "error");
      return ResponseManager.respondWithError(res, 200, "An error encounterd");
    }
  }

}


exports = module.exports = CrimeController;