import React, {Component} from "react";
import {UserEditor} from "../components/UserEditor";
import {auth} from "../PrivateRouteUtils/Auth";

class PersonalAccount extends Component {
    render(){
        const userId = auth.getUserInfo().id;
        return <UserEditor userId={userId} title="Нaстройки вашего акаунта"
                           buttons={["apply", "cancel"]}/>
    }
}
export default PersonalAccount;