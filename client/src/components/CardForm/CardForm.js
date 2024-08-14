import React, { useState } from "react";
import { Form, Input, DatePicker } from "antd";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { setAddCard } from "../../redux/slices/cards";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useSound } from "../utils/useSound";
import Button from "../UI/Button/Button";

const CreateCardForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.data);
  const playSoundClick = useSound("/audio/click-sound.mp3", 0.05);
  const playSoundWarning = useSound("/audio/scout-message.wav", 0.05);
  const [loading, setLoading] = useState(false);
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: "${label} name is required!",
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };

  const onFinish = async (fieldsValue) => {
    setLoading(true);
    const values = {
      ...fieldsValue,
      deadline: fieldsValue["deadline"].format("YYYY-MM-DD"),
    };
    try {
      const { data } = await axios.post("/cards", values);
      dispatch(setAddCard({ data, userData }));
      const id = data._id;
      playSoundClick();
      setLoading(false);
      navigate(`/vacancy/${id}`);
    } catch (error) {
      playSoundWarning();

      console.warn("Fail to create card");
    }
  };

  return (
    <Form
      {...layout}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      validateMessages={validateMessages}
    >
      <h2 style={{marginBottom: "30px"}}> Create a Vacancy Card</h2>
      <Form.Item
        name="title"
        label="Company"
        rules={[
          {
            required: true,
          },
        ]}
        onClick={() => {
          playSoundClick();
        }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="deadline"
        label="Deadline"
        {...validateMessages}
        onClick={() => {
          playSoundClick();
        }}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="description"
        label="Vacancy Description"
        onClick={() => {
          playSoundClick();
        }}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 19,
        }}
      >
        <Button
          clas="secandaryButton"
          text="Create"
          icon={<PlusCircleOutlined />}
          clickFunc={() => console.log("click")}
          type="submit"
        />
      </Form.Item>
    </Form>
  );
};
export default CreateCardForm;
