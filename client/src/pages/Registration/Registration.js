import { Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { fetchRegistration, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { useSound } from "../../components/utils/useSound";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const playSoundClick = useSound("/audio/click-sound.mp3", 0.05);
  const playSoundHover = useSound("/audio/hover-small.wav", 0.05);

  const { handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      nickname: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    const data = await dispatch(fetchRegistration(values));
    if (!data.payload) {
      alert("Failed to registration");
      setIsLoading(false);
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="bacgroundWraoer"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/reg-login.svg)`,
      }}
    >
      <Form
        {...formItemLayout}
        name="register"
        onFinish={(values) => handleSubmit(onSubmit(values))}
        scrollToFirstError
        className="loginForm"
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
          onClick={() => playSoundClick()}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 6,
            },
          ]}
          hasFeedback
          onClick={() => playSoundClick()}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
          onClick={() => playSoundClick()}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
            {
              min: 3,
            },
          ]}
          onClick={() => playSoundClick()}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          onClick={() => playSoundClick()}
          {...tailFormItemLayout}
        >
          <Checkbox
            onClick={() => playSoundClick()}
            onMouseEnter={() => playSoundHover()}
          >
            I have read the{" "}
            <a href="#" className="registrAgrrLink">
              agreement
            </a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <button
            type="primary"
            htmlType="submit"
            className="mainButton"
            style={{ width: "100%" }}
            onClick={() => playSoundClick()}
            onMouseEnter={() => playSoundHover()}
            disabled={isLoading}
          >
            {isLoading ? <LoadingOutlined /> : <span>Log in</span>}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Registration;
