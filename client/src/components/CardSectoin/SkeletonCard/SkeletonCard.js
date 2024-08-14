import { Card, ConfigProvider, Menu, Skeleton } from "antd";
import { useState } from "react";
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styles from "./SkeletonCard.module.css";

const SkeletonCard = () => {
  const tabList = [
    {
      key: "description",
      tab: "Description",
    },
    {
      key: "expectations",
      tab: "Expectations",
    },
    {
      key: "deadline",
      tab: "Deadline",
    },
  ];

  const [activeTabKey, setActiveTabKey] = useState("description");
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      <SettingOutlined
        className={styles.iconsBottom}
        type="subMeny"
        popupClassName={styles.popup}
      />,
      "setting",
      null
    ),
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            actionsBg: "#A8D0E6",
          },
          Tabs: {
            itemColor: "white",
            itemHoverColor: "#002140",
            itemSelectedColor: "#002140",
            inkBarColor: "#002140",
            itemActiveColor: "#A8D0E6",
          },
          Menu: {
            itemActiveBg: "transparent",
            itemBg: "#A8D0E6",
            itemHoverBg: "#A8D0E6",
            itemSelectedBg: "#A8D0E6",
            dropdownWidth: 50,
            itemHeight: 22,
            iconSize: 20,
          },
        },
      }}
    >
      <Card
        style={{
          width: 360,
          backgroundColor: "#F4976C",
          color: "#002140",
        }}
        
        headStyle={{
          borderTop: `7px solid #303C6C`,
          backgroundColor: "#F4976C",
          color: "white",
          fontSize: "26px",
        }}
        extra={
          <a className={styles.icons} href="#">
            {<EditOutlined />}
          </a>
        }
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
        hoverable={true}
        actions={[
          <Menu
            items={items}
            triggerSubMenuAction="click"
            expandIcon={false}
          />,
          <DeleteOutlined className={styles.iconsBottom} key="delete" />,
        ]}
      >
        <Skeleton active>
        </Skeleton>
      </Card>
    </ConfigProvider>
  );
};

export default SkeletonCard;
