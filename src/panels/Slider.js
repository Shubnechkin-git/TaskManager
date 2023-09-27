import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import "../styles/slider.css"
import 'swiper/css';
import SlideImage1 from '../Assets/Slider/Slide_1.jpg'
import { Panel } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import axios from 'axios'

import bridge from '@vkontakte/vk-bridge';


// Отправляет событие нативному клиенту
// bridge.send("VKWebAppInit", {});   

// bridge.send('VKWebAppGetEmail')
// .then((data) => {
//     if (data.result) {
//         // Обработка события в случае успеха
//         console.log("1");
//     } else {
//         // Ошибка
//     }
// })
// .catch((error) => {
//     // Обработка события в случае ошибки
//     console.log(error);
// });

// bridge.subscribe((e) => console.log(e)); 

const Slider = ({ id, go }) => {
    
    // Выполнение GET-запроса
    axios.get('http://localhost:5000/test', {
        params: {
            ID: 12345,
            sdfsd: "3434"
        }
    })
    .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    const setIndicator = (index) => {
        let one = document.getElementById("one");
        let two = document.getElementById("two");
        let tree = document.getElementById("tree");
        let four = document.getElementById("four");
        let btn = document.getElementById("btn");
        console.log(index);
        switch (index) {
            case 0:
                one.classList.add("active");
                two.classList.remove("active");
                tree.classList.remove("active");
                four.classList.remove("active");
                break;
            case 1:
                two.classList.add("active");
                one.classList.remove("active");
                tree.classList.remove("active");
                four.classList.remove("active");
                break;
            case 2:
                tree.classList.add("active");
                one.classList.remove("active");
                two.classList.remove("active");
                four.classList.remove("active");
                break;
            case 3:
                four.classList.add("active");
                one.classList.remove("active");
                two.classList.remove("active");
                tree.classList.remove("active");
                btn.classList.remove("disabled");
                break;
        }
    }

    return (
        <Panel id={id}>
            <div className='slider d-flex align-items-center'>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    onSlideChange={(tag) => setIndicator(tag.activeIndex)}
                    onSwiper={(swiper) => swiper}>
                    <SwiperSlide>
                        <div className='slider__slide d-flex flex-column'>
                            <div className='slider__image'>
                                <img src={SlideImage1} className='img-fluid' />
                            </div>
                            <div className='slider__title'>
                                <span>Карманный менеджер</span>
                            </div>
                            <div className='slider__inner'>
                                <span>
                                    Lorem ipsum dolor sit amet consectetur. Elementum vitae id cras eros euismod dis. Viverra proin et sed quisque maecenas dis phasellus semper nisl. In posuere facilisis venenatis enim tempor morbi mauris sed sed. Lobortis adipiscing morbi a in viverra ullamcorper adipiscing et mauris. Risus mattis justo a et lectus.
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='slider__slide'>
                            <div className='slider__image'>
                                <img src={SlideImage1} className='img-fluid' />
                            </div>
                            <div className='slider__title'>
                                <span>Карманный менеджер</span>
                            </div>
                            <div className='slider__inner'>
                                <span>
                                    Lorem ipsum dolor sit amet consectetur. Elementum vitae id cras eros euismod dis. Viverra proin et sed quisque maecenas dis phasellus semper nisl. In posuere facilisis venenatis enim tempor morbi mauris sed sed. Lobortis adipiscing morbi a in viverra ullamcorper adipiscing et mauris. Risus mattis justo a et lectus.
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='slider__slide'>
                            <div className='slider__image'>
                                <img src={SlideImage1} className='img-fluid' />
                            </div>
                            <div className='slider__title'>
                                <span>Карманный менеджер</span>
                            </div>
                            <div className='slider__inner'>
                                <span>
                                    Lorem ipsum dolor sit amet consectetur. Elementum vitae id cras eros euismod dis. Viverra proin et sed quisque maecenas dis phasellus semper nisl. In posuere facilisis venenatis enim tempor morbi mauris sed sed. Lobortis adipiscing morbi a in viverra ullamcorper adipiscing et mauris. Risus mattis justo a et lectus.
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='slider__slide'>
                            <div className='slider__image'>
                                <img src={SlideImage1} className='img-fluid' />
                            </div>
                            <div className='slider__title'>
                                <span>Карманный менеджер</span>
                            </div>
                            <div className='slider__inner'>
                                <span>
                                    Lorem ipsum dolor sit amet consectetur. Elementum vitae id cras eros euismod dis. Viverra proin et sed quisque maecenas dis phasellus semper nisl. In posuere facilisis venenatis enim tempor morbi mauris sed sed. Lobortis adipiscing morbi a in viverra ullamcorper adipiscing et mauris. Risus mattis justo a et lectus.
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <div className='slider__indicators'>
                        <div className='one active' id='one'></div>
                        <div className='two' id='two'></div>
                        <div className='tree' id='tree'></div>
                        <div className='four' id='four'></div>
                    </div>
                    <div className='slider__btn'>
                        <Button className='w-100 disabled' id="btn" onClick={go} data-to="home">ПОНЯТНО</Button>
                    </div>
                </Swiper >
            </div>
        </Panel>
    );
}

Slider.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired
}

export default Slider;