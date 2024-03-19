import React from 'react'
import styled from 'styled-components';

const Styled = styled.div`
	.themes li::marker{
        content: none;
    }
    
    .themes{
        padding-left:8px;
    }
    
    .themes li{
        cursor: pointer;
        margin-top: 8px;
        font-size: 12px;
    }

    .theme_1,.theme_2,.theme_3{
        height: 16px;
        width: 16px;
        border-radius: 10px;
        margin-right: 8px;
        margin-left: 0px;
    }
    
    .theme_1{
        background-color: #FF7070;
    }

    .theme_2{
        background-color: #20E80E;
    }

    .theme_3{
        background-color: #4169E1;
    }

    .active_theme {
        border: 1px solid white;
    }

    .title{
        font-size: 15px;
        font-weight: bold;
    }
`

export default function ReadyThemes() {
    return (
        <Styled>
            <div>
                <div>
                    <span className='title fw-bold'>Темы приложения</span>
                </div>
                <ul className='themes d-flex justify-content-start flex-column'>
                    <li className='d-flex align-items-center'>
                        <div className="theme_1 active_theme"></div><span>Красная</span>
                    </li>
                    <li className='d-flex align-items-center'>
                        <div className="theme_2"></div><span>Зеленая</span>
                    </li>
                    <li className='d-flex align-items-center'>
                        <div className="theme_3"></div><span>Синяя</span>
                    </li>
                </ul>
            </div>
        </Styled>
    )
}
