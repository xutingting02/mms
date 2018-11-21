import http from './http'

const INCOME_REPORT_URL = '/report/income'

export const getIncomeList = (params) => {
  return http.fetchPost(INCOME_REPORT_URL, params)
}
