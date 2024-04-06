import { gql } from "apollo-angular";

export interface registerUserRespone {
    registerUserMutation: {
    response: {
      id: string;
      status: boolean;
      message: string;
      code: number;
      
    };
  };
}

export const REGISTER_MUTATION = gql`
mutation RegisterUserMutation($input: UserRegistrationInputObject!) {
    registerUserMutation(input: $input) {
      response {
        id
        status
        code
        message
      }
    }
  }
`