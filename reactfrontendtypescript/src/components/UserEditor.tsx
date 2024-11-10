import {User} from "../model/user.model";
import React, {Component} from "react";
import accessServerAPI from "../model/AccessServerAPI";
import {Card, CardBody, CardHeader, Container, Form, FormGroup} from 'reactstrap';
import {CloseButton, ErrorPanel, InputWithLabel, SaveButton} from "./CustomControls";
import {useNavigate} from "react-router-dom";
import {LookupSelector} from "./LookupSelector";


export type ButtonType = "save" | "apply" | "cancel" | "close";

export interface IUserEditorProps {
    userId: number;
    title: string;
    buttons: ButtonType[];
    navigate?: ReturnType<typeof useNavigate>;
    childContent?: JSX.Element;
}

interface IUserEditorState {
    user: User;
    dataChanged: boolean;
    password: string;
    passwordConfirm: string;
    errorMessage: string;
}

export class UserEditor extends Component<IUserEditorProps, IUserEditorState> {
    constructor(props: IUserEditorProps) {
        super(props);
        this.state = {
            user: new User(),
            dataChanged: false,
            password: "",
            passwordConfirm: "",
            errorMessage: ""
        };
        this.reloadUserFromServer = this.reloadUserFromServer.bind(this);
        this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.validateData = this.validateData.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentDidMount() {
        this.reloadUserFromServer();
    }
    componentDidUpdate(prevProps: IUserEditorProps, prevState: IUserEditorState){
        if (prevProps.userId !== this.props.userId){
            this.reloadUserFromServer();
        }
    }

    reloadUserFromServer(){
        const userId = this.props.userId;
        if (userId > 0) {
            accessServerAPI.users.details(userId)
                .then(
                    foundUser => this.setState({...this.state,
                        user: foundUser,
                        dataChanged: false,
                        password: "",
                        passwordConfirm: "",
                        errorMessage: ""})
                )
        }
    }

    onChangeLogin(event: React.ChangeEvent<HTMLInputElement>) {
        let user = this.state.user;
        user.login = event.target.value;
        this.setState({...this.state, user, dataChanged: true});
    }

    onChangeEmail(event: React.ChangeEvent<HTMLInputElement>)
    {
        let user = this.state.user;;
        user.email = event.target.value;
        this.setState({...this.state, user, dataChanged: true});
    }

    onChangePasswordConfirm(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.setState({...this.state, passwordConfirm: event.target.value, dataChanged: true});
    }

    onChangePassword(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.setState({...this.state, password: event.target.value, dataChanged: true});
    }

    validateData(){
        let errorMessage = "";
        const {user, password, passwordConfirm} = this.state;

        if (user.employeeId <= 0) {
            errorMessage = "Заполните поле 'Сотрудник'"
        } else if (user.login === "") {
            errorMessage = "Заполните 'Логин'"
        } else if ((user.id <= 0) && (password === "")) {
            errorMessage = "Заполните 'Пароль'"
        } else if (password !== passwordConfirm){
            errorMessage = "'Подтверждение пароля' не равно 'Паролю'"
        }else if (user.email === "")  {
            errorMessage = "Заполните 'Адрес почты'"
        }

        this.setState({...this.state, errorMessage});

        return errorMessage === "";
    }

    onSave(returnToList: boolean) {
        if(! this.validateData()){
            return;
        }

        const {user, password} = this.state;

        if (password !== ""){
            user.password = password;
        }

        let promisedSave = (user.id) ? (
            accessServerAPI.users.update(user)
        ) : (
            accessServerAPI.users.create(user)
        );

        promisedSave.then(savedUser => {
            this.setState({...this.state, user: savedUser, dataChanged: false, password: "", passwordConfirm: ""});
            if (returnToList && this.props.navigate) {
                this.props.navigate('/users');
            }
        })
    }

    onCancel(){
      this.reloadUserFromServer();
    }

    onChangeEmployeeId(newId: number){
        let user = this.state.user;
        user.employeeId = newId;
        this.setState({...this.state, user, dataChanged: true});

    }

    render() {
        const user  = this.state.user;
        const passwordPlaceholder = user.id ? 'для изменения пароля введите новый пароль' : '';

        let buttons: ButtonType[] = [];
        if (this.props.buttons) {
            buttons = this.props.buttons!;
        }

        return (
            <Container className="mx-0 my-0 px-0 py-0">
                <Card color="light"  className="mt-0 p-0">
                    <CardHeader className='py-1'>{this.props.title}</CardHeader>
                    <CardBody className="m-0 pb-0">
                        <Form>
                            <LookupSelector label="Сотрудник"
                                            lookupObjectId={user.employeeId}
                                            findFunction={accessServerAPI.lookup.employeeList}
                                            loadFunction={accessServerAPI.lookup.employee}
                                            onChange={this.onChangeEmployeeId}
                                            /*enabled={user.id <= 0}*/  />
                            <InputWithLabel label="Логин" id="login" value={user.login} onChange={this.onChangeLogin}/>
                            <InputWithLabel label="Пароль" id="password" type="password"
                                            placeholder={passwordPlaceholder}
                                            value={this.state.password} onChange={this.onChangePassword}/>
                            <InputWithLabel label="Подтверждение пароля" id="passwordConfirm" type="password"
                                            placeholder={passwordPlaceholder}
                                            value={this.state.passwordConfirm} onChange={this.onChangePasswordConfirm}/>
                            <InputWithLabel label="Адрес почты" id="email" value={user.email} onChange={this.onChangeEmail}/>
                            <ErrorPanel error={this.state.errorMessage}/>
                            <FormGroup className="text-end">
                                {buttons.includes("save") && <SaveButton onClick={() => this.onSave(true)} enabled={this.state.dataChanged} />}
                                {buttons.includes("apply") && <SaveButton onClick={() => this.onSave(false)} enabled={this.state.dataChanged} caption="Применить" />}
                                {buttons.includes("cancel") && <SaveButton onClick={() => this.onCancel()} enabled={this.state.dataChanged} caption="Отменить" color="danger"/>}
                                {buttons.includes("close") && <CloseButton to="/users" dataChanged={this.state.dataChanged} />}
                            </FormGroup>
                        </Form>
                    </CardBody>
                    {this.props.childContent}
                </Card>
            </Container>
        )
    }



}
