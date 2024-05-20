import {
  Icon20HomeOutline,
  Icon24CalendarOutline,
  Icon24Settings,
} from "@vkontakte/icons";
import { Epic, Panel, Tabbar, TabbarItem, usePlatform } from "@vkontakte/vkui";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";

const NavbarStyle = styled.div`
  .nav__btn1 {
    margin-left: 60px;
  }
  .nav__btn3 {
    margin-right: 60px;
  }
  .nav {
    background-color: #292929;
    border-top: 1px solid #736d6d;
    height: 48px;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    overflow-x: hidden;
  }
  .nav__btn {
    background-color: #9a9a9a;
    width: 28px;
    height: 28px;
    border-radius: 30%;
  }
  .btn__border {
    border-radius: 30%;
    border: 1px dashed #4d4949;
    height: 32px;
    width: 32px;
    cursor: pointer;
  }
  .btn__active {
    background-color: #ff7070;
  }
`;

const NavbarMy = (props) => {
  const [activeButton, setActiveButton] = useState(props.titleBtn);

  useEffect(() => {
    setActiveButton(props.titleBtn);
  }, [props.titleBtn]);

  return (
    <>
      <NavbarStyle>
        <Panel id={props.id}>
          <Epic
            id="1"
            tabbar={
              <Tabbar
                className={
                  props.activeModal != null &&
                  usePlatform() != "vkcom" &&
                  "d-none"
                }
              >
                <TabbarItem
                  disabled={
                    props.titleBtn == "loading" || props.activeModal != null
                      ? true
                      : false
                  }
                  onClick={props.go}
                  data-to="calendar"
                >
                  <Col className="d-flex justify-content-start nav__btn1 align-items-center">
                    <div className="btn__border d-flex justify-content-center align-items-center ">
                      <div
                        className={`nav__btn d-flex justify-content-center align-items-center ${
                          activeButton === "calendar" ? "btn__active" : ""
                        }`}
                      >
                        <Icon24CalendarOutline width="12" height="12" />
                      </div>
                    </div>
                  </Col>
                </TabbarItem>
                <TabbarItem
                  disabled={
                    props.titleBtn == "loading" || props.activeModal != null
                      ? true
                      : false
                  }
                  onClick={props.go}
                  data-to="home"
                >
                  <Col className="d-flex justify-content-center nav__btn2 align-items-center">
                    <div className="btn__border d-flex justify-content-center align-items-center">
                      <div
                        className={`nav__btn d-flex justify-content-center align-items-center ${
                          activeButton === "home" ? "btn__active" : ""
                        }`}
                      >
                        <Icon20HomeOutline width="12" height="12" />
                      </div>
                    </div>
                  </Col>
                </TabbarItem>
                <TabbarItem
                  disabled={
                    props.titleBtn == "loading" || props.activeModal != null
                      ? true
                      : false
                  }
                  onClick={props.go}
                  data-to="settings"
                >
                  <Col className="d-flex justify-content-end nav__btn3 align-items-center">
                    <div className="btn__border d-flex justify-content-center align-items-center">
                      <div
                        className={`nav__btn d-flex justify-content-center align-items-center ${
                          activeButton === "settings" ? "btn__active" : ""
                        }`}
                      >
                        <Icon24Settings width="12" height="12" />
                      </div>
                    </div>
                  </Col>
                </TabbarItem>
              </Tabbar>
            }
          ></Epic>
        </Panel>
      </NavbarStyle>
    </>
  );
};

NavbarMy.propTypes = {
  // id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  // changePanel: PropTypes.func.isRequired
};

export default NavbarMy;
