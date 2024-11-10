import {UserInfoResponse} from "../model/UserInfoResponse";

export enum ROLE {
    ADMIN = 'Администратор',
    HR_OFFICER = 'Сотрудник отдела кадров',
    INTERVIEWER = 'Проводящий интервью',
    HR_MANAGER = 'Менеджер по кадрам',
    DIRECTOR = 'Директор'
}

export class PageRoles
{
    path: string = '';
    roles: ROLE[] = [];
    constructor(path: string, roles: ROLE[])
    {
        this.path = path;
        this.roles = roles;
    }
}

export const PageAccess: PageRoles[] = [
    new PageRoles('/personal', []),
    new PageRoles('/users', [ROLE.ADMIN]),
    new PageRoles('/employees', [ROLE.HR_OFFICER, ROLE.DIRECTOR]),
    new PageRoles('/employee_position', [ROLE.HR_OFFICER, ROLE.DIRECTOR]),
    new PageRoles('/workplace', [ROLE.HR_OFFICER, ROLE.DIRECTOR]),
    new PageRoles('/employee_position_feature', [ROLE.HR_OFFICER, ROLE.DIRECTOR])
]

const userInfoKey = 'userInfo!Q@W#E$R';
const emptyUserInfo  = new UserInfoResponse(0,"", "", []);
const invalidUserID = -123;
let connectedUserInfo  = new UserInfoResponse(invalidUserID,"", "", []);

export const auth = {

    getUserInfo(): UserInfoResponse {
        if (connectedUserInfo.id == invalidUserID)
        {
            const userInfoStr = localStorage.getItem(userInfoKey) || "";
            if (userInfoStr.length > 0){
               const jsonObj = JSON.parse(userInfoStr);
                connectedUserInfo = new UserInfoResponse(jsonObj.id, jsonObj.username, jsonObj.email, jsonObj.roles);
            }
            else
            {
                connectedUserInfo =  emptyUserInfo;
            }
        }
        return connectedUserInfo;
    },
    setUserInfo(userInfo: UserInfoResponse){
        connectedUserInfo = userInfo;
        let userInfoStr = JSON.stringify(userInfo);
        localStorage.setItem(userInfoKey, userInfoStr);
    },
    isAuthenticated(): boolean {
        const userInfo = auth.getUserInfo();
        let result = userInfo.id > 0;
        return result;
    },
    logout(callBack: () => void): void {
        auth.setUserInfo(emptyUserInfo);
        callBack();
    },
    canAccess(path: string): boolean {
        let result = auth.isAuthenticated();
        if (result){
            result = false;
            let userRoles = auth.getUserInfo().roles;
            for (const pageRoles of PageAccess) {
               if (path.startsWith(pageRoles.path)){
                   if (pageRoles.roles.length === 0){
                       result = true;
                   } else{
                       for (const role of pageRoles.roles) {
                           let pageRoleName: string = role;
                           result  = userRoles.some(userRoleName => userRoleName === pageRoleName);
                           if (result) {
                               break;
                           }
                       }
                   }
               }
               if (result){
                   break;
               }
            }
        }
        return result;
    }
};

