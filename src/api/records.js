import http from './http'

const RECORDS_LIST_URL = '/records/list'
const DELETE_RECORD_URL = '/records/delete'
const ADD_RECORD_URL = '/records/add'
const GET_RECORD_URL = '/records/get'

export const getRecordsList = (params) => {
  return http.fetchGet(RECORDS_LIST_URL, {params: params})
}

export const deleteRecord = (params) => {
  return http.fetchPost(DELETE_RECORD_URL, params)
}

export const addRecord = (params) => {
  return http.fetchPost(ADD_RECORD_URL, params)
}

export const getRecordById = (params) => {
  return http.fetchGet(GET_RECORD_URL, {params: params})
}
