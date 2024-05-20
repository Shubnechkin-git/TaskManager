import PropTypes from "prop-types";
import { React } from "react";

import { FormItem, FormLayout, Group, Panel, View } from "@vkontakte/vkui";
import BackBtn from "../Components/Button/BackBtn";
import HeaderMy from "../Components/HeaderMy";
import CreateQuest from "./CreateQuest";

const Quest = (props) => {
  return (
    <View activePanel={props.panel}>
      <Panel id={props.id}>
          <HeaderMy
            displayName="Создание задачи"
            go={props.go}
            leftBtn={<BackBtn go={props.go} />}
          />
          <Group mode="plain" className="mt-5">
            <FormLayout>
              <FormItem>
                <Group mode="plain" size="l">
                  <CreateQuest
                    openError={props.openError}
                    go={props.go}
                    openSuccess={props.openSuccess}
                  />
                </Group>
              </FormItem>
            </FormLayout>
          </Group>
      </Panel>
    </View>
  );
};

Quest.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Quest;
