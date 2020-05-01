import { IStudent } from './student.model';

export interface IAdmission {
    id: number;
    admissionRefNo: string;
    status: string;
    academicYear: string;
    admissionDate: string;
    standard: string;
    admissionAmount: number;
    paidAmount: number;
    dueAmount: number;
    promiseToPayDate: string;
    student: IStudent;
    fees: IFee[];
}

export interface IFee {
    id: number;
    feeRefNo: string;
    status: string;
    amount: string;
    exptdateOfPayment: string;
    actdateOfPayment: string;
    monthOf: number;
}

export const AdmissionStatuses: string[] = ['Admitted', 'Expired'];

export interface IKeyValue {
    key: string;
    value: any;
}