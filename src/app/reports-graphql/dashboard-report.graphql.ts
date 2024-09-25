import { gql } from "apollo-angular";

export const DASHBOARD_REPORT_QUERY =gql `
query GetAllDashboardReport($filtering: EpesaReportFilteringInputObject!) {
    getAllDashboardReport(filtering: $filtering) {
      response {
        id
        status
        code
        message
      }
      data {
        totalAmountToday
        totalAmountThisWeek
        totalAmountThisMonth
        totalAmountThisYear
      }
    }
  }
`