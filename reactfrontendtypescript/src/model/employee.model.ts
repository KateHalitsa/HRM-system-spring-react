
export class Employee {
  id: number = 0;
  firstName: string = "";
  lastName: string = "";
  birthday: Date = new Date();
}

export function dateToISOStr(date: Date): string {
  return new Date(date).toISOString().split('T')[0];
}

export function dateToDisplayStr(date: Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("ru",{day: 'numeric', month: 'long', year: 'numeric'});
}


/*
export const emptyEmployee: Employee  = {
  id: 0,
  firstName: '',
  lastName: '',
  birthday: new Date(),
}; */