import React from 'react';
import { Panel, PanelHeader, PanelHeaderButton, Input, Header, Button, Group, ButtonGroup, FormItem, FormLayout, Card, CardGrid } from '@vkontakte/vkui';

const HeaderMy = () => {
    return (
        <>
            <Panel>
                <PanelHeader before={
                    <PanelHeaderButton>
                        3
                    </PanelHeaderButton>
                }>
                    <div className='d-flex justify-content-center'>
                        <span>Главный экран</span>
                        <button>4</button>
                    </div>
                </PanelHeader>
            </Panel>
        </>
    )
}
<PanelHeader
    before={
        <PanelHeaderButton>
            <button type="button">23</button>
        </PanelHeaderButton>
    }>Главный экран</PanelHeader>

export default HeaderMy;