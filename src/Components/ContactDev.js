import React from 'react'
import styled from 'styled-components';

const Styled = styled.div`
.title {
    font-size: 15px;
    font-weight: bold;
  }

.container_input{
    margin-bottom: 12px;
}

.description{
    background-color: #D9D9D9;
    margin-top: 12px;
    height: 160px;
    border-radius: 10px;
    color: #736D6D;
    text-decoration: underline;
    padding: 12px;
}

.btn-dark{
    margin-top: 12px;
    background-color: #696969;
    color: #FFFFFF;
    font-weight: bold;
    font-size: 18px;
    border-radius: 10px;
}
`

export default function ContactDev() {
    return (
        <Styled>
            <div>
                <span className='title fw-bold'>Связяться с разработчиком</span>
                <div className='container_input d-flex flex-column'>
                    <textarea className='description' placeholder="У меня возникла проблема в..."></textarea>
                </div>
                <div className='container_input d-flex flex-column'>
                    <button className='btn btn-dark '>Отправить</button>
                </div>
            </div>
        </Styled>
    )
}
