import React, {Component} from "react";
import {Card, CardBody, CardHeader} from "reactstrap";

class PersonalHistory extends Component {
    render(){
        return (
            <Card color="light" className="me-4">
                <CardHeader className='py-1'>История работы на предприятии</CardHeader>
                <CardBody className="m-0 pb-0">
                    <br/><br/><br/><br/><br/>
                </CardBody>
            </Card>
        )
    }
}

export default PersonalHistory;