export class User {
  id!: number;
  login!: string;
  password!: string;
  email!: string;
  employeeId!: number;
}

export const emptyUser: User = {
  id: 0,
  login: '',
  password: '',
  email: '',
  employeeId: 0
};

