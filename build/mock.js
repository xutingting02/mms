const login = require('../mock/login.json')
const patientsList = require('../mock/patientsList.json')
const deletePatient = require('../mock/deletePatient.json')
const addPatient = require('../mock/addPatient.json')
const getPatientById = require('../mock/getPatientById.json')
const recordsList = require('../mock/recordsList.json')
const addRecord = require('../mock/addRecord.json')
const deleteRecord = require('../mock/deleteRecord.json')
const getRecordById = require('../mock/getRecordById.json')

function Mock (app) {
  app.post('/auth/login', function (req, res) {
    res.json(login)
  })

  app.get('/patients/list', function (req, res) {
    res.json(patientsList)
  })

  app.get('/patients/get', function (req, res) {
    res.json(getPatientById)
  })

  app.post('/patients/delete', function (req, res) {
    res.json(deletePatient)
  })

  app.post('/patients/add', function (req, res) {
    res.json(addPatient)
  })

  app.get('/records/list', function (req, res) {
    res.json(recordsList)
  })

  app.post('/records/delete', function (req, res) {
    res.json(deleteRecord)
  })

  app.post('/records/add', function (req, res) {
    res.json(addRecord)
  })

  app.get('/records/get', function (req, res) {
    res.json(getRecordById)
  })
}

module.exports = Mock
