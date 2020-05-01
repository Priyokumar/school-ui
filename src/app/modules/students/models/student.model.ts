import { IAddress } from '../../employees/model/employeeModels';
import { Document } from '../../shared/model/shared.model';

export interface IStudent {

    id: number;
    registrationNo: string;
    registrationDate: string;
    gender: string;
    bloodGroup: string;
    religion: string;
    community: string;
    nationality: string;
    aadhaarNo: string;
    physicallyChallenged: boolean;
    status?: string;
    firstName: string;
    middleName: string;
    lastName: string;
    standard: string;
    rollNo: string;
    dob: string;
    joiningDate: string;
    profilePic?: Document;
    correspondentAddress: IAddress;
    sameAsPermAddr: boolean;
    permanentAddress: IAddress;
    fatherInfo: IGuardian;
    motherInfo: IGuardian;
    guardianInfo: IGuardian;
}

export interface IGuardian {

    id: number;
    name: string;
    dob: string;
    eduQualification: string;
    contactNo: string;
    occupation: string;
    income: number;
}

export const Standards: IKeyValue[] = [

    { key: 'NUSSERY', value: 'Nussery' },
    { key: 'KG', value: 'KG' },
    { key: 'CLASS_I', value: 'Class I' },
    { key: 'CLASS_II', value: 'Class II' },
    { key: 'CLASS_III', value: 'Class III' },
    { key: 'CLASS_IV', value: 'Class IV' },
    { key: 'CLASS_V', value: 'Class V' },
    { key: 'CLASS_VI', value: 'Class VI' },
    { key: 'CLASS_VII', value: 'Class VII' },
    { key: 'CLASS_VIII', value: 'Class VIII' },
    { key: 'CLASS_IX', value: 'Class IX' },
    { key: 'CLASS_X', value: 'Class X' }

];

export const StudentStatuses: string[] = ['Active', 'Inactive'];

export const Genders: IKeyValue[] = [
    { key: 'MALE', value: 'Male' },
    { key: 'FEMALE', value: 'Female' }
];


export interface IKeyValue {
    key: string;
    value: any;
}
