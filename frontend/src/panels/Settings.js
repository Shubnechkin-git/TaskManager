import { FormItem, FormLayout, Group, Panel } from "@vkontakte/vkui";
import PropTypes from "prop-types";
import React from "react";

import ContactDev from "../Components/ContactDev";
import Vibration from "../Components/Vibration";

const Settings = (props) => {
  return (
    <>
      <Panel id={props.id}>
        <Group mode="plain" className="mt-5 mb-4">
          <FormLayout>
            <FormItem>
              <Group mode="plain" size="l">
                <Vibration />
                <ContactDev />
              </Group>
            </FormItem>
          </FormLayout>
        </Group>
      </Panel>
    </>
  );
};

Settings.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Settings;
