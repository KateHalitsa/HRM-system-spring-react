import axios, { AxiosError, AxiosResponse } from "axios";

import {UserInfoResponse} from "./UserInfoResponse";
import {User} from "./user.model";
import {RoleForUser} from "./RoleForUser.model";
import {Employee} from "./employee.model";
import {EmployeePosition} from "./EmployeePosition.model";
import {Workplace} from "./workplace.model";
import {LookupItem} from "./LookupItem.model";
import {FeatureForWorkplace} from "./FeatureForWorkplace.model";
import {FeatureForEmployee} from "./FeatureForEmployee.model";
import {EmployeeEfficiencyTable} from "./EmployeeEfficiencyTable.model";
import {Project} from "./Project.model";

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
const lookup = {
    employee: (id: number) => request.get<LookupItem>(`/lookup/employee/${id}`),
    employeeList: (findNamePart: string) => request.post<LookupItem[]>('/lookup/employee', {findNamePart}),
    position: (id: number) => request.get<LookupItem>(`/lookup/employee_position/${id}`),
    positionList: (findNamePart: string) => request.post<LookupItem[]>('/lookup/employee_position', {findNamePart}),
    project: (id: number) => request.get<LookupItem>(`/lookup/project/${id}`),
    projectList: (findNamePart: string) => request.post<LookupItem[]>('/lookup/project', {findNamePart}),
};
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
    find: (findNamePart: string) => request.post<Employee[]>('/employee/find', {findNamePart}),
    features: (id: number) => request.get<FeatureForEmployee[]>(`/employee/features/${id}`),
    updateFeatures: (id: number, data: FeatureForEmployee[]) => request.put<FeatureForEmployee[]>(`/employee/features/${id}`, data),
};
const employeeEfficiency = {
    load: ()=> request.post<EmployeeEfficiencyTable>('/efficiency/load', {})
}
const positions = {
    list: () => request.get<EmployeePosition[]>('/employee_position'),
    details: (id: number) => request.get<EmployeePosition>(`/employee_position/${id}`),
    create: (data: EmployeePosition) => request.post<EmployeePosition>('/employee_position', data),
    update: (data: EmployeePosition) => request.put<EmployeePosition>(`/employee_position/${data.id}`, data),
    delete: (id: number) => request.delete(`/employee_position/${id}`),
    find: (findNamePart: string) => request.post<EmployeePosition[]>('/employee_position/find', {findNamePart})
};
const workplaces = {
    list: () => request.get<Workplace[]>('/workplace'),
    details: (id: number) => request.get<Workplace>(`/workplace/${id}`),
    create: (data: EmployeePosition) => request.post<Workplace>('/workplace', data),
    update: (data: EmployeePosition) => request.put<Workplace>(`/workplace/${data.id}`, data),
    delete: (id: number) => request.delete(`/workplace/${id}`),
    find: (findNamePart: string) => request.post<Workplace[]>('/workplace/find', {findNamePart}),
    features: (id: number) => request.get<FeatureForWorkplace[]>(`/workplace/features/${id}`),
    updateFeatures: (id: number, data: FeatureForWorkplace[]) => request.put<FeatureForWorkplace[]>(`/workplace/features/${id}`, data),
};
const features = {
    list: () => request.get<Workplace[]>('/employee_position_feature'),
    details: (id: number) => request.get<Workplace>(`/employee_position_feature/${id}`),
    create: (data: EmployeePosition) => request.post<Workplace>('/employee_position_feature', data),
    update: (data: EmployeePosition) => request.put<Workplace>(`/employee_position_feature/${data.id}`, data),
    delete: (id: number) => request.delete(`/employee_position_feature/${id}`),
    find: (findNamePart: string) => request.post<Workplace[]>('/employee_position_feature/find', {findNamePart})
};
const projects = {
    list: () => request.get<Project[]>('/project'),
    details: (id: number) => request.get<Project>(`/project/${id}`),
    create: (data: Project) => request.post<Project>('/project', data),
    update: (data: Project) => request.put<Project>(`/project/${data.id}`, data),
    delete: (id: number) => request.delete(`/project/${id}`),
    find: (findNamePart: string) => request.post<Project[]>('/project/find', {findNamePart})
};
const accessServerAPI = {
    loginUtils,
    lookup,
    employeeEfficiency,
    users,
    employees,
    positions,
    workplaces,
    features,
    projects
}

export default accessServerAPI;