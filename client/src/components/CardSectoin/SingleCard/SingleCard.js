import { Tabs, Dropdown, Tooltip, Empty } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateCards } from "../../../redux/slices/cards";
import {
  GoStopwatch,
  GoCircle,
  GoCheckCircle,
  GoCircleSlash,
} from "react-icons/go";
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import styles from "./SingleCard.module.css";
import { fetchRemoveCards } from "../../../redux/slices/cards";
import { handleLocalstorageRemove } from "../../utils/utils";
import { useSound } from "../../utils/useSound";

const SingleCard = ({ item, hoverFunc }) => {
  const dispatch = useDispatch();
  const { cards } = useSelector((state) => state.cards);
  const playSoundClick = useSound("/audio/click-sound.mp3", 0.05);
  const playSoundHover = useSound("/audio/hover-small.wav", 0.05);
  const playSoundDelete = useSound("/audio/delete-sound.wav", 0.05);
  const playSoundWarning = useSound("/audio/scout-message.wav", 0.05);
  const [statusColor, setStatusColor] = useState();

  let stateIndicatorColor = "#EDA35A";
  if (item.state) {
    switch (item.state) {
      case "isAwaiting":
        stateIndicatorColor = "#EDA35A";
        break;
      case "isApproved":
        stateIndicatorColor = "#20b1a9";
        break;
      case "isRejected":
        stateIndicatorColor = "#b32f55";
        break;

      default:
        stateIndicatorColor = "#EDA35A";
    }
  }
  useEffect(() => {
    setStatusColor(stateIndicatorColor);
  }, [item.state, stateIndicatorColor]);

  const todoList = item.todos[0].items.length ? (
    <ul className={styles.ulList}>
      {item.todos.map((column, index) => {
        if (index === 0) {
          return column.items.map((todo) => (
            <li key={todo.id} style={{textTransform: "capitalize"}}>
              <PaperClipOutlined style={{ marginRight: "5px" }} />
              {todo.name}
            </li>
          ));
        }
        return null;
      })}
    </ul>
  ) : (
    <Empty description="is Empty" />
  );

  const tabList = [
    {
      key: "description",
      label: (
        <p
          onMouseEnter={() => playSoundHover()}
          onClick={() => {
            playSoundClick();
          }}
        >
          Description
        </p>
      ),
      children: <span className={styles.tabDeadl}>{item.description}</span>,
    },
    {
      key: "todos",
      label: (
        <p
          onMouseEnter={() => playSoundHover()}
          onClick={() => {
            playSoundClick();
          }}
        >
          Todos
        </p>
      ),
      children: todoList,
    },
    {
      key: "deadline",
      label: (
        <p
          onMouseEnter={() => playSoundHover()}
          onClick={() => {
            playSoundClick();
          }}
        >
          Deadline
        </p>
      ),
      children: (
        <span className={styles.tabDeadl}>
          {" "}
          <GoStopwatch style={{ height: "1.3em", width: "1.3em" }} />{" "}
          {item.deadline}
        </span>
      ),
    },
  ];

  const [activeTabKey, setActiveTabKey] = useState("description");

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const handleStatusColor = (color) => {
    setStatusColor(color);
  };

  const handleStatus = (status) => {
    const cardForUpdate = cards.items.find((card) => card._id === item._id);
    dispatch(
      fetchUpdateCards({
        id: item._id,
        values: { ...cardForUpdate, state: status },
      })
    );
  };

  const onClickRemove = () => {
    playSoundWarning();
    if (window.confirm("Are you sure you want to delete the card?")) {
      dispatch(fetchRemoveCards(item._id));
      handleLocalstorageRemove(item._id);
      playSoundDelete();
    }
  };

  const items = [
    {
      label: (
        <Tooltip
          placement="leftTop"
          title={<span>Change a status to approved</span>}
        >
          <GoCheckCircle
            className={styles.icon}
            style={{ color: "#20b1a9" }}
            onMouseEnter={() => playSoundHover()}
            onClick={() => {
              playSoundClick();
              handleStatusColor("#20b1a9");
              handleStatus("isApproved");
            }}
          />
        </Tooltip>
      ),
      key: "isApproved",
    },
    {
      label: (
        <Tooltip
          placement="leftTop"
          title={<span>Change a status to awaiting</span>}
        >
          <GoCircle
            className={styles.icon}
            style={{ color: "#EDA35A" }}
            onMouseEnter={() => playSoundHover()}
            onClick={() => {
              playSoundClick();
              handleStatus("isAwaiting");
              handleStatusColor("#EDA35A");
            }}
          />
        </Tooltip>
      ),

      key: "isAwaiting",
    },
    {
      label: (
        <Tooltip
          placement="leftTop"
          title={<span>Change a status to rejected</span>}
        >
          <GoCircleSlash
            className={styles.icon}
            style={{ color: "#b32f55" }}
            onMouseEnter={() => playSoundHover()}
            onClick={() => {
              playSoundClick();
              handleStatusColor("#b32f55");
              handleStatus("isRejected");
            }}
          />
        </Tooltip>
      ),

      key: "isRejected",
    },
  ];

  return (
    
      <div className={styles.card} onMouseEnter={hoverFunc}>
        <div className={styles.header}>
          <h2 className={styles.title}>{item.title}</h2>
          <div
            className={styles.cardsBg}
            style={{ backgroundColor: statusColor }}
          ></div>
          <Tooltip placement="leftTop" title={<span>Go to edit page</span>}>
            <Link
              to={`/vacancy/${item._id}`}
              className={styles.icons}
              onClick={() => {
                playSoundClick();
              }}
              onMouseEnter={() => playSoundHover()}
            >
              {<EditOutlined />}
            </Link>
          </Tooltip>
        </div>

        <div style={{ zIndex: 4, position: "relative" }}>
          <Tabs
            defaultActiveKey="description"
            items={tabList}
            onChange={() => onTabChange(activeTabKey)}
            className={styles.tabs}
          />
        </div>
        <div className={styles.cardButtom}>
          <div
            className={styles.cardButtomElem}
            style={{ borderRight: "1px solid #f5faff" }}
          >
            <Dropdown
              menu={{
                items,
              }}
              arrow={false}
              trigger={["click"]}
              placement="topLeft"
              className={styles.ropdown}
            >
              <Tooltip placement="leftTop" title={<span>Setting status</span>}>
                <SettingOutlined
                  className={styles.iconsBottom}
                  onClick={() => {
                    playSoundClick();
                  }}
                  onMouseEnter={() => playSoundHover()}
                  type="subMeny"
                />
              </Tooltip>
            </Dropdown>
          </div>
          <div className={styles.cardButtomElem}>
            <Tooltip placement="leftTop" title={<span>Delete</span>}>
              <DeleteOutlined
                className={styles.iconsBottom}
                onMouseEnter={() => playSoundHover()}
                onClick={onClickRemove}
              />
            </Tooltip>
          </div>
        </div>
      </div>
  );
};

export default SingleCard;
