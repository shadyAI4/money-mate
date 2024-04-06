
export interface PesaInputObject{
    userUniqueId?: string
    amountSpend?:number
    serviceOrStaffSpend:string
    reasonOfSpend:string
}

export interface PesaObjectType {
    spendsUniqueId:string
    amountSpend :string
    serviceOrStaffSpend:string
    reasonOfSpend :string
    spendDate :string
}

export interface PesaFilteringInput {
    spendsUniqueid?:string
}