import { dispatchHelper } from 'actions/action-helpers'

export const LOG__FETCH_ANNUAL_SUMMARY = 'log__fetch_annual_summary'

export function fetchAnnualSummary () {
    return dispatchHelper(axios.post('/logs/annual-summary'), LOG__FETCH_ANNUAL_SUMMARY)
}
