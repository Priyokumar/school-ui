
export interface IAdmissionFeeMaintenanceYearly {

    id: Number
    year: String
    maintenanceAdmissionFees: IAdmissionFeeMaintenance[]
}

export interface IAdmissionFeeMaintenance {

    id: Number
    standard: String
    feeAmount: Number
    admissionAmount: Number
}