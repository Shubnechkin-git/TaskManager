import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderMy from '../../Components/HeaderMy'
import { Group, Header, FormLayout, FormItem } from '@vkontakte/vkui';
import BackBtn from '../../Components/Button/BackBtn';
import axios from 'axios';
import styled from 'styled-components';
import VKBridge from '@vkontakte/vk-bridge';

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
                    axios.post('https://192.168.0.106:3000/tasks/create_task', taskData)
                        .then(res => {
                            console.log(res);
                        }).catch(err => {
                            console.log(err);
                        })
            }
        }).catch(err => console.log(err));
    };

    const [svgVisible, setSvgVisible] = useState(true);

        function handleChange(e) {
        const file = e.target.files[0];

        const imageBuffer = file;
        const reader = new FileReader();
        reader.readAsDataURL(new Blob([imageBuffer], { type: 'image/jpeg' }));
        reader.onload = () => {
            console.log('card:', props.vk_id);
            axios.post('https://192.168.0.106:3000/tasks/upload_image', { data: { file: reader.result, id: props.vk_id, id_task: props.id } })
                .then(response => {
                    console.log(response);
                    setFile(response.data.image);
                    // setFile(response.data.data[0].image);
                    props.reload();
                })
                .catch(error => {
                    console.error('Ошибка при загрузке файла:', error);
                });
            setSvgVisible(false);
        };
        setSvgVisible(false);
    }

    return (
        <Styled>
            <div className='container_quest' >
                <div className='container_input d-flex flex-column'>
                    <span className='fw-bold'>Введите название</span>
                    <input className='title' onChange={handleChangeTitle} value={title} placeholder='Домашка'></input>
                    {counter[0]}/50
                </div>
                <div className='container_input d-flex flex-column'>
                    <span className='fw-bold'>Добавьте изображения</span>
                    <div className='image d-flex justify-content-center align-items-center'>
                        {svgVisible === true && props.image == null ? (
                            <div className='d-flex justify-content-center w-100'>
                                <File className='image_upload' onChange={handleChange}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="black" />
                                        <path d="M11.9999 5.40002C12.3182 5.40002 12.6234 5.52645 12.8484 5.7515C13.0735 5.97654 13.1999 6.28176 13.1999 6.60002V10.8H17.3999C17.7182 10.8 18.0234 10.9265 18.2484 11.1515C18.4735 11.3765 18.5999 11.6818 18.5999 12C18.5999 12.3183 18.4735 12.6235 18.2484 12.8486C18.0234 13.0736 17.7182 13.2 17.3999 13.2H13.1999V17.4C13.1999 17.7183 13.0735 18.0235 12.8484 18.2486C12.6234 18.4736 12.3182 18.6 11.9999 18.6C11.6816 18.6 11.3764 18.4736 11.1514 18.2486C10.9263 18.0235 10.7999 17.7183 10.7999 17.4V13.2H6.5999C6.28164 13.2 5.97642 13.0736 5.75137 12.8486C5.52633 12.6235 5.3999 12.3183 5.3999 12C5.3999 11.6818 5.52633 11.3765 5.75137 11.1515C5.97642 10.9265 6.28164 10.8 6.5999 10.8H10.7999V6.60002C10.7999 6.28176 10.9263 5.97654 11.1514 5.7515C11.3764 5.52645 11.6816 5.40002 11.9999 5.40002Z" fill="white" />
                                    </svg>
                                </File>
                            </div>
                        ) : (
                            <img src={file} className='img-fluid' />
                        )
                        }
                    </div>
                </div>
                <div className='container_input d-flex flex-column'>
                    <span className='fw-bold'>Введите описание</span>
                    <textarea className='description' onChange={handleChangeDescription} value={description} placeholder="Сделать домашнее задание по русскому"></textarea>
                    {counter[1]}/1000
                </div>
                <div className='container_input d-flex flex-column'>
                    <span className='fw-bold'>Чек-лист</span>
                    <ul className='list d-flex justify-content-center flex-column'>
                        <li className='d-flex'>
                            <div className='check_list'></div><span>Русский язык</span>
                        </li>
                        <li className='d-flex'>
                            <div className='check_list_add'></div><span className='add'>Добавить</span>
                        </li>
                    </ul>
                </div>
                <div className='container_input d-flex flex-column'>
                    <button className='btn btn-dark '>Добавить таймер</button>
                </div>
                <div className='container_input d-flex flex-column'>
                    <button className='btn__create btn btn-dark' onClick={handleCreateTasks}>Создать задачу</button>
                </div>
            </div>
        </Styled >
    )
}

CreateQuest.propTypes = {
    // id: PropTypes.string.isRequired,
    // go: PropTypes.func.isRequired,
};

export default CreateQuest;