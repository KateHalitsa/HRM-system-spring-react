import React, {Component, useState} from 'react';
import {Button, Card, CardBody, CardHeader} from "reactstrap";
import accessServerAPI from "../model/AccessServerAPI";
import StackBarChart from "./charts/StackBarChart";

interface IImageUploaderProps {
    employeeId: number;
}

interface IImageUploaderState {
    imageFile: File | null;
    imageUrl: string | null;
    imageChanged: boolean;
}

export class ImageUploader extends Component<IImageUploaderProps, IImageUploaderState> {
    constructor(props: IImageUploaderProps) {
        super(props);
        this.state = { imageFile: null, imageUrl: null, imageChanged: false };

        this.loadImage = this.loadImage.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.saveImage = this.saveImage.bind(this);

    }
    componentDidMount() {
       this.loadImage(this.props.employeeId); // Загружаем изображение при монтировании компонента
    }

    loadImage(employeeId: number) {

            if (employeeId > 0){
        accessServerAPI.image.getById(employeeId)
            .then(response => {
                const url = URL.createObjectURL(response); // Создаем URL для изображения
                this.setState({ imageUrl: url });
            })
            .catch(error => {
                console.error('Ошибка при загрузке изображения:', error);
            });}
    }
    handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ imageFile: file, imageUrl: reader.result as string, imageChanged: true });
            };
            reader.readAsDataURL(file);
        }
    }

    saveImage() {
        const { imageFile } = this.state;
        const {employeeId}=  this.props;
        if (!imageFile) return;

        const formData = new FormData();
        formData.append('image', imageFile);

        /* accessServerAPI.image.create(formData).then(() => {
             this.setState({ imageChanged: false });
             // Здесь можно добавить код для обновления состояния или уведомления пользователя
         ;/**/
         accessServerAPI.image.createById(employeeId,formData).then(() => {
             this.setState({ imageChanged: false });
             // Здесь можно добавить код для обновления состояния или уведомления пользователя
         });
    }

    render() {
        const { imageUrl, imageChanged } = this.state;
        const { employeeId } = this.props;

        if (employeeId <= 0) {
            return <></>;
        }

        return (
            <Card color="light" className="m-3 mt-0" style={{  minWidth: '40%', marginRight: '20px'}}>
                <CardHeader className='py-1 m-0 navbar'>
                    <div className="me-auto">Загрузка изображения:</div>
                    <Button onClick={this.saveImage} disabled={!imageChanged}>Сохранить изображение</Button>
                </CardHeader>
                <CardBody className="m-0 text-start" >
                    <input type="file" accept="image/*" onChange={this.handleImageChange} />
                    {imageUrl && (
                        <div style={{ width: '300px', height: '300px', borderRadius: '50%', overflow: 'hidden', marginTop: '20px' }}>
                            <img
                                className="img-fluid"
                                src={imageUrl}
                                alt="Uploaded"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Используем object-fit
                            />
                        </div>
                    )}
                </CardBody>
            </Card>
        );
    }
}
export default ImageUploader;