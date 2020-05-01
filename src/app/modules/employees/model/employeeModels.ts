import { IUser } from '../../shared/model/security';
import { Document } from '../../shared/model/shared.model';

export interface IEmployeeAttendence {
    id: number;
    attDate: string;
    employees: IEmployee[];

}

export interface IEmployeeHistory {
    id: number;
    employerName: string;
    address: string;
    startDate: string;
    endDate: string;
    designation: string;
}

export interface IAddress {
    id: number;
    firstLine: string;
    secondLine: string;
    country: string;
    state: string;
    district: string;
}

export interface IPersonalInfo {
    id: number;
    panCard: string;
    panCardDoc?: Document;
    aadharCard: string;
    aadharCardDoc?: Document;
    voterId: string;
    voterIdDoc?: Document;
    drivingLicence: string;
    drivingLicenceDoc?: Document;

    xCertDoc?: Document;
    xIICertDoc?: Document;
    graduationCertDoc?: Document;
    postGraduationCertDoc?: Document;
}

export interface IAcademicBackground {
    id: number;
    name: string;
    board: string;
    schoolInstitue: string;
    startYear: string;
    passOutYear: string;
    score: string;
    highestQualification: boolean;
}

export interface IDocument {
    id: string;
    name: string;
    type: string;
    documentName: string;
}

export interface IRecordAudit {
    createdBy: IUser;
    updatedBy: IUser;
    createdDate: string;
    updatedDate: string;
}

export interface IEmployeeSalary {
    id: number;
    salaryAmount: number;
    employee: IEmployee;
}

export interface IEmployee {

    id: number;
    empCode?: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    status?: string;
    dob: string;
    joiningDate: string;
    employeeType: string;
    designation: string;
    profilePic?: Document;

    personalInfo: IPersonalInfo;
    correspondentAddress: IAddress;
    permanentAddress: IAddress;
    sameAsPermanentAddress: boolean;

    lastEmployeeHistory: IEmployeeHistory;
    highestQualification: IAcademicBackground;
    recordAudit?: IRecordAudit;
}

export class EmployeeStatus {

    public static IN_ACTIVE = 'In active';
    public static ACTIVE = 'Active';
    public static EXPIRED = 'Expired';
}

export class EmployeeType {

    public static TEACHING_STAFF = 'Teaching staff';
    public static CLERK = 'Clerk';
    public static FINANCE = 'Finance';
}

export interface IPaySalary {
    id: number;
    payDate: string;
    paidAmount: number;
    dueAmount: number;
    employeeSalary: IEmployeeSalary;
}

export interface IAttendanceFormData {
    employee?: IEmployee;
    id?: number;
    email?: string;
    day: string;
    date: Date;
    timeIn: string;
    timeOut: string;
    total?: string;
    comment: string;
}

export interface IDesignation {
    id: number;
    name: string;
    description: string;
}

export interface IEmployeeType {
    id: number;
    name: string;
    description: string;
    designations: IDesignation[];
}
