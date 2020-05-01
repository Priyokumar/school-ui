import { Component, OnInit, AfterViewInit } from '@angular/core';
import Chart from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../shared/model/shared.model';
import { IStandard } from '../../maintenances/model/standard';
import { IStudent } from '../../students/models/student.model';
import { IEmployee } from '../../employees/model/employeeModels';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  studentsBarChart: any;
  students: IStudent[] = [];
  standards: IStandard[] = [];

  studentsBarChartLabels: string[] = [];
  studentsBarChartData: number[] = [];
  studentsBarChartDBgColor: string[] = [];
  studentsBarChartDBorderColor: string[] = [];
  admissionLineChart: any;
  allStudents: IStudent[] = [];
  admissionDashboardData: any[] = [];
  employees: IEmployee[] = [];
  teachingStaffs: IEmployee[] = [];
  totalAdmission: number;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getStandards();
    this.getAllStudents();
    this.getEmployees();
  }

  ngAfterViewInit(): void {
    this.getAdmissionByYear();
  }

  private async getAllStudents() {
    try {
      const resp = await this.http.get<any>(ApiEndpoint.STUDENTS).toPromise();
      this.allStudents = resp.data;

    } catch (error) {
      console.error(error);
    }
  }

  private async getStandards() {

    try {
      const resp = await this.http.get<any>(ApiEndpoint.STANDARD).toPromise();
      this.standards = resp.data;
      await this.getStudentsByStandard();
      this.drawStudentsBarChart();

    } catch (error) {
      console.error(error);
    }

  }

  private async getStudentsByStandard() {

    if (this.standards.length <= 0) {
      return;
    }

    for (const standard of this.standards) {
      await this.getStudents(standard);
    }

  }

  getEmployees() {

    this.http.get<any>(ApiEndpoint.EMPLOYEES).subscribe(data => {
      this.employees = data.data;
      this.teachingStaffs = this.employees.filter(employee => {
        if (employee.designation) {
          return employee.designation.toLowerCase().includes('staff');
        }
      });
    }, err => {
      console.error(err);
    });

  }

  private async getAdmissionByYear() {

    try {

      this.admissionDashboardData = await this.http.get<any>(ApiEndpoint.ADMISSIONS + '/year/' + new Date().getFullYear()).toPromise();

      if (this.admissionDashboardData) {
        this.drawAdmissionLineChart(this.admissionDashboardData);
      }

    } catch (error) {
      console.error(error);
    }
  }

  private async getStudents(standard: IStandard) {

    try {
      const resp = await this.http.get<any>(ApiEndpoint.STUDENTS, { params: { standard: standard.name } }).toPromise();
      this.studentsBarChartLabels.push(standard.name);

      /*  let red = parseFloat(Math.random().toFixed(3)) * 1000;
       let green = parseFloat(Math.random().toFixed(3)) * 1000;
       let blue = parseFloat(Math.random().toFixed(3)) * 1000;

       if (red >= 255) {
         red /= 5;
       }

       if (green >= 255) {
         green /= 5;
       }

       if (blue >= 255) {
         blue /= 5;
       }

       const bg = `rgba(${red},${green},${blue},0.3)`;
       const brd = `rgba(${red},${green},${blue},1)`; */

      const bg = `rgba(141, 182, 0,0.4)`;
      const brd = `rgba(141, 182, 0,1)`;

      this.studentsBarChartDBgColor.push(bg);
      this.studentsBarChartDBorderColor.push(brd);

      this.students = resp.data;
      this.studentsBarChartData.push(this.students.length);
    } catch (error) {
      console.error(error);
    }

  }

  private drawStudentsBarChart() {

    if (this.studentsBarChart) {
      this.studentsBarChart.clear();
    }

    this.studentsBarChart = new Chart('student-bar-chart', {
      type: 'bar',
      data: {
        labels: this.studentsBarChartLabels,
        datasets: [{
          label: 'Students',
          data: this.studentsBarChartData,
          backgroundColor: this.studentsBarChartDBgColor,
          borderColor: this.studentsBarChartDBorderColor,
          borderWidth: 1
        }]
      },
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              color: 'rgba(240, 240, 240, 0.9)',
            }
          }],
          xAxes: [{
            gridLines: {
              color: 'rgba(240, 240, 240, 0.9)',
            }
          }]
        }
      }
    });
  }

  private drawAdmissionLineChart(admissionsData: any[]) {

    const months = admissionsData.map(admission => {
      return admission.month;
    });

    const counts = admissionsData.map(admission => {
      return admission.count;
    });

    this.totalAdmission = counts.reduce((total, count) => {
      return total + count;
    });

    this.admissionLineChart = new Chart('admission-line-chart', {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          data: counts,
          label: 'Admissions',
          borderColor: '#8db600',
          fill: false
        }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: false,
          text: 'Admissions'
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            },
            gridLines: {
              color: 'rgba(240, 240, 240, 0.9)',
            }
          }],
          xAxes: [{
            gridLines: {
              color: 'rgba(240, 240, 240, 0.9)',
            }
          }]
        }
      }
    });
  }

  private generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
