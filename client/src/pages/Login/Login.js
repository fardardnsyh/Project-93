import { useState } from "react";
import { LockOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { useSound } from "../../components/utils/useSound";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const playSoundClick = useSound("/audio/click-sound.mp3", 0.05);
  const playSoundHover = useSound("/audio/hover-small.wav", 0.05);
  const {
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    const data = await dispatch(fetchAuth(values));
    try {
      if ("token" in data.payload)
        window.localStorage.setItem("token", data.payload.token);
    } catch (error) {
      alert(`Failed to augth`);
      console.log(`error: ${error}`);
      setIsLoading(false);
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
        className="loginForm"
        initialValues={{
          remember: true,
        }}
        onFinish={(values) => handleSubmit(onSubmit(values))}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
          onClick={() => playSoundClick()}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
          onClick={() => playSoundClick()}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Form.Item onClick={() => playSoundClick()}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <div className={styles.conteinerBottom}>
            <button
              type="primary"
              htmlType="submit"
              className="mainButton"
              disabled={isLoading}
              onClick={() => playSoundClick()}
              onMouseEnter={() => playSoundHover()}
            >
              {isLoading ? <LoadingOutlined /> : <span>Log in</span>}
            </button>
            <span>
              Or{" "}
              <Link
                to="/registration"
                className="registrAgrrLink"
                style={{ padding: "8px 0" }}
                onClick={() => playSoundClick()}
                onMouseEnter={() => playSoundHover()}
              >
                register now!
              </Link>
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
