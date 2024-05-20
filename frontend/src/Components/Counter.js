import { Icon20AddCircleFillGreen } from "@vkontakte/icons";
import axios from "axios";
import React, { useState } from "react";
export default function Counter(props) {
  const [counter, setCounter] = useState(props.count);

  const handleAdd = () => {
    axios
      .put("https://taskmanagerbackend.cleverapps.io/counters/update_count", {
        id: props.id,
        vk_id: props.vk_id,
        count: counter + 1,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          props.handleVibro(1);
          setCounter(counter + 1);
          props.fetchCounters();
        } else {
          props.openError(response.data.message);
          setCounter(counter);
        }
      })
      .catch((error) => {
        setCounter(counter);
        props.openError(error.response.data.message);
        console.log(error);
      });
  };

  const handleMinus = () => {
    axios
      .put("https://taskmanagerbackend.cleverapps.io/counters/update_count", {
        id: props.id,
        vk_id: props.vk_id,
        count: counter - 1,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          props.handleVibro(1);
          setCounter(counter - 1);
          props.fetchCounters();
        } else {
          props.openError(response.data.message);
          setCounter(counter);
        }
      })
      .catch((error) => {
        setCounter(counter);
        props.openError(error.response.data.message);
        console.log(error);
      });
  };

  const handleEdit = (e) => {
    props.setEditTitle(props.title);
    props.setCounter([0, props.title.length]);
    props.setIdEdit(props.id);
    props.setActiveModal("edit");
  };

  const handleDelete = (id, vk_id) => {
    axios
      .delete(
        "https://taskmanagerbackend.cleverapps.io/counters/delete_counter",
        { params: { id: props.id, vk_id: props.vk_id } }
      )
      .then((response) => {
        if (response.data.success) {
          props.fetchCounters(0);
          props.openSuccess(response.data.message);
        } else props.openError(response.data.message);
      })
      .catch((error) => {
        props.openError(error.response.data.message);
      });
  };

  return (
    <div>
      <div
        style={{ paddingRight: 16, marginTop: 20 }}
        className="btn_group d-flex justify-content-end"
      >
        <div style={{ cursor: "pointer", marginRight: 12 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            onClick={(e) => handleEdit(e)}
            height="34"
            viewBox="0 0 35 34"
            fill="none"
          >
            <rect
              x="3.01173"
              y="3"
              width="28.1642"
              height="28"
              rx="10"
              fill="#9A9A9A"
            />
            <rect
              x="0.5"
              y="0.5"
              width="33.1877"
              height="33"
              rx="10.5"
              stroke="#4D4949"
              strokeDasharray="2 2"
            />
            <path
              d="M21.4688 14.6364L19.3644 12.5324L12.1816 19.7152C11.7378 20.1589 11.4337 20.7228 11.3069 21.3374L11.0033 22.807C10.9979 22.8331 10.9991 22.8602 11.0068 22.8857C11.0145 22.9112 11.0284 22.9344 11.0473 22.9532C11.0662 22.972 11.0894 22.9858 11.115 22.9934C11.1405 23.0009 11.1676 23.002 11.1936 22.9966L12.6619 22.6938C13.2768 22.5671 13.8411 22.2631 14.2851 21.8192L21.4688 14.6364ZM22.2487 11.3526C22.1369 11.2408 22.0041 11.1522 21.8581 11.0916C21.712 11.0311 21.5554 11 21.3973 11C21.2392 11 21.0826 11.0311 20.9365 11.0916C20.7904 11.1522 20.6577 11.2408 20.5459 11.3526L20.1202 11.7775L22.2246 13.8807L22.6479 13.4575C22.8734 13.2313 23 12.9249 23 12.6054C23 12.286 22.8734 11.9796 22.6479 11.7534L22.2487 11.3526Z"
              fill="#292929"
            />
          </svg>
        </div>
        <div style={{ cursor: "pointer" }}>
          <svg
            width="35"
            height="34"
            viewBox="0 0 35 34"
            onClick={(e) => handleDelete(props.id, props.vk_id)}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3.01172"
              y="3"
              width="28.1642"
              height="28"
              rx="10"
              fill="#FF7070"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.6277 12.7665H11.5625C11.4133 12.7665 11.2702 12.8223 11.1648 12.9216C11.0593 13.0208 11 13.1555 11 13.2959C11 13.4362 11.0593 13.5709 11.1648 13.6701C11.2702 13.7694 11.4133 13.8252 11.5625 13.8252H11.9713L12.6515 20.352C12.6898 20.7211 12.722 21.0295 12.7693 21.2794C12.8188 21.5405 12.8915 21.7812 13.034 22.0049C13.255 22.3521 13.5805 22.6299 13.9693 22.8031C14.2198 22.9146 14.4808 22.9598 14.7628 22.9795C15.0328 23 15.3605 23 15.755 23H18.245C18.6395 23 18.968 23 19.2372 22.9802C19.5192 22.9591 19.7803 22.9146 20.0308 22.8038C20.4196 22.6304 20.7451 22.3524 20.966 22.0049C21.1085 21.7812 21.1812 21.5412 21.2308 21.2794C21.278 21.0288 21.3103 20.7218 21.3485 20.352L22.0287 13.8252H22.4375C22.5867 13.8252 22.7298 13.7694 22.8352 13.6701C22.9407 13.5709 23 13.4362 23 13.2959C23 13.1555 22.9407 13.0208 22.8352 12.9216C22.7298 12.8223 22.5867 12.7665 22.4375 12.7665H19.3722C19.2461 12.2637 18.9432 11.8157 18.5126 11.4951C18.082 11.1744 17.5491 11 17 11C16.4509 11 15.918 11.1744 15.4874 11.4951C15.0568 11.8157 14.7539 12.2637 14.6277 12.7665ZM15.8135 12.7665H18.1865C18.08 12.5553 17.912 12.3768 17.7019 12.2518C17.4919 12.1268 17.2485 12.0604 17 12.0604C16.7515 12.0604 16.5081 12.1268 16.2981 12.2518C16.088 12.3768 15.92 12.5553 15.8135 12.7665ZM20.8985 13.8252H13.1015L13.769 20.2278C13.8095 20.623 13.8372 20.8898 13.8763 21.0945C13.9137 21.2928 13.9543 21.3923 13.9978 21.4615C14.1046 21.6292 14.262 21.7633 14.45 21.8468C14.5265 21.8807 14.636 21.9089 14.8498 21.9244C15.0703 21.9414 15.3545 21.9414 15.776 21.9414H18.2225C18.644 21.9414 18.9282 21.9414 19.1488 21.9251C19.3625 21.9089 19.4712 21.8807 19.5485 21.8468C19.7366 21.7631 19.894 21.6287 20.0008 21.4607C20.0443 21.3923 20.0848 21.2928 20.1222 21.0938C20.1613 20.8891 20.1897 20.623 20.2303 20.2285L20.8977 13.8252H20.8985ZM18.734 15.2381C18.8076 15.2439 18.8793 15.2633 18.945 15.2951C19.0107 15.327 19.069 15.3707 19.1167 15.4238C19.1644 15.4769 19.2006 15.5383 19.223 15.6045C19.2455 15.6707 19.2539 15.7405 19.2477 15.8098L18.8727 20.0464C18.8558 20.1828 18.7831 20.3076 18.6702 20.3945C18.5573 20.4814 18.4129 20.5236 18.2676 20.5123C18.1222 20.5009 17.9872 20.4369 17.891 20.3336C17.7949 20.2304 17.7451 20.096 17.7523 19.9589L18.1273 15.7222C18.1333 15.6529 18.1538 15.5854 18.1876 15.5235C18.2215 15.4616 18.2679 15.4066 18.3243 15.3617C18.3808 15.3167 18.446 15.2826 18.5165 15.2614C18.5869 15.2402 18.6603 15.2323 18.734 15.2381ZM15.266 15.2381C15.3397 15.2323 15.4139 15.2402 15.4843 15.2614C15.5547 15.2826 15.62 15.3167 15.6764 15.3617C15.7328 15.4066 15.7793 15.4616 15.8131 15.5235C15.8469 15.5854 15.8674 15.6529 15.8735 15.7222L16.2485 19.9582C16.2609 20.0981 16.2138 20.2369 16.1174 20.3441C16.0211 20.4514 15.8834 20.5182 15.7347 20.5299C15.5861 20.5416 15.4385 20.4972 15.3246 20.4065C15.2107 20.3159 15.1397 20.1863 15.1272 20.0464L14.7522 15.8098C14.7461 15.7405 14.7545 15.6707 14.777 15.6045C14.7994 15.5383 14.8356 15.4769 14.8833 15.4238C14.931 15.3707 14.9893 15.327 15.055 15.2951C15.1207 15.2633 15.1924 15.2439 15.266 15.2381Z"
              fill="white"
            />
            <rect
              x="0.5"
              y="0.5"
              width="33.1877"
              height="33"
              rx="10.5"
              stroke="#4D4949"
              strokeDasharray="2 2"
            />
          </svg>
        </div>
      </div>
      <div className="d-flex chet__body" id={props.id}>
        <div
          className="add d-flex justify-content-center align-items-center"
          onClick={(e) => handleAdd()}
        >
          <Icon20AddCircleFillGreen />
        </div>
        <div className="d-flex flex-column text-center w-100">
          <span>{props.title}</span>
          <span>{counter}</span>
        </div>
        <div
          onClick={(e) => handleMinus()}
          className="minus d-flex justify-content-center align-items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clipPath="url(#clip0_197_308)">
              <path
                d="M0 10C0 4.4771 4.4771 0 10 0C15.5228 0 20 4.4771 20 10C20 15.5228 15.5228 20 10 20C4.4771 20 0 15.5228 0 10Z"
                fill="#FF4457"
              />
              <path
                d="M0.5 10C0.5 4.75324 4.75324 0.5 10 0.5C15.2467 0.5 19.5 4.75325 19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75325 19.5 0.5 15.2467 0.5 10Z"
                stroke="black"
                strokeOpacity="0.2"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 9.75C4 9.55109 4.06491 9.36032 4.18044 9.21967C4.29598 9.07902 4.45268 9 4.61607 9H14.8839C15.0473 9 15.204 9.07902 15.3196 9.21967C15.4351 9.36032 15.5 9.55109 15.5 9.75C15.5 9.94891 15.4351 10.1397 15.3196 10.2803C15.204 10.421 15.0473 10.5 14.8839 10.5H4.61607C4.45268 10.5 4.29598 10.421 4.18044 10.2803C4.06491 10.1397 4 9.94891 4 9.75Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_197_308">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
