import { React } from 'react';
import PropTypes from 'prop-types';
import { Icon24Back } from '@vkontakte/icons';


const BackBtn = (props) => {
    return (
        <>
            <div className='btn__border d-flex justify-content-center align-items-center' onClick={props.go} data-to="home" >
                <div className='header__btn d-flex justify-content-center align-items-center'>
                    <Icon24Back width="12" height="12" />
                </div>
            </div>
        </>
    )
}

BackBtn.propTypes = {
    // id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default BackBtn;