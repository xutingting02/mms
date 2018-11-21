import http from './http'

const PATIENTS_LIST_URL = '/patients/list'
const DELETE_PATIENT_URL = '/patients/delete'
const ADD_PATIENT_URL = '/patients/add'
const GET_PATIENT_URL = '/patients/get'

export const getPatientsList = (params) => {
  return http.fetchGet(PATIENTS_LIST_URL, {params: params})
}

export const deletePatient = (params) => {
  return http.fetchPost(DELETE_PATIENT_URL, params)
}

export const addPatient = (params) => {
  return http.fetchPost(ADD_PATIENT_URL, params)
}

export const getPatientById = (params) => {
  return http.fetchGet(GET_PATIENT_URL, {params: params})
}
