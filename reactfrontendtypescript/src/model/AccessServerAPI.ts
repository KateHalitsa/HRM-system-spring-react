import axios, { AxiosError, AxiosResponse } from "axios";

import {UserInfoResponse} from "./UserInfoResponse";
import {User} from "./user.model";
import {RoleForUser} from "./RoleForUser.model";
import {Employee} from "./employee.model";

const token = "";

axios.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
axios.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
        const { data, status, config } = error.response!;
        switch (status) {
            case 400:
                console.error(data);
                break;

            case 401:
                console.error('unauthorised');
                break;

            case 404:
                console.error('/not-found');
                break;

            case 500:
                console.error('/server-error');
                break;
        }
        return Promise.reject(error);
    }
);
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

// Server API ========== START ================================

const loginUtils = {
    login: (username: string, password: string) => request.post<UserInfoResponse>('/auth/signin', {username, password}),
}

const users = {
    list: () => request.get<User[]>('/user'),
    details: (id: number) => request.get<User>(`/user/${id}`),
    create: (data: User) => request.post<User>('/user', data),
    update: (data: User) => request.put<User>(`/user/${data.id}`, data),
    delete: (id: number) => request.delete(`/user/${id}`),
    roles: (id: number) => request.get<RoleForUser[]>(`/user/roles/${id}`),
    updateRoles: (id: number, data: RoleForUser[]) => request.put<RoleForUser[]>(`/user/roles/${id}`, data),
};

const employees = {
    list: () => request.get<Employee[]>('/employee'),
    details: (id: number) => request.get<Employee>(`/employee/${id}`),
    create: (data: Employee) => request.post<Employee>('/employee', data),
    update: (data: Employee) => request.put<Employee>(`/employee/${data.id}`, data),
    delete: (id: number) => request.delete(`/employee/${id}`),
    find: (findNamePart: string) => request.post<Employee[]>('/employee/find', {findNamePart})
};

const accessServerAPI = {
    loginUtils,
    users,
    employees
}

export default accessServerAPI;