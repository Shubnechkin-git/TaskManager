import React from 'react';
import { Panel, PanelHeader, PanelHeaderClose, PanelHeaderButton, Input, Header, Button, Group, ButtonGroup, FormItem, FormLayout, View, Card, CardGrid, Snackbar } from '@vkontakte/vkui';
import { Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavbarMy from '../../Components/NavbarMy';
import HeaderMy from '../../Components/HeaderMy';

import BackBtn from '../../Components/Button/BackBtn';

import ReadyThemes from '../../Components/ReadyThemes';
import CreateTheme from '../../Components/CreateTheme';
import ContactDev from '../../Components/ContactDev';
import { Icon28ErrorCircleOutline } from '@vkontakte/icons';

const Styled = styled.div`
`

const Settings = (props) => {
    return (
        <>
            <View activePanel={props.panel}>
                <Panel id={props.id}>
                    <HeaderMy displayName="Настройки" go={props.go} leftBtn={<BackBtn go={props.go} />} />
                    <Styled>
                        <Group className='mt-5 mb-4'>
                            <FormLayout>
                                <FormItem>
                                    <Group mode="plain" size="l">
                                        <ReadyThemes />
                                        <CreateTheme />
                                        <ContactDev />
                                    </Group>
                                </FormItem>
                            </FormLayout>
                        </Group>
                    </Styled>
                    <NavbarMy go={props.go} titleBtn='settings' />
                </Panel>
            </View>
        </>)
}

Settings.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
}

export default Settings;