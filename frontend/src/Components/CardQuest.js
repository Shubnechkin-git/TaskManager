import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { File } from '@vkontakte/vkui';

import axios from 'axios';

import styled from 'styled-components';

const Styled = styled.div`
.image_upload{
    background-color: transparent;
    width: 80%;
}
    .quest{
        background-color: #9A9A9A;
        border-radius: 10px;
    }
	.img{
        min-width: 100px;
        min-height: 100px;
        background-color: #D9D9D9;
        border-radius: 10px;
        margin-right: 12px;
    }
    .img img{
        width: 100%;
        height: 100%;
        object-fit: cover; /* Заполнение под контейнер */
        border-radius: 10px;
        padding: 3px;
    }
    .quest_list{
        background-color: #D9D9D9;
        color: #292929;
        border-radius: 10px;
        font-size: 16px;
    }
    .quest_list ul{
        margin-top:20px;
        padding-right:20px;
        padding-left:20px;
    }

    .quest_list li{
        margin-top:7px;
        margin-bottom:7px;
    }

    .quest_list li::marker {
        content: none;
    }

    .quest_head{
        padding:12px;
        padding-bottom: 12px;
    }
    
    .quest_list .add{
        color: #7A7A7A;
    }
    .quest_description{
        background-color: #D9D9D9;
        color: #292929;
        border-radius: 10px;
        padding: 8px;
    }
    .quest_description textarea{
        width:100%;
        height:84px;
        background-color: transparent;
        color: #292929;
        resize: none;
        border:none;
    }
    .quest_foot{
        padding: 0px 12px 12px 12px;
    }
    .header_quest{
        padding-bottom: 8px;
        padding-top: 16px;
        font-size: 15px
    }
    .footer_quest{
        color: #7A7A7A;
        font-size: 12px;
        padding-top: 4px;
    }
    .btn_group div{
        padding:6px;
        padding-bottom: 0px;
        padding-top: 0px;
    }
    .card_quest{
        width:100%;
        padding: 16px;
        padding-bottom:0px;
        padding-top:0px;
    }
    .card_quest .padding{
        padding-bottom:12px;
    }
    svg{
        cursor:pointer;
    }

    .check_list{
        height: 24px;
        width: 24px;
        background-color: #292929;
        cursor: pointer;
        border-radius: 10px;
        margin-right: 12px; 
    }

    .check_list_add{
        height: 24px;
        width: 24px;
        background-color: #7A7A7A;
        cursor: pointer;
        border-radius: 10px;
        margin-right: 12px; 
    }

    .vkuiButton--align-left .vkuiButton__in{
        justify-content: center;
    }
    `


