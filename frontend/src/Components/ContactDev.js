import { Icon24MessageOutline } from "@vkontakte/icons";
import { usePlatform } from "@vkontakte/vkui";
import React from "react";
import styled from "styled-components";

const Styled = styled.div`
  .title {
    font-size: 15px;
    font-weight: bold;
  }

  .container_input {
    margin-bottom: 12px;
  }

  .btn-dark {
    margin-top: 12px;
    background-color: #696969;
    color: #ffffff;
    font-weight: bold;
    font-size: 18px;
    border-radius: 10px;
  }
`;

export default function ContactDev() {
  return (
    <Styled>
      <div>
        <span className="title fw-bold">Связяться с разработчиком</span>
        <br />
        <a
          href={
            usePlatform() == "vkcom"
              ? "https://vk.com/write-225028181"
              : "https://m.vk.com/write-225028181"
          }
          target="_blank"
          className="btn btn-dark"
        >
          <span className="d-flex">
            Связяться
            <Icon24MessageOutline className="ms-2" />
          </span>
        </a>
      </div>
    </Styled>
  );
}
