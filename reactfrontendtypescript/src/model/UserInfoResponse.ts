export class UserInfoResponse {
    id!: number;
    username!: string;
    email!: string;
    roles: string[] = [];
    employeeId!: number;

    constructor(id: number, username: string, email: string, employeeId: number, roles: string[]) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.employeeId = employeeId;
    }
}