export default function CardQuest(props) {
    const [file, setFile] = useState(null);
    const [svgVisible, setSvgVisible] = useState(true);

    function handleChange(e) {
        const file = e.target.files[0];

        const imageBuffer = file;
        const reader = new FileReader();
        reader.readAsDataURL(new Blob([imageBuffer], { type: 'image/jpeg' }));
        reader.onload = () => {
            console.log('card:', props.vk_id);
            axios.post('https://192.168.0.108:5000/tasks/upload_image', { data: { file: reader.result, id: props.vk_id, id_task: props.id } })
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

    const handleDelete = () => {
        axios.delete('https://192.168.0.108:5000/tasks/delete_task', { params: { id: props.id, vk_id: props.vk_id } }).then(response => {
            if (response.data.success) {
                props.getTasksUser();
                props.openSuccess(response.data.message);
            }
            else
                props.openError(response.data.message);
        }).catch(error => {
            console.log(error);
            props.openError(error.response.data.message);
        });
    }

    const handleDone = () => {
        axios.delete('https://192.168.0.108:5000/tasks/done_task', { params: { id: props.id, vk_id: props.vk_id } }).then(response => {
            if (response.data.success) {
                props.getTasksUser();
                props.openSuccess(response.data.message);
            }
            else
                props.openError(response.data.message);
        }).catch(error => {
            console.log(error);
            props.openError(error.response.data.message);
        });
    }

    return (
        <>
            <Styled>
                <div className='card_quest mb-2 mt-2'>
                    <div className='header_quest d-flex justify-content-between align-items-center'>
                        <div>
                            <span className='fw-bold'>{props.title}</span>
                        </div>
                        <div className='btn_group d-flex'>
                            <div>
                                <svg width="35" height="34" viewBox="0 0 35 34" fill="none" onClick={handleDone} xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3.01172" y="3" width="28.1642" height="28" rx="10" fill="#48FD48" />
                                    <path d="M14.9423 20.0021L12.59 16.8607C12.5036 16.7452 12.4009 16.6535 12.2879 16.591C12.1749 16.5285 12.0537 16.4963 11.9314 16.4963C11.8091 16.4963 11.688 16.5285 11.575 16.591C11.462 16.6535 11.3593 16.7452 11.2728 16.8607C11.1863 16.9762 11.1177 17.1133 11.0709 17.2642C11.0241 17.4152 11 17.5769 11 17.7403C11 17.9036 11.0241 18.0654 11.0709 18.2163C11.1177 18.3672 11.1863 18.5044 11.2728 18.6199L14.2774 22.6325C14.4538 22.8678 14.6929 23 14.9423 23C15.1916 23 15.4307 22.8678 15.6071 22.6325L22.7516 13.091C22.9154 12.8548 23.0044 12.5431 22.9998 12.2212C22.9952 11.8993 22.8975 11.5923 22.727 11.3646C22.5565 11.137 22.3267 11.0064 22.0856 11.0002C21.8446 10.9941 21.6112 11.1129 21.4344 11.3318L14.9423 20.0021Z" fill="white" />
                                    <rect x="0.5" y="0.5" width="33.1877" height="33" rx="10.5" stroke="#4D4949" strokeDasharray="2 2" />
                                </svg>
                            </div>
                            <div>
                                <svg width="35" height="34" viewBox="0 0 35 34" onClick={handleDelete} fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3.01172" y="3" width="28.1642" height="28" rx="10" fill="#FF7070" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.6277 12.7665H11.5625C11.4133 12.7665 11.2702 12.8223 11.1648 12.9216C11.0593 13.0208 11 13.1555 11 13.2959C11 13.4362 11.0593 13.5709 11.1648 13.6701C11.2702 13.7694 11.4133 13.8252 11.5625 13.8252H11.9713L12.6515 20.352C12.6898 20.7211 12.722 21.0295 12.7693 21.2794C12.8188 21.5405 12.8915 21.7812 13.034 22.0049C13.255 22.3521 13.5805 22.6299 13.9693 22.8031C14.2198 22.9146 14.4808 22.9598 14.7628 22.9795C15.0328 23 15.3605 23 15.755 23H18.245C18.6395 23 18.968 23 19.2372 22.9802C19.5192 22.9591 19.7803 22.9146 20.0308 22.8038C20.4196 22.6304 20.7451 22.3524 20.966 22.0049C21.1085 21.7812 21.1812 21.5412 21.2308 21.2794C21.278 21.0288 21.3103 20.7218 21.3485 20.352L22.0287 13.8252H22.4375C22.5867 13.8252 22.7298 13.7694 22.8352 13.6701C22.9407 13.5709 23 13.4362 23 13.2959C23 13.1555 22.9407 13.0208 22.8352 12.9216C22.7298 12.8223 22.5867 12.7665 22.4375 12.7665H19.3722C19.2461 12.2637 18.9432 11.8157 18.5126 11.4951C18.082 11.1744 17.5491 11 17 11C16.4509 11 15.918 11.1744 15.4874 11.4951C15.0568 11.8157 14.7539 12.2637 14.6277 12.7665ZM15.8135 12.7665H18.1865C18.08 12.5553 17.912 12.3768 17.7019 12.2518C17.4919 12.1268 17.2485 12.0604 17 12.0604C16.7515 12.0604 16.5081 12.1268 16.2981 12.2518C16.088 12.3768 15.92 12.5553 15.8135 12.7665ZM20.8985 13.8252H13.1015L13.769 20.2278C13.8095 20.623 13.8372 20.8898 13.8763 21.0945C13.9137 21.2928 13.9543 21.3923 13.9978 21.4615C14.1046 21.6292 14.262 21.7633 14.45 21.8468C14.5265 21.8807 14.636 21.9089 14.8498 21.9244C15.0703 21.9414 15.3545 21.9414 15.776 21.9414H18.2225C18.644 21.9414 18.9282 21.9414 19.1488 21.9251C19.3625 21.9089 19.4712 21.8807 19.5485 21.8468C19.7366 21.7631 19.894 21.6287 20.0008 21.4607C20.0443 21.3923 20.0848 21.2928 20.1222 21.0938C20.1613 20.8891 20.1897 20.623 20.2303 20.2285L20.8977 13.8252H20.8985ZM18.734 15.2381C18.8076 15.2439 18.8793 15.2633 18.945 15.2951C19.0107 15.327 19.069 15.3707 19.1167 15.4238C19.1644 15.4769 19.2006 15.5383 19.223 15.6045C19.2455 15.6707 19.2539 15.7405 19.2477 15.8098L18.8727 20.0464C18.8558 20.1828 18.7831 20.3076 18.6702 20.3945C18.5573 20.4814 18.4129 20.5236 18.2676 20.5123C18.1222 20.5009 17.9872 20.4369 17.891 20.3336C17.7949 20.2304 17.7451 20.096 17.7523 19.9589L18.1273 15.7222C18.1333 15.6529 18.1538 15.5854 18.1876 15.5235C18.2215 15.4616 18.2679 15.4066 18.3243 15.3617C18.3808 15.3167 18.446 15.2826 18.5165 15.2614C18.5869 15.2402 18.6603 15.2323 18.734 15.2381ZM15.266 15.2381C15.3397 15.2323 15.4139 15.2402 15.4843 15.2614C15.5547 15.2826 15.62 15.3167 15.6764 15.3617C15.7328 15.4066 15.7793 15.4616 15.8131 15.5235C15.8469 15.5854 15.8674 15.6529 15.8735 15.7222L16.2485 19.9582C16.2609 20.0981 16.2138 20.2369 16.1174 20.3441C16.0211 20.4514 15.8834 20.5182 15.7347 20.5299C15.5861 20.5416 15.4385 20.4972 15.3246 20.4065C15.2107 20.3159 15.1397 20.1863 15.1272 20.0464L14.7522 15.8098C14.7461 15.7405 14.7545 15.6707 14.777 15.6045C14.7994 15.5383 14.8356 15.4769 14.8833 15.4238C14.931 15.3707 14.9893 15.327 15.055 15.2951C15.1207 15.2633 15.1924 15.2439 15.266 15.2381Z" fill="white" />
                                    <rect x="0.5" y="0.5" width="33.1877" height="33" rx="10.5" stroke="#4D4949" strokeDasharray="2 2" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    {props.description == null && props.image == null ? null :
                        <div className='quest'>
                            <div className='quest_head d-flex'>
                                {props.description !== null ? (
                                    <div className='img d-flex align-items-center col-1'>
                                        {props.image !== null && (
                                            < img src={props.image} />
                                        )}
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
                                ) : (
                                    null
                                )}
                                {props.description !== null && (
                                    <div className='quest_foot w-100 p-0'>
                                        <div className='quest_description'>
                                            <textarea readOnly value={props.description}>
                                            </textarea>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                </div>
            </Styled >

            {/* <Styled>
                <div className='card_quest mb-3'>
                    <div className='header_quest d-flex justify-content-between align-items-center'>
                        <div>
                            <span className='fw-bold'>Задача 2.</span>
                        </div>
                        <div className='btn_group d-flex'>
                            <div>
                                <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3.01172" y="3" width="28.1642" height="28" rx="10" fill="#9A9A9A" />
                                    <rect x="0.5" y="0.5" width="33.1877" height="33" rx="10.5" stroke="#4D4949" strokeDasharray="2 2" />
                                    <path d="M21.4688 14.6364L19.3644 12.5324L12.1816 19.7152C11.7378 20.1589 11.4337 20.7228 11.3069 21.3374L11.0033 22.807C10.9979 22.8331 10.9991 22.8602 11.0068 22.8857C11.0145 22.9112 11.0284 22.9344 11.0473 22.9532C11.0662 22.972 11.0894 22.9858 11.115 22.9934C11.1405 23.0009 11.1676 23.002 11.1936 22.9966L12.6619 22.6938C13.2768 22.5671 13.8411 22.2631 14.2851 21.8192L21.4688 14.6364ZM22.2487 11.3526C22.1369 11.2408 22.0041 11.1522 21.8581 11.0916C21.712 11.0311 21.5554 11 21.3973 11C21.2392 11 21.0826 11.0311 20.9365 11.0916C20.7904 11.1522 20.6577 11.2408 20.5459 11.3526L20.1202 11.7775L22.2246 13.8807L22.6479 13.4575C22.8734 13.2313 23 12.9249 23 12.6054C23 12.286 22.8734 11.9796 22.6479 11.7534L22.2487 11.3526Z" fill="white" />
                                </svg>
                            </div>
                            <div>
                                <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3.01172" y="3" width="28.1642" height="28" rx="10" fill="#48FD48" />
                                    <path d="M14.9423 20.0021L12.59 16.8607C12.5036 16.7452 12.4009 16.6535 12.2879 16.591C12.1749 16.5285 12.0537 16.4963 11.9314 16.4963C11.8091 16.4963 11.688 16.5285 11.575 16.591C11.462 16.6535 11.3593 16.7452 11.2728 16.8607C11.1863 16.9762 11.1177 17.1133 11.0709 17.2642C11.0241 17.4152 11 17.5769 11 17.7403C11 17.9036 11.0241 18.0654 11.0709 18.2163C11.1177 18.3672 11.1863 18.5044 11.2728 18.6199L14.2774 22.6325C14.4538 22.8678 14.6929 23 14.9423 23C15.1916 23 15.4307 22.8678 15.6071 22.6325L22.7516 13.091C22.9154 12.8548 23.0044 12.5431 22.9998 12.2212C22.9952 11.8993 22.8975 11.5923 22.727 11.3646C22.5565 11.137 22.3267 11.0064 22.0856 11.0002C21.8446 10.9941 21.6112 11.1129 21.4344 11.3318L14.9423 20.0021Z" fill="white" />
                                    <rect x="0.5" y="0.5" width="33.1877" height="33" rx="10.5" stroke="#4D4949" strokeDasharray="2 2" />
                                </svg>
                            </div>
                            <div>
                                <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3.01172" y="3" width="28.1642" height="28" rx="10" fill="#FF7070" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.6277 12.7665H11.5625C11.4133 12.7665 11.2702 12.8223 11.1648 12.9216C11.0593 13.0208 11 13.1555 11 13.2959C11 13.4362 11.0593 13.5709 11.1648 13.6701C11.2702 13.7694 11.4133 13.8252 11.5625 13.8252H11.9713L12.6515 20.352C12.6898 20.7211 12.722 21.0295 12.7693 21.2794C12.8188 21.5405 12.8915 21.7812 13.034 22.0049C13.255 22.3521 13.5805 22.6299 13.9693 22.8031C14.2198 22.9146 14.4808 22.9598 14.7628 22.9795C15.0328 23 15.3605 23 15.755 23H18.245C18.6395 23 18.968 23 19.2372 22.9802C19.5192 22.9591 19.7803 22.9146 20.0308 22.8038C20.4196 22.6304 20.7451 22.3524 20.966 22.0049C21.1085 21.7812 21.1812 21.5412 21.2308 21.2794C21.278 21.0288 21.3103 20.7218 21.3485 20.352L22.0287 13.8252H22.4375C22.5867 13.8252 22.7298 13.7694 22.8352 13.6701C22.9407 13.5709 23 13.4362 23 13.2959C23 13.1555 22.9407 13.0208 22.8352 12.9216C22.7298 12.8223 22.5867 12.7665 22.4375 12.7665H19.3722C19.2461 12.2637 18.9432 11.8157 18.5126 11.4951C18.082 11.1744 17.5491 11 17 11C16.4509 11 15.918 11.1744 15.4874 11.4951C15.0568 11.8157 14.7539 12.2637 14.6277 12.7665ZM15.8135 12.7665H18.1865C18.08 12.5553 17.912 12.3768 17.7019 12.2518C17.4919 12.1268 17.2485 12.0604 17 12.0604C16.7515 12.0604 16.5081 12.1268 16.2981 12.2518C16.088 12.3768 15.92 12.5553 15.8135 12.7665ZM20.8985 13.8252H13.1015L13.769 20.2278C13.8095 20.623 13.8372 20.8898 13.8763 21.0945C13.9137 21.2928 13.9543 21.3923 13.9978 21.4615C14.1046 21.6292 14.262 21.7633 14.45 21.8468C14.5265 21.8807 14.636 21.9089 14.8498 21.9244C15.0703 21.9414 15.3545 21.9414 15.776 21.9414H18.2225C18.644 21.9414 18.9282 21.9414 19.1488 21.9251C19.3625 21.9089 19.4712 21.8807 19.5485 21.8468C19.7366 21.7631 19.894 21.6287 20.0008 21.4607C20.0443 21.3923 20.0848 21.2928 20.1222 21.0938C20.1613 20.8891 20.1897 20.623 20.2303 20.2285L20.8977 13.8252H20.8985ZM18.734 15.2381C18.8076 15.2439 18.8793 15.2633 18.945 15.2951C19.0107 15.327 19.069 15.3707 19.1167 15.4238C19.1644 15.4769 19.2006 15.5383 19.223 15.6045C19.2455 15.6707 19.2539 15.7405 19.2477 15.8098L18.8727 20.0464C18.8558 20.1828 18.7831 20.3076 18.6702 20.3945C18.5573 20.4814 18.4129 20.5236 18.2676 20.5123C18.1222 20.5009 17.9872 20.4369 17.891 20.3336C17.7949 20.2304 17.7451 20.096 17.7523 19.9589L18.1273 15.7222C18.1333 15.6529 18.1538 15.5854 18.1876 15.5235C18.2215 15.4616 18.2679 15.4066 18.3243 15.3617C18.3808 15.3167 18.446 15.2826 18.5165 15.2614C18.5869 15.2402 18.6603 15.2323 18.734 15.2381ZM15.266 15.2381C15.3397 15.2323 15.4139 15.2402 15.4843 15.2614C15.5547 15.2826 15.62 15.3167 15.6764 15.3617C15.7328 15.4066 15.7793 15.4616 15.8131 15.5235C15.8469 15.5854 15.8674 15.6529 15.8735 15.7222L16.2485 19.9582C16.2609 20.0981 16.2138 20.2369 16.1174 20.3441C16.0211 20.4514 15.8834 20.5182 15.7347 20.5299C15.5861 20.5416 15.4385 20.4972 15.3246 20.4065C15.2107 20.3159 15.1397 20.1863 15.1272 20.0464L14.7522 15.8098C14.7461 15.7405 14.7545 15.6707 14.777 15.6045C14.7994 15.5383 14.8356 15.4769 14.8833 15.4238C14.931 15.3707 14.9893 15.327 15.055 15.2951C15.1207 15.2633 15.1924 15.2439 15.266 15.2381Z" fill="white" />
                                    <rect x="0.5" y="0.5" width="33.1877" height="33" rx="10.5" stroke="#4D4949" strokeDasharray="2 2" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className='quest'>
                        <div className='quest_head d-flex'>
                            <div className='img d-flex justify-content-center align-items-center col-1'>
                                {svgVisible === true ? (
                                    <File className='image_upload' onChange={handleChange}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="black" />
                                            <path d="M11.9999 5.40002C12.3182 5.40002 12.6234 5.52645 12.8484 5.7515C13.0735 5.97654 13.1999 6.28176 13.1999 6.60002V10.8H17.3999C17.7182 10.8 18.0234 10.9265 18.2484 11.1515C18.4735 11.3765 18.5999 11.6818 18.5999 12C18.5999 12.3183 18.4735 12.6235 18.2484 12.8486C18.0234 13.0736 17.7182 13.2 17.3999 13.2H13.1999V17.4C13.1999 17.7183 13.0735 18.0235 12.8484 18.2486C12.6234 18.4736 12.3182 18.6 11.9999 18.6C11.6816 18.6 11.3764 18.4736 11.1514 18.2486C10.9263 18.0235 10.7999 17.7183 10.7999 17.4V13.2H6.5999C6.28164 13.2 5.97642 13.0736 5.75137 12.8486C5.52633 12.6235 5.3999 12.3183 5.3999 12C5.3999 11.6818 5.52633 11.3765 5.75137 11.1515C5.97642 10.9265 6.28164 10.8 6.5999 10.8H10.7999V6.60002C10.7999 6.28176 10.9263 5.97654 11.1514 5.7515C11.3764 5.52645 11.6816 5.40002 11.9999 5.40002Z" fill="white" />
                                        </svg>
                                    </File>
                                ) : (
                                    <img src={file} className='img-fluid' />
                                )
                                }
                            </div>
                            <div className='quest_list d-flex justify-content-start align-items-center w-100'>
                                <ul className='d-flex flex-column'>
                                    <li className='d-flex'>
                                        <div className='check_list'></div><span>Русский язык</span>
                                    </li>
                                    <li className='d-flex'>
                                        <div className='check_list_add'></div><span className='add'>Добавить</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='padding'>

                        </div>
                    </div>
                </div>
            </Styled >

            <Styled>
                <div className='card_quest mb-5'>
                    <div className='header_quest d-flex justify-content-between align-items-center'>
                        <div>
                            <span className='fw-bold'>Задача 3.</span>
                        </div>
                        <div className='btn_group d-flex'>
                            <div>
                                <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3.01172" y="3" width="28.1642" height="28" rx="10" fill="#9A9A9A" />
                                    <rect x="0.5" y="0.5" width="33.1877" height="33" rx="10.5" stroke="#4D4949" strokeDasharray="2 2" />
                                    <path d="M21.4688 14.6364L19.3644 12.5324L12.1816 19.7152C11.7378 20.1589 11.4337 20.7228 11.3069 21.3374L11.0033 22.807C10.9979 22.8331 10.9991 22.8602 11.0068 22.8857C11.0145 22.9112 11.0284 22.9344 11.0473 22.9532C11.0662 22.972 11.0894 22.9858 11.115 22.9934C11.1405 23.0009 11.1676 23.002 11.1936 22.9966L12.6619 22.6938C13.2768 22.5671 13.8411 22.2631 14.2851 21.8192L21.4688 14.6364ZM22.2487 11.3526C22.1369 11.2408 22.0041 11.1522 21.8581 11.0916C21.712 11.0311 21.5554 11 21.3973 11C21.2392 11 21.0826 11.0311 20.9365 11.0916C20.7904 11.1522 20.6577 11.2408 20.5459 11.3526L20.1202 11.7775L22.2246 13.8807L22.6479 13.4575C22.8734 13.2313 23 12.9249 23 12.6054C23 12.286 22.8734 11.9796 22.6479 11.7534L22.2487 11.3526Z" fill="white" />
                                </svg>
                            </div>
                            <div>
                                <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3.01172" y="3" width="28.1642" height="28" rx="10" fill="#48FD48" />
                                    <path d="M14.9423 20.0021L12.59 16.8607C12.5036 16.7452 12.4009 16.6535 12.2879 16.591C12.1749 16.5285 12.0537 16.4963 11.9314 16.4963C11.8091 16.4963 11.688 16.5285 11.575 16.591C11.462 16.6535 11.3593 16.7452 11.2728 16.8607C11.1863 16.9762 11.1177 17.1133 11.0709 17.2642C11.0241 17.4152 11 17.5769 11 17.7403C11 17.9036 11.0241 18.0654 11.0709 18.2163C11.1177 18.3672 11.1863 18.5044 11.2728 18.6199L14.2774 22.6325C14.4538 22.8678 14.6929 23 14.9423 23C15.1916 23 15.4307 22.8678 15.6071 22.6325L22.7516 13.091C22.9154 12.8548 23.0044 12.5431 22.9998 12.2212C22.9952 11.8993 22.8975 11.5923 22.727 11.3646C22.5565 11.137 22.3267 11.0064 22.0856 11.0002C21.8446 10.9941 21.6112 11.1129 21.4344 11.3318L14.9423 20.0021Z" fill="white" />
                                    <rect x="0.5" y="0.5" width="33.1877" height="33" rx="10.5" stroke="#4D4949" strokeDasharray="2 2" />
                                </svg>
                            </div>
                            <div>
                                <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3.01172" y="3" width="28.1642" height="28" rx="10" fill="#FF7070" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.6277 12.7665H11.5625C11.4133 12.7665 11.2702 12.8223 11.1648 12.9216C11.0593 13.0208 11 13.1555 11 13.2959C11 13.4362 11.0593 13.5709 11.1648 13.6701C11.2702 13.7694 11.4133 13.8252 11.5625 13.8252H11.9713L12.6515 20.352C12.6898 20.7211 12.722 21.0295 12.7693 21.2794C12.8188 21.5405 12.8915 21.7812 13.034 22.0049C13.255 22.3521 13.5805 22.6299 13.9693 22.8031C14.2198 22.9146 14.4808 22.9598 14.7628 22.9795C15.0328 23 15.3605 23 15.755 23H18.245C18.6395 23 18.968 23 19.2372 22.9802C19.5192 22.9591 19.7803 22.9146 20.0308 22.8038C20.4196 22.6304 20.7451 22.3524 20.966 22.0049C21.1085 21.7812 21.1812 21.5412 21.2308 21.2794C21.278 21.0288 21.3103 20.7218 21.3485 20.352L22.0287 13.8252H22.4375C22.5867 13.8252 22.7298 13.7694 22.8352 13.6701C22.9407 13.5709 23 13.4362 23 13.2959C23 13.1555 22.9407 13.0208 22.8352 12.9216C22.7298 12.8223 22.5867 12.7665 22.4375 12.7665H19.3722C19.2461 12.2637 18.9432 11.8157 18.5126 11.4951C18.082 11.1744 17.5491 11 17 11C16.4509 11 15.918 11.1744 15.4874 11.4951C15.0568 11.8157 14.7539 12.2637 14.6277 12.7665ZM15.8135 12.7665H18.1865C18.08 12.5553 17.912 12.3768 17.7019 12.2518C17.4919 12.1268 17.2485 12.0604 17 12.0604C16.7515 12.0604 16.5081 12.1268 16.2981 12.2518C16.088 12.3768 15.92 12.5553 15.8135 12.7665ZM20.8985 13.8252H13.1015L13.769 20.2278C13.8095 20.623 13.8372 20.8898 13.8763 21.0945C13.9137 21.2928 13.9543 21.3923 13.9978 21.4615C14.1046 21.6292 14.262 21.7633 14.45 21.8468C14.5265 21.8807 14.636 21.9089 14.8498 21.9244C15.0703 21.9414 15.3545 21.9414 15.776 21.9414H18.2225C18.644 21.9414 18.9282 21.9414 19.1488 21.9251C19.3625 21.9089 19.4712 21.8807 19.5485 21.8468C19.7366 21.7631 19.894 21.6287 20.0008 21.4607C20.0443 21.3923 20.0848 21.2928 20.1222 21.0938C20.1613 20.8891 20.1897 20.623 20.2303 20.2285L20.8977 13.8252H20.8985ZM18.734 15.2381C18.8076 15.2439 18.8793 15.2633 18.945 15.2951C19.0107 15.327 19.069 15.3707 19.1167 15.4238C19.1644 15.4769 19.2006 15.5383 19.223 15.6045C19.2455 15.6707 19.2539 15.7405 19.2477 15.8098L18.8727 20.0464C18.8558 20.1828 18.7831 20.3076 18.6702 20.3945C18.5573 20.4814 18.4129 20.5236 18.2676 20.5123C18.1222 20.5009 17.9872 20.4369 17.891 20.3336C17.7949 20.2304 17.7451 20.096 17.7523 19.9589L18.1273 15.7222C18.1333 15.6529 18.1538 15.5854 18.1876 15.5235C18.2215 15.4616 18.2679 15.4066 18.3243 15.3617C18.3808 15.3167 18.446 15.2826 18.5165 15.2614C18.5869 15.2402 18.6603 15.2323 18.734 15.2381ZM15.266 15.2381C15.3397 15.2323 15.4139 15.2402 15.4843 15.2614C15.5547 15.2826 15.62 15.3167 15.6764 15.3617C15.7328 15.4066 15.7793 15.4616 15.8131 15.5235C15.8469 15.5854 15.8674 15.6529 15.8735 15.7222L16.2485 19.9582C16.2609 20.0981 16.2138 20.2369 16.1174 20.3441C16.0211 20.4514 15.8834 20.5182 15.7347 20.5299C15.5861 20.5416 15.4385 20.4972 15.3246 20.4065C15.2107 20.3159 15.1397 20.1863 15.1272 20.0464L14.7522 15.8098C14.7461 15.7405 14.7545 15.6707 14.777 15.6045C14.7994 15.5383 14.8356 15.4769 14.8833 15.4238C14.931 15.3707 14.9893 15.327 15.055 15.2951C15.1207 15.2633 15.1924 15.2439 15.266 15.2381Z" fill="white" />
                                    <rect x="0.5" y="0.5" width="33.1877" height="33" rx="10.5" stroke="#4D4949" strokeDasharray="2 2" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className='quest'>
                        <div className='quest_head d-flex'>
                            <div className='img d-flex justify-content-center align-items-center col-1'>
                                {svgVisible === true ? (
                                    <File className='image_upload' onChange={handleChange}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="black" />
                                            <path d="M11.9999 5.40002C12.3182 5.40002 12.6234 5.52645 12.8484 5.7515C13.0735 5.97654 13.1999 6.28176 13.1999 6.60002V10.8H17.3999C17.7182 10.8 18.0234 10.9265 18.2484 11.1515C18.4735 11.3765 18.5999 11.6818 18.5999 12C18.5999 12.3183 18.4735 12.6235 18.2484 12.8486C18.0234 13.0736 17.7182 13.2 17.3999 13.2H13.1999V17.4C13.1999 17.7183 13.0735 18.0235 12.8484 18.2486C12.6234 18.4736 12.3182 18.6 11.9999 18.6C11.6816 18.6 11.3764 18.4736 11.1514 18.2486C10.9263 18.0235 10.7999 17.7183 10.7999 17.4V13.2H6.5999C6.28164 13.2 5.97642 13.0736 5.75137 12.8486C5.52633 12.6235 5.3999 12.3183 5.3999 12C5.3999 11.6818 5.52633 11.3765 5.75137 11.1515C5.97642 10.9265 6.28164 10.8 6.5999 10.8H10.7999V6.60002C10.7999 6.28176 10.9263 5.97654 11.1514 5.7515C11.3764 5.52645 11.6816 5.40002 11.9999 5.40002Z" fill="white" />
                                        </svg>
                                    </File>
                                ) : (
                                    <img src={file} className='img-fluid' />
                                )
                                }
                            </div>
                            <div className='quest_description w-100'>
                                <textarea readOnly value="Lorem ipsum dolor sit amet consectetur. Nunc nunc magna aliquet nulla dis turpis massa. Felis consectetur pulvinar vestibulum adipiscing volutpat dolor vel. Mollis bibendum tortor velit feugiat vulputate massa. Cras amet lorem gravida in. Posuere nibh scelerisque in tristique volutpat. Orci aliquam molestie amet a. Suspendisse tincidunt natoque tristique a. Duis in egestas habitant feugiat imperdiet proin. Pharetra justo mollis lacus ac cras.">
                                </textarea>
                            </div>
                        </div>
                        <div className='padding'>

                        </div>
                    </div>
                </div>
            </Styled > */}
        </>
    )
}
