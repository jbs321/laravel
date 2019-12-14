export const LOG__FETCH_ANNUAL_SUMMARY = "log__fetch_annual_summary";

export function fetchAnnualSummary () {
    const request = axios.post("/logs/annual-summary");

    return {
        type: LOG__FETCH_ANNUAL_SUMMARY,
        payload: request
    }
}
