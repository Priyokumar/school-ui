import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { IStudent, Genders, StudentStatuses } from '../../../models/student.model';
import { IKeyValue } from 'src/app/modules/shared/model/IKeyVal';
import { bloodGroups, religions, communities, districts } from 'src/app/modules/shared/model/shared.model';
import { IStandard } from 'src/app/modules/maintenances/model/standard';

export class Student {

    studId: number;
    errorMessage: string;
    hasSubmitted = false;
    studentForm: FormGroup;
    student: IStudent;
    statuses: string[] = StudentStatuses;
    standards: IStandard[] = [];
    genders: IKeyValue[] = Genders;
    yesNo: IKeyValue[] = [{ key: 'Yes', value: true }, { key: 'No', value: false }];
    bloodGroups = bloodGroups;
    religions = religions;
    communities = communities;
    districts = districts;

    // Registration details
    idFormCtl = new FormControl('', null);
    registrationNoFormCtl = new FormControl('', null);
    registrationDateFormCtl = new FormControl('', null);
    statusFormCtl = new FormControl('', null);

    // Student basic details
    firstNameFormCtl = new FormControl('', Validators.required);
    middleNameFormCtl = new FormControl('', null);
    lastNameFormCtl = new FormControl('', Validators.required);
    standardFormCtl = new FormControl('', null);
    rollNoFormCtl = new FormControl('', null);
    dobFormCtl = new FormControl('', Validators.required);
    joiningDateFormCtl = new FormControl('', null);
    genderFormCtl = new FormControl('', null);
    bloodGroupFormCtl = new FormControl('', null);
    religionFormCtl = new FormControl('', null);
    casteFormCtl = new FormControl('', null);
    nationalityFormCtl = new FormControl('', null);
    communityFormCtl = new FormControl('', null);

    // Permanent Address details
    sameAsPermAddrFormCtl = new FormControl('', null);
    addIdFormCtl = new FormControl('', null);
    firstLineFormCtl = new FormControl('', null);
    secondLineFormCtl = new FormControl('', null);
    countryFormCtl = new FormControl('', null);
    stateFormCtl = new FormControl('', null);
    districtFormCtl = new FormControl('', null);

    // Correspondent Address
    corrAddIdFormCtl = new FormControl('', null);
    corrFirstLineFormCtl = new FormControl('', null);
    corrSecondLineFormCtl = new FormControl('', null);
    corrCountryFormCtl = new FormControl('', null);
    corrStateFormCtl = new FormControl('', null);
    corrDistrictFormCtl = new FormControl('', null);

    // Student Father details
    fInfoIdFormCtl = new FormControl('', null);
    fatherNameFormCtl = new FormControl('', null);
    fatherDobFormCtl = new FormControl('', null);
    fatherContactNoFormCtl = new FormControl('', null);
    fatherEduQualiFormCtl = new FormControl('', null);
    fatherOccupationFormCtl = new FormControl('', null);
    fatherAnnualIncomeFormCtl = new FormControl('', null);
    fatherAadhaarNoFormCtl = new FormControl('', null);

    // Student Mother details
    mInfoIdFormCtl = new FormControl('', null);
    motherNameFormCtl = new FormControl('', null);
    motherDobFormCtl = new FormControl('', null);
    motherContactNoFormCtl = new FormControl('', null);
    motherEduQualiFormCtl = new FormControl('', null);
    motherOccupationFormCtl = new FormControl('', null);
    motherAnnualIncomeFormCtl = new FormControl('', null);
    motherAadhaarNoFormCtl = new FormControl('', null);

    // Student Guardian details
    gInfoIdFormCtl = new FormControl('', null);
    guardianNameFormCtl = new FormControl('', null);
    guardianDobFormCtl = new FormControl('', null);
    guardianContactNoFormCtl = new FormControl('', null);
    guardianEduQualiFormCtl = new FormControl('', null);
    gaurdianOccupationFormCtl = new FormControl('', null);
    guardianAnnualIncomeFormCtl = new FormControl('', null);
    gaurdianAadhaarNoFormCtl = new FormControl('', null);

    constructor() {
        this.studentForm = new FormGroup({

            // Student basic details
            firstNameFormCtl: this.firstNameFormCtl,
            middleNameFormCtl: this.middleNameFormCtl,
            lastNameFormCtl: this.lastNameFormCtl,
            standardFormCtl: this.standardFormCtl,
            rollNoFormCtl: this.rollNoFormCtl,
            dobFormCtl: this.dobFormCtl,
            joiningDateFormCtl: this.joiningDateFormCtl,

            // Student Address details
            firstLineFormCtl: this.firstLineFormCtl,
            secondLineFormCtl: this.secondLineFormCtl,
            countryFormCtl: this.countryFormCtl,
            stateFormCtl: this.stateFormCtl,
            districtFormCtl: this.districtFormCtl,

            // Student Father details
            fatherNameFormCtl: this.fatherNameFormCtl,
            fatherDobFormCtl: this.fatherDobFormCtl,
            fatherContactNoFormCtl: this.fatherContactNoFormCtl,

            // Student Mother details
            motherNameFormCtl: this.motherNameFormCtl,
            motherDobFormCtl: this.motherDobFormCtl,
            motherContactNoFormCtl: this.motherContactNoFormCtl,

            // Student Guardian details
            guardianNameFormCtl: this.guardianNameFormCtl,
            guardianDobFormCtl: this.guardianDobFormCtl,
            guardianContactNoFormCtl: this.guardianContactNoFormCtl
        });

        this.registrationNoFormCtl.disable();
        this.registrationDateFormCtl.disable();
        this.registrationDateFormCtl.setValue(moment());
    }
}
