import { React } from 'react';
import PropTypes from 'prop-types';
import HeaderMy from '../../Components/HeaderMy'
import { Panel } from '@vkontakte/vkui';
import BackBtn from '../../Components/Button/BackBtn';

const CreateQuest = (props) => {
    return (
        <>
            <Panel id={props.id}>
                <HeaderMy displayName="Создание задачи" leftBtn={<BackBtn go={props.go} />}></HeaderMy>
            </Panel>
        </>
    )
}

CreateQuest.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default CreateQuest;