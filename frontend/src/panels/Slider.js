import { Panel } from "@vkontakte/vkui";
import PropTypes from "prop-types";
import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideImage1 from "../Assets/Slider/Slide_1.jpg";
import "../styles/slider.css";

const Styled = styled.div`
  .btn.disabled,
  .btn:disabled,
  fieldset:disabled .btn {
    background-color: #696969;
    border-color: #696969;
  }
`;

const Slider = ({ id, go, userId, bridge, username, getTasksUser }) => {
  if (userId !== undefined && userId !== null) {
    console.log(userId);
  }
  // Выполнение GET-запроса

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
    }
  };

  return (
    <Panel id={id}>
      <div className="slider d-flex align-items-center">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          onSlideChange={(tag) => setIndicator(tag.activeIndex)}
          onSwiper={(swiper) => swiper}
        >
          <SwiperSlide>
            <div className="slider__slide d-flex flex-column">
              <div className="slider__image">
                <img src={SlideImage1} className="img-fluid" />
              </div>
              <div className="slider__title">
                <span>Добро пожаловать, {username}!</span>
              </div>
              <div className="slider__inner">
                <span>
                  Карманный менеджер - это твой надежный помощник для выполнения
                  и отслеживания твоих целей и задач. С его помощью ты сможешь
                  управлять своим временем, контролировать выполнение задач и
                  следить за своими привычками.
                </span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider__slide">
              <div className="slider__image">
                <img src={SlideImage1} className="img-fluid" />
              </div>
              <div className="slider__title">
                <span>Главный экран</span>
              </div>
              <div className="slider__inner">
                <span>
                  Главный экран - это центральное место, где ты можешь увидеть
                  все свои задачи и цели. Здесь ты можешь создавать новые
                  задачи, редактировать, завершать и удалять существующие.
                </span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider__slide">
              <div className="slider__image">
                <img src={SlideImage1} className="img-fluid" />
              </div>
              <div className="slider__title">
                <span>Счетчики</span>
              </div>
              <div className="slider__inner">
                <span>
                  Счетчики - это полезная функция в приложении, которая
                  позволяет отслеживать количество выполненных действий или
                  событий. Счетчики могут использоваться для различных целей,
                  таких как подсчет количества прочитанных страниц книги или
                  количесвто дней привычки.
                </span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider__slide">
              <div className="slider__image">
                <img src={SlideImage1} className="img-fluid" />
              </div>
              <div className="slider__title">
                <span>Настройки</span>
              </div>
              <div className="slider__inner">
                <span>
                  В настройках ты можешь включить или выключить уведомлдения, а
                  так же настроить тему приложения. Удачи!
                </span>
              </div>
            </div>
          </SwiperSlide>
          <div className="slider__indicators">
            <div className="one active" id="one"></div>
            <div className="two" id="two"></div>
            <div className="tree" id="tree"></div>
            <div className="four" id="four"></div>
          </div>
          <div className="slider__btn">
            <Styled>
              <Button
                className="w-100 disabled"
                id="btn"
                onClick={getTasksUser}
                data-to="home"
              >
                ПОНЯТНО
              </Button>
            </Styled>
          </div>
        </Swiper>
      </div>
    </Panel>
  );
};

Slider.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Slider;
