import React from 'react';
import { Panel, PanelHeader, PanelHeaderClose, PanelHeaderButton, Input, Header, Button, Group, ButtonGroup, FormItem, FormLayout, View, Card, CardGrid, Snackbar } from '@vkontakte/vkui';
import { Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ContactDev from '../../Components/ContactDev';
import Vibration from '../../Components/Vibration';

const Styled = styled.div`
`

const Settings = (props) => {
    return (
        <>
            <Panel id={props.id}>
                {/* <HeaderMy displayName="Настройки" go={props.go} leftBtn={<BackBtn go={props.go} />} /> */}
                <Styled>
                    <Group mode="plain" className='mt-5 mb-4'>
                        <FormLayout>
                            <FormItem>
                                <Group mode="plain" size="l">
                                    <Vibration />
                                    <ContactDev />
                                </Group>
                            </FormItem>
                        </FormLayout>
                    </Group>
                </Styled>
                {/* <NavbarMy go={props.go} titleBtn='settings' /> */}
            </Panel>
        </>)
}

Settings.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
}

export default Settings;