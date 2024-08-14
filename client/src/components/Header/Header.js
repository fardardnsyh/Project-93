import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { IoVolumeMediumOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { setCleaneState } from "../../redux/slices/cards";
import { togleSounds } from "../../redux/slices/sound";
import { useSound } from "../utils/useSound";

const HeaderCustom = () => {
  const dispatch = useDispatch();
  const isSound = useSelector((state) => state.sound);
  const isAuth = useSelector(selectIsAuth);
  const { data } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const playSoundWarning = useSound("/audio/scout-message.wav", 0.05);
  const playSoundClick = useSound("/audio/click-sound.mp3", 0.05);
  const playSoundHover = useSound("/audio/hover-small.wav", 0.05);

  const handleClick = () => {
    playSoundWarning();
    if (window.confirm("Are you sure you want to exit?")) {
      playSoundClick()
      dispatch(logout());
      dispatch(setCleaneState());
      window.localStorage.removeItem("token");
      navigate("/");
    }
  };
  const userLabel = isAuth ? data.nickname.charAt(0).toUpperCase() : "";

  return (
    <div className={styles.header}>
      {isSound ? (
        <IoVolumeMuteOutline
          className={styles.volumeIcon}
          onClick={() => dispatch(togleSounds())}
        />
      ) : (
        <IoVolumeMediumOutline
          className={styles.volumeIcon}
          onClick={() => dispatch(togleSounds())}
        />
      )}
      <div className={styles.headerRight}>
        {isAuth ? (
          <>
            <LogoutOutlined
              className={styles.icon}
              onClick={() => handleClick()}
            />

            <div className={styles.icon}>{userLabel}</div>
          </>
        ) : (
          <Link to="/login" onClick={() => playSoundClick()}
          onMouseEnter={() => playSoundHover()}>
            <LoginOutlined className={styles.icon} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderCustom;
