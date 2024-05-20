import { Icon20AddAlt } from "@vkontakte/icons";
import PropTypes from "prop-types";
import React from "react";

const CreateQuestBtn = (props) => {
  return (
    <>
      <div
        className="btn__border d-flex justify-content-center align-items-center"
        onClick={props.go}
        data-to="quest"
      >
        <div className="header__btn d-flex justify-content-center align-items-center">
          <Icon20AddAlt width="12" height="12" />
        </div>
      </div>
    </>
  );
};

CreateQuestBtn.propTypes = {
  // id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default CreateQuestBtn;
