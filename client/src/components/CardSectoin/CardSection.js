import { useState, useEffect } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Modal, Dropdown } from "antd";
import SingleCard from "./SingleCard/SingleCard";
import styles from "./CardSection.module.css";
import SkeletonCard from "./SkeletonCard/SkeletonCard";
import { fetchCards } from "../../redux/slices/cards";
import { GoStack, GoEyeClosed } from "react-icons/go";
import CardForm from "../CardForm/CardForm.js";
import { selectIsAuth } from "../../redux/slices/auth";
import { useSound } from "../utils/useSound.js";
import Button from "../UI/Button/Button.js";

const CardSection = () => {
  const { cards } = useSelector((state) => state.cards);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const isCardsLoading = cards.status === "loading";
  const navigate = useNavigate();
  const playSoundClick = useSound("/audio/click-sound.mp3", 0.05);
  const playSoundHover = useSound("/audio/hover-small.wav", 0.05);
  const playSoundHoverCard = useSound("/audio/hover-sound.wav", 0.05);
  const playSoundHoverTap = useSound("/audio/tap-sound.wav", 0.05);
  const playSoundWarning = useSound("/audio/scout-message.wav", 0.05);
  const [open, setOpen] = useState(false);
  const [cardForRend, setCardForRend] = useState([]);

  useEffect(() => {
    !cards.items.length && dispatch(fetchCards());
  }, []);

  useEffect(() => {
    setCardForRend(cards.items);
  }, [cards.items.length]);

  const handleSorted = (valState) => {
    playSoundClick();
    const cardsForRender = cards.items.filter(
      (item) => item.state === valState
    );
    setCardForRend(cardsForRender);
  };

  const handleModalToModal = () => {
    if (isAuth) {
      playSoundClick();
      setOpen(true);
    } else {
      playSoundWarning();
      alert("You have to login first");
      navigate("/login");
    }
  };

  const items = [
    {
      label: (
        <p
          onClick={() => {
            setCardForRend(cards.items);
            playSoundClick();
          }}
          onMouseEnter={() => playSoundHover()}
        >
          All vacancy
        </p>
      ),
      key: "All",
    },
    {
      label: (
        <p
          onClick={() => handleSorted("isAwaiting")}
          onMouseEnter={() => playSoundHover()}
        >
          Awaiting
        </p>
      ),
      key: "isAwaiting",
    },
    {
      label: (
        <p
          onClick={() => handleSorted("isApproved")}
          onMouseEnter={() => playSoundHover()}
        >
          Approved
        </p>
      ),
      key: "isApproved",
    },
    {
      label: (
        <p
          onClick={() => handleSorted("isRejected")}
          onMouseEnter={() => playSoundHover()}
        >
          Rejected
        </p>
      ),
      key: "isRejected",
    },
  ];

  return (
    <div className={styles.conteiner}>
      <div className={styles.header}>
        <h1 className="headerMain">
          <GoStack className="infoIcon" />
          Your Applied Vacancy Cards
        </h1>
        {isAuth ? (
          <Dropdown
            menu={{
              items,
            }}
            arrow={false}
            trigger={["hover"]}
            placement="right"
            className={styles.dropdown}
          >
            <button
              className={styles.sertButton}
              type="subMeny"
              onMouseEnter={() => playSoundHoverTap()}
            >
              Sort Cards By
              <GoEyeClosed className={styles.iconSertButton} />
            </button>
          </Dropdown>
        ) : (
          <></>
        )}
      </div>
      <Row
        wrap={true}
        gutter={[
          { xs: 8, sm: 16, md: 24 },
          { xs: 8, sm: 16, md: 24 },
        ]}
        justify={{ md: "center", lg: "start" }}
        className={isAuth && styles.margBott}
      >
        {(isCardsLoading ? [...Array(cardForRend.length)] : cardForRend).map(
          (item, index) =>
            isCardsLoading ? (
              <SkeletonCard key={index} />
            ) : (
              <Col key={index}>
                <SingleCard
                  key={item._id}
                  item={item}
                  hoverFunc={() => playSoundHoverCard()}
                />
              </Col>
            )
        )}
      </Row>
      <Button
        clas="mainButton"
        styles={{ marginTop: "30px" }}
        text="Add New Vacancy"
        icon={<PlusCircleOutlined className="iconButtons" />}
        clickFunc={handleModalToModal}
        type="button"
      />

      <Modal footer={null} open={open} onCancel={() => setOpen(false)}>
        <CardForm />
      </Modal>
    </div>
  );
};

export default CardSection;
