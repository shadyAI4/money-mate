import {gql} from "apollo-angular";


// import {designationField} from "../../store/entities/user-management/designation/designation.graphql";


// export interface ProfileObject {
//   id?: string
//   profileUniqueId?: string
//   userFirstName?: string
//   userLastName?: string
//   userEmail?: string
//   profilePhone?: string
//   profileTitle?: string
//   profilePhoto?: string
//   profileType?: UserTypesEnum
  
// }



export const userMyProfileFields = `
id
userUniqueId
userFirstName
userLastName
userEmail
userPhone

`


export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    getUserProfile {
    response {
        id
        status
        code
        message
    }
    data {
      ${userMyProfileFields}
    }
  }
}
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateMyUserProfileMutation($input: UserInputObject) {
    updateMyUserProfileMutation(input: $input) {
     response{
      id
      status
      code
      message
     }
      data {
        ${userMyProfileFields}
      }
    }
  }
`