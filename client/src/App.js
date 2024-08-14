import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Layout, Menu, ConfigProvider } from "antd";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import HeaderCustom from "./components/Header/Header";
import { HomePage } from "./pages/Home/HomePage.js";
import { Link } from "react-router-dom";
import QuestionRepository from "./pages/QuestionRepository/QuestionRepository.js";
import {
  HomeOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
  OrderedListOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import About from "./pages/About/About.jsx";
import Registration from "./pages/Registration/Registration.js";
import Login from "./pages/Login/Login.js";
import NotFound from "./pages/NotFound/NotFound.jsx";
import SingleVacancy from "./pages/SingleVacacy/SingleVacancy.js";
import VacancyPage from "./pages/Vacancy/Vacancy";
import Statistic from "./pages/Statistic/Statistic.js";
import "./App.css";
import { fetchAuthMe } from "./redux/slices/auth";
import { useSound } from "./components/utils/useSound.js";

const App = () => {
  const dispatch = useDispatch();
  const playSoundClick = useSound("/audio/click-sound.mp3", 0.05);
  const playSoundHover = useSound("/audio/hover-small.wav", 0.05);

  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const { Header, Content, Footer, Sider } = Layout;
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
      <Link
        to="/"
        onMouseEnter={() => playSoundHover()}
        onClick={() => playSoundClick()}
      >
        Home
      </Link>,
      "/",
      <HomeOutlined className="smallIcon"/>
    ),
    getItem(
      <Link
        to="/vacancy"
        onMouseEnter={() => playSoundHover()}
        onClick={() => playSoundClick()}
      >
        Vacancy List
      </Link>,
      "/vacancy",
      <AppstoreAddOutlined className="smallIcon"/>
    ),
    getItem(
      <Link
        to="/statistic"
        onMouseEnter={() => playSoundHover()}
        onClick={() => playSoundClick()}
      >
        Statistic
      </Link>,
      "/statistic",
      <BarChartOutlined className="smallIcon"/>
    ),
    getItem(
      <Link
        to="/question"
        onMouseEnter={() => playSoundHover()}
        onClick={() => playSoundClick()}
      >
        Questions
      </Link>,
      "/question",
      <OrderedListOutlined className="smallIcon"/>
    ),
    getItem(
      <Link
        to="/about"
        onMouseEnter={() => playSoundHover()}
        onClick={() => playSoundClick()}
      >
        About
      </Link>,
      "/about",
      <InfoCircleOutlined className="smallIcon"/>
    ),
  ];

  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: "#4c9aff",
            footerBg: "#4c9aff",
            headerBg: "#4c9aff",

            siderBg: "#3265a6",
            triggerColor: "#D2FDFF",
            triggerBg: "#eda35a",
          },
          Checkbox: {
            colorPrimary: "#2b558c",
            colorPrimaryHover: "#3265a6",
          },
          Menu: {
            darkItemColor: "#D2FDFF",
            darkItemHoverBg: "#eda35a",
            darkItemSelectedBg: "#eda35a",
            darkItemSelectedColor: "#D2FDFF",
            darkItemHoverColor: "#D2FDFF",
            darkItemBg: "#3265a6",
            darkSubMenuItemBg: "#3265a6",
          },
          Modal: {
            titleLineHeight: 3.5,
            titleFontSize: 22,
            titleColor: "black",
            contentBg: "#ebecf0",
            headerBg: "#ebecf0",
          },
          Tabs: {
            itemColor: "#f5faff",
            itemHoverColor: "#002140",
            itemSelectedColor: "#002140",
            inkBarColor: "#002140",
            itemActiveColor: "#A8D0E6",
          },
        },
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          theme="dark"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => {
            playSoundClick();
            setCollapsed(value);
          }}
        >
          <div className="demo-logo-vertical">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo.svg`}
              alt="Logo"
              className="logo"
            />
          </div>

          <Menu
            theme="dark"
            selectedKeys={[pathname]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{ display: "flex", height: "80px", alignItems: "center" }}
          >
            <HeaderCustom />
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Routes>
              <Route path={"/"} element={<HomePage />}></Route>
              <Route path={"*"} element={<NotFound />} />
              <Route path={"/about"} element={<About />} />
              <Route path={"/vacancy"} element={<VacancyPage />} />
              <Route path={"/vacancy/:id"} element={<SingleVacancy />} />
              <Route path={"/todos"} element={<VacancyPage />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/registration"} element={<Registration />} />
              <Route path={"/statistic"} element={<Statistic />} />
              <Route path={"/question"} element={<QuestionRepository />} />
            </Routes>
          </Content>
          <Footer className="footerConteiner">
            <span>The Ultimate Resource for Your Job Search *2023</span>
            <div className="footerLinkConteiner">
              <Link
                to="https://no.linkedin.com/"
                onMouseEnter={() => playSoundHover()}
                onClick={() => playSoundClick()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="#000"
                  width="26"
                  height="26"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </Link>
              <Link
                to="https://www.finn.no/job/browse.html"
                onMouseEnter={() => playSoundHover()}
                onClick={() => playSoundClick()}
              >
                <svg
                  focusable="false"
                  width="62"
                  height="22"
                  viewBox="0 0 184 64"
                >
                  <title>FINN.no</title>
                  <path
                    fill="#06bffc"
                    d="M179.8 58V6c0-1-.8-1.9-1.9-1.9H66c-1 0-1.9.8-1.9 1.9v53.8H178c1 0 1.8-.8 1.8-1.8"
                  ></path>
                  <path
                    fill="#0063fc"
                    d="M22.5 4.2H6C5 4.2 4.2 5 4.2 6v52c0 1 .8 1.9 1.9 1.9H60V41.5C59.9 20.9 43.2 4.2 22.5 4.2"
                  ></path>
                  <path
                    fill="#fff"
                    d="M178 0H66c-3.3 0-6 2.7-6 6v17.4C53.2 9.6 38.9 0 22.5 0H6C2.7 0 0 2.7 0 6v52c0 3.3 2.7 6 6 6h172c3.3 0 6-2.7 6-6V6c0-3.3-2.7-6-6-6m1.8 58c0 1-.8 1.9-1.9 1.9H64.1V6c0-1 .8-1.9 1.9-1.9h112c1 0 1.9.8 1.9 1.9v52zM4.2 58V6C4.2 5 5 4.2 6 4.2h16.5c20.6 0 37.4 16.8 37.4 37.4v18.3H6c-1-.1-1.8-.9-1.8-1.9"
                  ></path>
                  <path
                    fill="#fff"
                    d="M110.1 21.1h-4.2c-.7 0-1.2.5-1.2 1.2v19.3c0 .7.5 1.2 1.2 1.2h4.2c.7 0 1.2-.5 1.2-1.2V22.3c0-.6-.6-1.2-1.2-1.2m-12 0H83c-.7 0-1.2.5-1.2 1.2v19.3c0 .7.5 1.2 1.2 1.2h4.2c.7 0 1.2-.5 1.2-1.2v-4h7.7c.7 0 1.2-.5 1.2-1.2v-3.2c0-.7-.5-1.2-1.2-1.2h-7.7v-4.9h9.7c.7 0 1.2-.5 1.2-1.2v-3.7c0-.5-.6-1.1-1.2-1.1m62.8 0h-4.2c-.7 0-1.2.5-1.2 1.2v9.5l-6.6-10c-.3-.4-.8-.7-1.3-.7h-3.2c-.7 0-1.2.5-1.2 1.2v19.3c0 .7.5 1.2 1.2 1.2h4.2c.7 0 1.2-.5 1.2-1.2v-9.4l6.5 9.8c.3.4.8.7 1.3.7h3.4c.7 0 1.2-.5 1.2-1.2V22.3c-.1-.6-.6-1.2-1.3-1.2m-25.4 0h-4.2c-.7 0-1.2.5-1.2 1.2v9.5l-6.6-10c-.3-.4-.8-.7-1.3-.7H119c-.7 0-1.2.5-1.2 1.2v19.3c0 .7.5 1.2 1.2 1.2h4.2c.7 0 1.2-.5 1.2-1.2v-9.4l6.5 9.8c.3.4.8.7 1.3.7h3.4c.7 0 1.2-.5 1.2-1.2V22.3c-.1-.6-.6-1.2-1.3-1.2"
                  ></path>
                </svg>
              </Link>
              <Link
                to="https://www.nav.no"
                onMouseEnter={() => playSoundHover()}
                onClick={() => playSoundClick()}
              >
                <img
                  src="https://www.nav.no/dekoratoren/media/nav-logo-red.svg?ts=1"
                  alt="Til forsiden"
                  width="64"
                  height="20"
                />
              </Link>
            </div>
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default App;
