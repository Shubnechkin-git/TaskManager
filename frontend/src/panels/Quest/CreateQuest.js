import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderMy from '../../Components/HeaderMy'
import { Group, Header, FormLayout, FormItem, File } from '@vkontakte/vkui';
import BackBtn from '../../Components/Button/BackBtn';
import axios from 'axios';
import styled from 'styled-components';
import VKBridge from '@vkontakte/vk-bridge';
import { Icon24Camera } from '@vkontakte/icons';

const Styled = styled.div`
    svg{
        cursor:pointer;
    }
    .title{
        margin-top: 12px;
        border-radius: 10px;
        background-color: #9A9A9A;
        color: #736D6D;
        text-decoration: underline;
        height: 30px;
        padding: 12px;
    }
    .container_input{
        margin-bottom: 12px;
    }
    
    .image{
        background-color: #D9D9D9;
        margin-top: 12px;
        height: 240px;
        border-radius: 10px;
    }
    
    .description{
        background-color: #D9D9D9;
        margin-top: 12px;
        height: 240px;
        border-radius: 10px;
        color: #736D6D;
        text-decoration: underline;
        padding: 12px;
    }

    .list li{
        margin-top: 15px;
    }

    .list li::marker {
        content: none
    }

    .list .add{
        color: #736D6D;
    }

    .btn-dark{
        background-color: #696969;
        color: #FFFFFF;
        font-weight: bold;
        font-size: 18px;
        border-radius: 10px;
    }

    .check_list{
        height: 24px;
        width: 24px;
        background-color: #D9D9D9;
        cursor: pointer;
        border-radius: 10px;
        margin-right: 12px; 
    }

    .check_list_add{
        height: 24px;
        width: 24px;
        background-color: #736D6D;
        cursor: pointer;
        border-radius: 10px;
        margin-right: 12px; 
    }

    .btn.disabled, .btn:disabled, fieldset:disabled .btn{
        background-color: #696969;
        border-color: #696969;
        font-weight: bold;
        font-size: 18px;
        border-radius: 10px;
    }
    `


const CreateQuest = (props) => {

    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState(null);

    const [counter, setCounter] = useState([0, 0]);

    const handleChangeTitle = (e) => {
        let value = e.target.value;
        let truncatedValue = value.slice(0, 50);
        setCounter([truncatedValue.length, counter[1]])
        setTitle(truncatedValue);
    }

    // const handleChangeImage = (e) => {
    //     if (e.target.value.length <= 30)
    //         setTitle(e.target.value)
    // }

    const handleChangeDescription = (e) => {
        let value = e.target.value;
        let truncatedValue = value.slice(0, 1000);
        setCounter([counter[0], truncatedValue.length])
        setDescription(truncatedValue);
    }

    let vk_id;
    let taskData;
    const fetchUserId = async () => {
        try {
            const userInfo = await VKBridge.send('VKWebAppGetUserInfo');
            vk_id = userInfo.id;
            if (title != null) {

                taskData = {
                    vk_id: vk_id,
                    title: title,
                    description: description,
                    image: image
                };
                return taskData;
            }
        }
        catch (err) {
            console.log('taskData:', taskData);
        }
    }

    const handleCreateTasks = () => {
        let user = fetchUserId().then(res => {
            if (vk_id > 0 && title != null) {
                console.log("res:", res);
                if (title != null)
                    axios.post('https://192.168.0.108:5000/tasks/create_task', taskData)
                        .then(response => {
                            console.log(response);
                            if (response.data.success) {
                                props.openSuccess(response.data.message);
                                props.go('home', 1)
                            } else {
                                props.openError(response.data.message);
                            }
                        }).catch(err => {
                            console.log('sdfsdf', err);
                            props.openError('Повторите позже!');
                        })
            }
        }).catch(error => {
            console.log(error);
            props.openError('Повторите позже!');
        });
    };

    const [file, setFile] = useState(null);

    function handleChange(e) {
        const file = e.target.files[0];
        if (file) {
            setFile(file)
        }
        const imageBuffer = file;
        const reader = new FileReader();
        reader.readAsDataURL(new Blob([imageBuffer], { type: 'image/jpeg' }));
        reader.onload = () => {
            setImage(reader.result);
        };

    }

    return (
        <Styled>
            <div className='container_quest' >
                <div className='container_input d-flex flex-column'>
                    <span className='fw-bold'>Введите название</span>
                    <input className='title' required onChange={handleChangeTitle} value={title} placeholder='Домашка'></input>
                    {counter[0]}/50
                </div>
                <div className='container_input d-flex flex-column'>
                    <span className='fw-bold'>Добавьте изображения</span>
                    <div className='d-flex justify-content-start mt-2 w-100'>
                        <File before={<Icon24Camera role="presentation" />} className="me-2" onChange={handleChange} size="m">
                            Открыть галерею
                        </File>
                        {file !== null && file.name}
                    </div>
                </div>
                <div className='container_input d-flex flex-column'>
                    <span className='fw-bold'>Введите описание</span>
                    <textarea className='description' onChange={handleChangeDescription} value={description} placeholder="Сделать домашнее задание по русскому"></textarea>
                    {counter[1]}/1000
                </div>
                <div className='container_input d-flex flex-column'>
                    <button className={counter[0] > 0 ? 'btn__create btn btn-dark' : 'btn__create btn btn-dark disabled'} onClick={handleCreateTasks}>Создать задачу</button>
                </div>
            </div >
        </Styled >
    )
}

CreateQuest.propTypes = {
    // id: PropTypes.string.isRequired,
    // go: PropTypes.func.isRequired,
};

export default CreateQuest;