import React from 'react';
import { Panel, PanelHeader, PanelHeaderButton, Input, Header, Button, Group, ButtonGroup, FormItem, FormLayout, Card, CardGrid } from '@vkontakte/vkui';
import { Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon20AddAlt } from '@vkontakte/icons';
import { Icon20NotificationOutline } from '@vkontakte/icons';
const HeaderStyle = styled.div`
    .header{
        height: 50px;
        font-size: 14px;
        font-weight: bold;
        border-bottom: 1px solid #736D6D;
        background-color: #292929;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        overflow-y: hidden;
        overflow-x: hidden;
        z-index:10;
    }
    .header .header__col{
        height: 50px;
    }
    .col__1{
        margin-left: 16px;
    }
    .col__3{
        margin-right: 16px;
    }

    .header .header__col .header__btn{
        background-color: #9A9A9A;
        width: 28px;
        height: 28px;
        border-radius: 30%;
    }
    .header .header__col .btn__border{
        border-radius: 30%;
        border: 1px dashed #4D4949;
        height: 32px;
        width: 32px;
        cursor: pointer;
    }
`

const HeaderMy = (props) => {
    return (
        <>
            <Panel id={props.id}>
                <HeaderStyle>
                    <div className='header'>
                        <Row className='header_row'>
                            <Col col="4" className='header__col col__1 d-flex justify-content-start align-items-center'>
                                {props.leftBtn}
                            </Col>
                            <Col col="4" className='header__col col__2 d-flex justify-content-center align-items-center text-center'>
                                <span className='text-nowrap'>{props.displayName}</span>
                            </Col>
                            <Col col="4" className='header__col col__3 d-flex justify-content-end align-items-center'>
                                {/* <div className='btn__border d-flex justify-content-center align-items-center'>
                                    <div className='header__btn d-flex justify-content-center align-items-center' onClick={props.go} data-to="Notification">
                                        <Icon20NotificationOutline width="12" height="12" />
                                    </div>
                                </div> */}
                            </Col>
                        </Row>
                    </div>
                </HeaderStyle>
            </Panel >
        </>
    )
}

HeaderMy.propTypes = {
    displayName: PropTypes.string,
    // id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
}

export default HeaderMy;