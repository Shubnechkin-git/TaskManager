import React from 'react';
import { Panel, PanelHeader, PanelHeaderButton, Input, Header, Button, Group, ButtonGroup, FormItem, FormLayout, Card, CardGrid } from '@vkontakte/vkui';
import { Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavbarMy from '../../Components/NavbarMy';
import HeaderMy from '../../Components/HeaderMy';

import BackBtn from '../../Components/Button/BackBtn';

const Calendar = (props) => {
    return (
        <>
            <HeaderMy displayName="Календарь" go={props.go} leftBtn={<BackBtn go={props.go} />} />
            <NavbarMy go={props.go} titleBtn='calendar' />
        </>)
}

Calendar.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
}

export default Calendar;