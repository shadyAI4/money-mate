
import { gql } from "apollo-angular";


export const GET_ALL_PESA_DATA_QUERY = gql `
query GetAllPesaData($filtering: PesaFilteringInput) {
  getAllPesaData(filtering: $filtering) {
    response {
      id
      status
      code
      message
    }
    data {
      spendsUniqueid
      amountSpend
      serviceOrStaffSpend
      reasonOfSpend
      spendDate
    }
  }
}
`;

export const ADD_USER_EXPENSES_MUTATION = gql `
mutation CreateNewConsumetion($input: PesaInputObject!) {
  createNewConsumetion(input: $input) {
    response {
      id
      status
      code
      message
    }
    data {
      spendsUniqueid
      amountSpend
      serviceOrStaffSpend
      reasonOfSpend
      spendDate
    }
  }
}
`;