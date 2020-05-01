import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IEmployee, EmployeeStatus, IAddress, IPersonalInfo, IEmployeeType, IDesignation } from '../../../model/employeeModels';
import { districts } from 'src/app/modules/shared/model/shared.model';
import { IKeyValue } from 'src/app/modules/shared/model/IKeyVal';

export class Employee {

    public empId: number;
    public errorMessage: string;
    public hasSubmitted = false;
    public employeeForm: FormGroup;
    public employee: IEmployee;
    public employeeStatuses = [EmployeeStatus.IN_ACTIVE, EmployeeStatus.ACTIVE, EmployeeStatus.EXPIRED];
    public employeeTypes: IEmployeeType[] = [];
    public correspondentAddress: IAddress;
    public permanentAddress: IAddress;
    public personalInfo: IPersonalInfo;
    districts = districts;
    designations: IDesignation[] = [];

    yesNo: IKeyValue[] = [
        { key: 'Yes', value: true },
        { key: 'No', value: false }
    ];

    constructor() {
        this.employeeForm = new FormGroup({

            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            email: this.email,
            dob: this.dob,
            joiningDate: this.joiningDate,
            employeeType: this.employeeType,
            designation: this.designation,


            // Personal Info
            panCard: this.panCard,
            aadharCard: this.aadharCard,
            voterId: this.voterId,
            drivingLicence: this.drivingLicence,

            // Correspondence Address
            corrFirstLine: this.corrFirstLine,
            corrSecondLine: this.corrSecondLine,
            corrCountry: this.corrCountry,
            corrState: this.corrState,
            corrDistrict: this.corrDistrict,
            sameAsPermanentAddress: this.sameAsPermanentAddress,

            // Permanent Address
            permtFirstLine: this.permtFirstLine,
            permtSecondLine: this.permtSecondLine,
            permtCountry: this.permtCountry,
            permtState: this.permtState,
            permtDistrict: this.permtDistrict,

            // Last Employee History
            employerName: this.employerNameFormCtl,
            address: this.addressFormCtl,
            startDate: this.startDateFormCtl,
            endDate: this.endDateFormCtl,
            empHistDesignation: this.empHistDesignationFormCtl,

            // Highest Qualification
            qualificationName: this.qualificationNameFormCtl,
            board: this.boardFormCtl,
            schoolInstitue: this.schoolInstitueFormCtl,
            startYear: this.startYearFormCtl,
            passOutYear: this.passOutYearFormCtl,
            score: this.scoreFormCtl

        });
    }

    public firstName = new FormControl('', Validators.required);
    public middleName = new FormControl('', null);
    public lastName = new FormControl('', Validators.required);
    public email = new FormControl('', [Validators.email]);
    public mobileNo = new FormControl('', [Validators.required]);
    public dob = new FormControl('', Validators.required);
    public joiningDate = new FormControl('', Validators.required);
    public employeeType = new FormControl('', Validators.required);
    public designation = new FormControl('', Validators.required);
    public status = new FormControl('', null);

    // Personal Info
    public pid = new FormControl('', null);
    public panCard = new FormControl('', null);
    public aadharCard = new FormControl('', null);
    public voterId = new FormControl('', null);
    public drivingLicence = new FormControl('', null);

    // Last Employee History
    public empHistIdFormCtl = new FormControl('', null);
    public employerNameFormCtl = new FormControl('', null);
    public addressFormCtl = new FormControl('', null);
    public startDateFormCtl = new FormControl('', null);
    public endDateFormCtl = new FormControl('', null);
    public empHistDesignationFormCtl = new FormControl('', null);

    // Highest Qualification
    public acaIdFormCtl = new FormControl('', null);
    public qualificationNameFormCtl = new FormControl('', null);
    public boardFormCtl = new FormControl('', null);
    public schoolInstitueFormCtl = new FormControl('', null);
    public startYearFormCtl = new FormControl('', null);
    public passOutYearFormCtl = new FormControl('', null);
    public scoreFormCtl = new FormControl('', null);

    // Correspondence Address
    public corAddId = new FormControl('', null);
    public corrFirstLine = new FormControl('', Validators.required);
    public corrSecondLine = new FormControl('', null);
    public corrCountry = new FormControl('', Validators.required);
    public corrState = new FormControl('', Validators.required);
    public corrDistrict = new FormControl('', Validators.required);
    public sameAsPermanentAddress = new FormControl('', null);

    // Permanent Address
    public permAddId = new FormControl('', null);
    public permtFirstLine = new FormControl('', null);
    public permtSecondLine = new FormControl('', null);
    public permtCountry = new FormControl('', null);
    public permtState = new FormControl('', null);
    public permtDistrict = new FormControl('', null);
}
