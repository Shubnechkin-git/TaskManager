import { React } from 'react';
import PropTypes from 'prop-types';
import HeaderMy from '../../Components/HeaderMy'
import { Group, Header, FormLayout, FormItem} from '@vkontakte/vkui';
import BackBtn from '../../Components/Button/BackBtn';

import styled from 'styled-components';

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
    return (
                <Styled>
                    <div className='container_quest' >
                        <div className='container_input d-flex flex-column'>
                            <span className='fw-bold'>Введите название</span>
                            <input className='title' placeholder='Домашка'></input>
                        </div>
                        <div className='container_input d-flex flex-column'>
                            <span className='fw-bold'>Добавьте изображения</span>
                            <div className='image d-flex justify-content-center align-items-center'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="black" />
                                    <path d="M11.9999 5.40002C12.3182 5.40002 12.6234 5.52645 12.8484 5.7515C13.0735 5.97654 13.1999 6.28176 13.1999 6.60002V10.8H17.3999C17.7182 10.8 18.0234 10.9265 18.2484 11.1515C18.4735 11.3765 18.5999 11.6818 18.5999 12C18.5999 12.3183 18.4735 12.6235 18.2484 12.8486C18.0234 13.0736 17.7182 13.2 17.3999 13.2H13.1999V17.4C13.1999 17.7183 13.0735 18.0235 12.8484 18.2486C12.6234 18.4736 12.3182 18.6 11.9999 18.6C11.6816 18.6 11.3764 18.4736 11.1514 18.2486C10.9263 18.0235 10.7999 17.7183 10.7999 17.4V13.2H6.5999C6.28164 13.2 5.97642 13.0736 5.75137 12.8486C5.52633 12.6235 5.3999 12.3183 5.3999 12C5.3999 11.6818 5.52633 11.3765 5.75137 11.1515C5.97642 10.9265 6.28164 10.8 6.5999 10.8H10.7999V6.60002C10.7999 6.28176 10.9263 5.97654 11.1514 5.7515C11.3764 5.52645 11.6816 5.40002 11.9999 5.40002Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                        <div className='container_input d-flex flex-column'>
                            <span className='fw-bold'>Введите описание</span>
                            <textarea className='description' placeholder="Сделать домашнее задание по русскому"></textarea>
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
                            <button className='btn__create btn btn-dark'>Создать задачу</button>
                        </div>
                    </div>
                </Styled>
    )
}

CreateQuest.propTypes = {
    // id: PropTypes.string.isRequired,
    // go: PropTypes.func.isRequired,
};

export default CreateQuest;