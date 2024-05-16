import { React, useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import HeaderMy from '../../Components/HeaderMy'
import { Group, Header, FormLayout, FormItem, File } from '@vkontakte/vkui';
import BackBtn from '../../Components/Button/BackBtn';
import axios from 'axios';
import styled from 'styled-components';
import VKBridge from '@vkontakte/vk-bridge';
import { Icon16Cancel, Icon16CancelCircleOutline, Icon24Camera } from '@vkontakte/icons';

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
        let value = e.target.value.trim();
        if (value !== '') {
            let truncatedValue = value.slice(0, 50);
            setCounter([truncatedValue.length, counter[1]]);
            setTitle(truncatedValue);
        }
        else {
            setTitle(null);
            setCounter([0, counter[1]]);
        }
    }

    const handleChangeDescription = (e) => {
        let value = e.target.value.trim();
        if (value !== '') {
            let truncatedValue = value.slice(0, 1000);
            setCounter([counter[0], truncatedValue.length]);
            setDescription(truncatedValue);
        }
        else {
            setDescription(null);
            setCounter([counter[0], 0]);
        }
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
                    axios.post('https://taskmanagerbackend.cleverapps.io/tasks/create_task', taskData)
                        .then(response => {
                            console.log(response);
                            if (response.data.success) {
                                props.openSuccess(response.data.message);
                                props.go('home', 1)
                                if (response.data.data.task_count[0][0].count % 10 == 0) {
                                    VKBridge.send('VKWebAppCheckNativeAds', {
                                        ad_format: 'interstitial ' /* Тип рекламы */
                                    })
                                        .then((data) => {
                                            if (data.result) {
                                                // Предзагруженные материалы есть
                                                VKBridge.send('VKWebAppShowNativeAds', {
                                                    ad_format: 'interstitial' /* Тип рекламы */
                                                })
                                                    .then((data) => {
                                                        if (data.result) {
                                                            // Реклама была показана
                                                            console.log(data.result);
                                                        } else {
                                                            // Ошибка
                                                        }
                                                    })
                                                    .catch((error) => { console.log(error); });
                                            } else {
                                                // Материалов нет 
                                                console.log('Материалов нет!');
                                            }
                                        })
                                        .catch((error) => { console.log(error); });
                                }
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
    const [error, setError] = useState(null);

    function handleChange(e) {
        const file = e.target.files[0];
        if (file != undefined && file != null) {
            if (file && file.type.match('image.*')) {
                setFile(file);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setImage(reader.result);
                };
                setError(null);
            } else {
                setError('Пожалуйста, выберите изображение!');
            }
        } else {
            setError(null);
        }
    }


    return (
        <Styled>
            <div className='container_quest' >
                <div className='container_input d-flex flex-column'>
                    <span className='fw-bold'>Введите название</span>
                    <input className='title' required onChange={handleChangeTitle} placeholder='Домашка'></input>
                    {counter[0]}/50
                </div>
                <div className='container_input d-flex flex-column'>
                    <span className='fw-bold'>Добавьте изображения</span>
                    <div className='d-flex justify-content-start mt-2 w-100'>
                        <File before={<Icon24Camera role="presentation" />} accept="image/*" className="me-2" onChange={handleChange} size="m">
                            Открыть галерею
                        </File>
                        {file !== null && (
                            <span className='d-flex align-items-center'>{file.name}<Icon16Cancel className='ms-2 mt-1' onClick={e => { setFile(null); setImage(null) }} /></span>
                        )}
                        <span className='text-danger'>{error && error}</span>
                    </div>
                </div>
                <div className='container_input d-flex flex-column'>
                    <span className='fw-bold'>Введите описание</span>
                    <textarea className='description' onChange={handleChangeDescription} placeholder="Сделать домашнее задание по русскому"></textarea>
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