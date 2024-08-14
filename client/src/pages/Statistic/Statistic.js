import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Steps } from "antd";
import { fetchCards } from "../../redux/slices/cards";
import { BarChartOutlined } from "@ant-design/icons";
const items = [
  {
    title: "Step 1",
    description: "Applying for a vacancy.",
  },
  {
    title: "Step 2",
    description: "The reply is in process.",
  },
  {
    title: "Step 3",
    description: "Receiving feedback in case of refusal.",
  },
  {
    title: "Step 4",
    description: "You got the job.",
  },
];

function calculateDeadlineDifference(deadlineString) {
  const deadlineDate = new Date(deadlineString);
  const currentDate = new Date();

  const timeDifference = deadlineDate - currentDate;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return (
      <Tag color="orange" key={1}>
        IS TODAY
      </Tag>
    );
  } else if (daysDifference < 0) {
    return (
      <Tag color="red" key={2}>
        {`WAS ${Math.abs(daysDifference)} ${getPluralForm(
          Math.abs(daysDifference),
          "DAY",
          "DAYS"
        )} AGO`}
      </Tag>
    );
  } else {
    return (
      <Tag color="green" key={3}>{`IN ${daysDifference} ${getPluralForm(
        daysDifference,
        "DAY",
        "DAYS"
      )}`}</Tag>
    );
  }
}

function getPluralForm(number, one, other) {
  return number === 1 ? one : other;
}

const Statistic = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards.items);
  const [direction, setDirection] = useState(
    window.innerWidth < 900 ? "vertical" : "horizontal"
  );

  useEffect(() => {
    const handleResize = () => {
      setDirection(window.innerWidth < 900 ? "vertical" : "horizontal");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    !cards.length && dispatch(fetchCards());
  }, []);

  const data = cards.map((card, index) => {
    return {
      key: index,
      vacancy: card.title,
      date: card.createdAt.slice(0, 10),
      deadline: calculateDeadlineDifference(card.deadline),
      status: card.state.slice(2),
    };
  });

  const columns = [
    {
      title: "Vacancy",
      dataIndex: "vacancy",
      width: "10%",
      key: "vacancy",
    },
    {
      title: "Application Date",
      dataIndex: "date",
      width: "10%",
      key: "date",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      width: "10%",
      key: "deadline",
    },
    {
      title: "Application Status",
      key: "status",
      width: "10%",
      dataIndex: "status",
      render: (_, { status }) => {
        let color;
        switch (status) {
          case "Awaiting":
            color = "orange";
            break;
          case "Approved":
            color = "green";
            break;
          case "Rejected":
            color = "red";
            break;

          default:
            color = "gray";
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: "min-content",
      render: (_, record) => {
        let current;
        switch (record.status) {
          case "Awaiting":
            current = 1;
            break;
          case "Approved":
            current = 3;
            break;
          case "Rejected":
            current = 2;
            break;

          default:
            current = 0;
        }
        return (
          <Steps
            progressDot
            size="small"
            current={current}
            items={items}
            direction={direction}
          />
        );
      },
    },
  ];

  return (
    <div className="bacgroundWraoer">
      <h1 className="headerMain">
        <BarChartOutlined className="infoIcon" />
        Applications Statistics Overview
      </h1>
      <Table
        style={{ borderRadius: "10px" }}
        columns={columns}
        scroll={{
          x: 1000,
        }}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};
export default Statistic;
