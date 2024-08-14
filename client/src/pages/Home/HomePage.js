import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { useSound } from "../../components/utils/useSound";
import "./HomePage.css";
import {
  PaperClipOutlined,
  FieldTimeOutlined,
  FireOutlined,
  RiseOutlined,
  LeftOutlined,
} from "@ant-design/icons";

const Cloud = ({ top, left, delay, text, icon, styles = "cloud" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      className={styles}
      style={{
        top,
        left,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {icon}
      {text}
    </div>
  );
};

export const HomePage = () => {
  const isAuth = useSelector(selectIsAuth);
  const playSoundClick = useSound("/audio/click-sound.mp3", 0.05);
  const playSoundHover = useSound("/audio/hover-small.wav", 0.05);

  return (
    <div
      className="bacgroundWraoer"
      style={{
        position: "relative",
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/life_style_working_01.svg)`,
      }}
    >
      <Cloud
        top="20%"
        left="20%"
        delay={0}
        text="Сreate job cards"
        icon={<PaperClipOutlined className="icon" />}
      />
      <Cloud
        top="50%"
        left="70%"
        delay={500}
        text="Track your progress"
        icon={<RiseOutlined className="icon" />}
      />
      <Cloud
        top="80%"
        left="40%"
        delay={1000}
        text="Manage your time"
        icon={<FieldTimeOutlined className="icon" />}
      />
      <Cloud
        top="50%"
        left="10%"
        delay={1500}
        text="Get motivated"
        icon={<FireOutlined className="icon" />}
      />
      {isAuth ? (
        <></>
      ) : (
        <Link
          to="/login"
          onClick={() => playSoundClick()}
          onMouseEnter={() => playSoundHover()}
        >
          <Cloud
            top="0"
            left="0"
            delay={2500}
            text="Get start"
            icon={<LeftOutlined className="btn" />}
            styles="homeButton"
          />
        </Link>
      )}
    </div>
  );
};
