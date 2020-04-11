import { dispatchHelper } from 'actions/action-helpers'

export const LOG__FETCH_ANNUAL_SUMMARY = 'log__fetch_annual_summary'

export function fetchAnnualSummary (year = new Date().getFullYear()) {
    return dispatchHelper(axios.post(`/api/transaction/overview/${year}`), LOG__FETCH_ANNUAL_SUMMARY)
}
