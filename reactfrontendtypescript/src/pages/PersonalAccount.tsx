import React, {Component} from "react";
import {UserEditor} from "../components/UserEditor";
import {auth} from "../PrivateRouteUtils/Auth";
import ImageUploader from "../components/ImageUploader";

class PersonalAccount extends Component {
    render(){
        const userId = auth.getUserInfo().id;
        const imageComponent=<ImageUploader employeeId={auth.getUserInfo().employeeId}/>;
        return <UserEditor userId={userId} title="Нaстройки вашего акаунта"
                           buttons={["apply", "cancel"]}
                           imageContent={imageComponent}/>
    }
}
export default PersonalAccount;