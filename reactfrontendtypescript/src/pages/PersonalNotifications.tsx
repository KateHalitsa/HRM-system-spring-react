import React, {Component} from "react";
import {Alert, Card, CardBody, CardHeader} from "reactstrap";

class PersonalNotifications extends Component {
    render(){
        return (
            <Card color="light" className="me-4">
                <CardHeader className='py-1'>Личные уведомления</CardHeader>
                <CardBody className="m-0 pb-0">
                        <Alert color="primary">
                            Рады приветствовать вас на новом рабочем месте.
                        </Alert>
                        <Alert color="secondary">
                            Общее собрание вашего отдела состоится в актовом зале главного офиса в 15:00 20 декабря 2024.
                        </Alert>
                        <Alert>
                            Пожалуйста, до 25 декабря 2024 года подайте в бухгалтерию главного офиса сведения о составе вашей семьи.
                        </Alert>
                        <Alert color="danger">
                            Празднование "Нового года" начнегся в 20:00 28 декабря 2024 года в ресторане "Шарли" по адресу "Минск, ул. Коммунистическая, 4"
                        </Alert>
                        <Alert color="warning">
                            Поздравляем всех сотрудников нашего коллектива с наступающим Рождеством и Новым годом!
                        </Alert>
                </CardBody>
            </Card>
        )
    }
}

export default PersonalNotifications;