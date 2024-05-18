import React, { useEffect, useState } from 'react';
import { Panel, PanelHeader, PanelHeaderButton, Input, Header, Button, Group, ButtonGroup, FormItem, FormLayout, Card, CardGrid, View, ModalRoot, ModalPage, ModalCard, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavbarMy from '../../Components/NavbarMy';
import HeaderMy from '../../Components/HeaderMy';

import VKBridge from '@vkontakte/vk-bridge';

import BackBtn from '../../Components/Button/BackBtn';
import { Icon20AddAlt, Icon20AddCircleFillGreen } from '@vkontakte/icons';
import Counter from '../../Components/Counter';

const Styled = styled.div`
 .chet__body{
    background-color:#9A9A9A;
    border-radius:10px;
    margin: 20px 16px 27px 16px;
 }

 .add{
    background-color: #48FD48;
    border-radius: 10px 0 0 10px;
    padding: 6px;
    border-right:1px solid rgba(0, 0, 0, 0.5);
    cursor: pointer;
}

.minus{
    background-color: #FF7070;
    padding: 6px;
    border-left:1px solid rgba(0, 0, 0, 0.5);
    border-radius: 0px 10px 10px 0px;
    cursor: pointer;
 }
`

const Calendar = (props) => {

    const [isLoadedData, setLoadedData] = useState(false);

    useEffect(() => {
        if (!isLoadedData) {
            props.fetchCounters();
            setLoadedData(true);
        }
        if (props.userCounters.length == 0) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [props.userCounters]);

    return (
        <>
            <View activePanel={props.panel}>
                <Panel id={props.id}>
                    <Group mode="plain" className='vh-100'>
                        <SplitLayout>
                            <SplitCol>
                                <Group mode="plain" className='pt-5 pb-5'>
                                    <Styled>
                                        {props.userCounters.length > 0 ? (
                                            props.userCounters.map(task => (<>
                                                <Counter setCounter={props.setCounter} setIdEdit={props.setIdEdit}  setEditTitle={props.setEditTitle} handleVibro={props.handleVibro} setTitleEdit={props.setTitleEdit} setActiveModal={props.setActiveModal} openSuccess={props.openSuccess} openError={props.openError} id={task.id} vk_id={props.vk_id} title={task.title} fetchCounters={props.fetchCounters} userCounters={props.userCounters} count={task.count} />
                                            </>
                                            ))
                                        ) : (
                                            <h1 className='mt-5 text-center'>Нет созданных счетчиков!</h1>
                                        )}
                                    </Styled>
                                </Group>
                            </SplitCol>
                        </SplitLayout>
                    </Group>
                </Panel>
            </View >
        </>)
}

Calendar.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
}

export default Calendar;