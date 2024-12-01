
export class EmployeeWorkplace {
  id: number = 0;
  workplaceId: number = 0;
  employeeId: number = 0;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  approved: boolean = false;
}

export class EmployeeWorkplaceView {
  id: number = 0;
  workplaceId: number = 0;
  employeeId: number = 0;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  approved: boolean = false;
  employeeFullName: string = "";
  workplaceName: string = "";
  projectName: string = "";
}
