import { Group, Panel, ScreenSpinner, View } from '@vkontakte/vkui'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

const Loading = (props) => {

    props.getTasksUser()

    return (<View activePanel={props.panel}>
        <Panel id={props.id}>
            <ScreenSpinner state="loading" />
        </Panel>
    </View>
    )
}

Loading.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
}

export default Loading; 