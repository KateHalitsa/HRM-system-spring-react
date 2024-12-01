import React, {Component} from "react";
import {Card, CardBody, CardHeader, Input, Toast, ToastBody, ToastHeader} from "reactstrap";
import {auth} from "../PrivateRouteUtils/Auth";
import accessServerAPI from "../model/AccessServerAPI";
import {EmployeeWorkplaceView} from "../model/EmployeeWorkplace.model";
import {dateToDisplayStr} from "../components/DateUtils";


interface IPersonalHistoryProps {}

interface IPersonalHistoryState {
    employeeWorkplaces: EmployeeWorkplaceView[]
}


class PersonalHistory extends Component <IPersonalHistoryProps, IPersonalHistoryState> {

    componentDidMount() {
        const employeeId = auth.getUserInfo().employeeId;
        accessServerAPI.employeeWorkplaces.history(employeeId).then(
            employeeWorkplaces => {
                this.setState({employeeWorkplaces});
            }
        )
    }

    render(){
        let employeeWorkplaces: EmployeeWorkplaceView[] = [];
        if (this.state !== null){
            employeeWorkplaces = this.state.employeeWorkplaces;
        }
        return (
            <Card color="light" className="me-4">
                <CardHeader className='py-1'>История работы на предприятии</CardHeader>
                <CardBody className="m-0 py-0">
                    {employeeWorkplaces.map(employeeWorkplace => (
                    <div className="p-2 my-1 mx-4">
                        <Card className="border-primary" >
                            <CardHeader>
                                {employeeWorkplace.projectName} / {employeeWorkplace.workplaceName}
                            </CardHeader>
                            <CardBody>
                                Контракт от {dateToDisplayStr(employeeWorkplace.fromDate)}
                                &nbsp;до {dateToDisplayStr(employeeWorkplace.toDate)}
                                <br/>
                                <Input type="checkbox" checked={employeeWorkplace.approved} disabled
                                       style={{outline: "2px solid blue"}}/>
                                <span className="large">&nbsp;&nbsp;
                                    {employeeWorkplace.approved ? ("Контракт подписан") : ("Контракт на согласовании")}
                                </span>
                            </CardBody>
                        </Card>
                    </div>))
                    }
                </CardBody>
            </Card>
        )
    }
}

export default PersonalHistory;