import { Radio, usePlatform } from "@vkontakte/vkui";
import React, { useState } from "react";

export default function Vibration(props) {
  const handleChange = (e) => {
    localStorage.setItem("vibrationIs", JSON.stringify(e));
  };

  const [vibrationIs, setVibrationIs] = useState(
    JSON.parse(localStorage.getItem("vibrationIs")) !== null
      ? JSON.parse(localStorage.getItem("vibrationIs"))
      : "on"
  );

  return (
    <div className={usePlatform() == "vkcom" && "d-none"}>
      <span className="title fw-bold"> Вибрация</span>
      <br />
      <div className="ms-3 mt-2 mb-2">
        <Radio
          name="radio"
          onClick={(e) => handleChange(e.target.value)}
          className="mb-2"
          value="on"
          description="При получении уведомления будет виброотклик"
          defaultChecked={vibrationIs == "on" ? true : false}
        >
          Включить
        </Radio>
        <Radio
          name="radio"
          onClick={(e) => handleChange(e.target.value)}
          value="off"
          defaultChecked={vibrationIs == "off" ? true : false}
        >
          Выключить
        </Radio>
      </div>
    </div>
  );
}
