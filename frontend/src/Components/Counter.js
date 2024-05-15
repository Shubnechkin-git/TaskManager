import { Icon20AddCircleFillGreen } from '@vkontakte/icons'
import React, { useState } from 'react'

export default function Counter() {

    const [counter, setCounter] = useState(0);

    return (
        <div className='d-flex chet__body'>
            <div className='add d-flex justify-content-center align-items-center' onClick={e => setCounter(counter + 1)}><Icon20AddCircleFillGreen /></div>
            <div className='d-flex flex-column text-center w-100'>
                <span>title</span>
                <span>{counter}</span>
            </div>
            <div onClick={e => setCounter(counter - 1)} className='minus d-flex justify-content-center align-items-center'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_197_308)">
                    <path d="M0 10C0 4.4771 4.4771 0 10 0C15.5228 0 20 4.4771 20 10C20 15.5228 15.5228 20 10 20C4.4771 20 0 15.5228 0 10Z" fill="#FF4457" />
                    <path d="M0.5 10C0.5 4.75324 4.75324 0.5 10 0.5C15.2467 0.5 19.5 4.75325 19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75325 19.5 0.5 15.2467 0.5 10Z" stroke="black" strokeOpacity="0.2" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M4 9.75C4 9.55109 4.06491 9.36032 4.18044 9.21967C4.29598 9.07902 4.45268 9 4.61607 9H14.8839C15.0473 9 15.204 9.07902 15.3196 9.21967C15.4351 9.36032 15.5 9.55109 15.5 9.75C15.5 9.94891 15.4351 10.1397 15.3196 10.2803C15.204 10.421 15.0473 10.5 14.8839 10.5H4.61607C4.45268 10.5 4.29598 10.421 4.18044 10.2803C4.06491 10.1397 4 9.94891 4 9.75Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_197_308">
                        <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg></div>
        </div>
    )
}
