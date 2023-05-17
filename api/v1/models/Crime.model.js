const mongoose = require("mongoose");

const crimeSchema = new mongoose.Schema({
  uniqueCrimeNo: {
    type: String,
    required: true,
    unique: true,
  },
  caseReportedBy: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  telephoneNo: {
    type: String,
    required: true,
  },
  meansOfIdentification: {
    type: String,
    required: true,
  },
  identificationNo: {
    type: String,
    required: false,
  },
  typeOfCrime: {
    type: String,
    required: false,
  },
  dateOfCrime: {
    type: Date,
    required: true,
  },
  dateReported: {
    type: Date,
    required: false,
  },
  statement: {
    type: String,
    required: false,
  },
  witnessedBy: {
    type: String,
    required: false,
  },
  witnessAddress: {
    type: String,
    required: false,
  },
  witnessTelephoneNo: {
    type: String,
    required: false,
  },
  witnessMeansOfIdentification: {
    type: String,
    required: false,
  },
  witnessIdentificationNo: {
    type: String,
    required: false,
  },
  officerOnDuty: {
    type: String,
    required: false,
  },
  badgeNo: {
    type: String,
    required: false,
  },
  policeStationAddress: {
    type: String,
    required: false,
  },
  policeStationTelephoneNo: {
    type: String,
    required: false,
  },
  updateOrFindings: {
    type: String,
    required: false,
  },
  caseAssignedTo: {
    type: String,
    required: false,
  },
  caseAssignedBadgeNo: {
    type: String,
    required: false,
  },
  dateCaseClosed: {
    type: Date,
    required: false,
  },
  closedBy: {
    type: String,
    required: false,
  },
  closedByBadgeNo: {
    type: String,
    required: false,
  },
  finalReport: {
    type: String,
    required: false,
  },
  approvedBy: {
    type: String,
    required: false,
  },
  approvedByBadgeNo: {
    type: String,
    required: false,
  },
});

const Crime = mongoose.model("crime", crimeSchema);

module.exports = Crime;
