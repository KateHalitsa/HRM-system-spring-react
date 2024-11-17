import {Employee} from "./employee.model";
import {Workplace} from "./workplace.model";

export class EmployeeEfficiencyCell{
    workplaceId: number = 0;
    employeeId: number = 0;
    efficiency: number = 0;
}

export class EmployeeEfficiencyTable{
    cells:  EmployeeEfficiencyCell[] = [];
    employees: Employee[] = [] ;
    workplaces: Workplace[] = [];
}