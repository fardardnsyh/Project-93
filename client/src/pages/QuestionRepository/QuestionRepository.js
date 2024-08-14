import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import {
  fetchCreateQuestions,
  fetchQuestions,
  fetchRemoveQuestions,
  fetchUpdateQuestions,
} from "../../redux/slices/questions";
import { Empty, Collapse, Form, Rate } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { GoEye, GoEyeClosed } from "react-icons/go";
import Button from "../../components/UI/Button/Button";
import { OrderedListOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./QuestionRepository.module.css";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import ReactMarkdown from "react-markdown";
import { useSound } from "../../components/utils/useSound";

const QuestionRepository = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [isFormShowed, setIsFormShowed] = useState(false);
  const [valueQuest, setValueQuest] = useState("Initial value");
  const [valueAnsw, setValueAnsw] = useState("Initial value");
  const playSoundHover = useSound("/audio/hover-small.wav", 0.05);
  const playSoundHoverTap = useSound("/audio/tap-sound.wav", 0.05);
  const playSoundWarning = useSound("/audio/scout-message.wav", 0.05);
  const playSoundDelete = useSound("/audio/delete-sound.wav", 0.05);
  const questions = useSelector((state) => state.questions.questions);
  const isQuestionLoading = questions.status === "loading";
  const [form] = Form.useForm();

  const onChangeQuest = useCallback((value) => {
    setValueQuest(value);
  }, []);

  const onChangeAnsw = useCallback((value) => {
    setValueAnsw(value);
  }, []);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const panelStyle = {
    marginBottom: 24,
    background: "rgb(0,0,0, 0.1)",
    borderRadius: "10px",
    border: "1px solid #ddeaf6",
    padding: "15px",
    fontSize: "18px",
  };

  const getItems = () => {
    const data = questions.items.map((question, index) => {
      return {
        key: index,
        label: (
          <div className={styles.questionConteiner}>
            <div className={styles.iconsConteiner}>
              <Rate
                defaultValue={question.status}
                className={styles.rate}
                onChange={(value) => {
                  playSoundHoverTap();
                  dispatch(fetchUpdateQuestions({ id: question._id, value }));
                }}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              />{" "}
              <button
                disabled={isQuestionLoading}
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <DeleteOutlined
                  className={styles.deleteIcon}
                  onMouseEnter={() => playSoundHover()}
                  onClick={(event) => {
                    event.stopPropagation();
                    playSoundWarning();
                    if (
                      window.confirm(
                        "Are you sure you want to delete this question?"
                      )
                    ) {
                      dispatch(fetchRemoveQuestions(question._id));
                      playSoundDelete();
                    }
                  }}
                />
              </button>
            </div>

            <ReactMarkdown
              className={styles.question}
              children={question.question}
            />
          </div>
        ),
        children: (
          <ReactMarkdown className={styles.text} children={question.answer} />
        ),
        style: panelStyle,
      };
    });
    return data;
  };

  const handleOnFinish = async (val) => {
    try {
      if (!val.question || !val.answer) return alert("fill the inputs");
      const data = {
        question: valueQuest,
        answer: valueAnsw,
      };
      const result = await dispatch(fetchCreateQuestions(data));

      if (result.meta.requestStatus === "fulfilled") {
        form.resetFields();
        setIsFormShowed(false);
      } else {
        console.error("Create question failed:", result.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return !isAuth ? (
    <div className="bacgroundWraoer">
      <h1 className="headerMain">
        <OrderedListOutlined className="infoIcon" />
        Your Question Repository
      </h1>
      <Empty />
    </div>
  ) : (
    <div
      className="bacgroundWraoer"
      // style={{
      //   backgroundImage: `url(${process.env.PUBLIC_URL}/images/Todos.svg)`,
      // }}
    >
      <h1 className="headerMain">
        <OrderedListOutlined className="infoIcon" />
        Your Question Repository
      </h1>
      {isFormShowed ? (
        <MinusCircleOutlined
          className="form-showed-buttons"
          style={{ marginBottom: "30px" }}
          onClick={() => setIsFormShowed(!isFormShowed)}
        />
      ) : (
        <PlusCircleOutlined
          className="form-showed-buttons"
          style={{ marginBottom: "30px" }}
          onClick={() => setIsFormShowed(!isFormShowed)}
        />
      )}

      {isFormShowed && (
        <Form
          form={form}
          onFinish={(val) => handleOnFinish(val)}
          style={{
            maxWidth: "100%",
          }}
        >
          <div className={styles.conteinForForm}>
            <div>
              <h2 className={styles.todoHeader}>Create a New Question</h2>
              <Form.Item name="question">
                <SimpleMDE value={valueQuest} onChange={onChangeQuest} />
              </Form.Item>
            </div>
            <div>
              <h2 className={styles.todoHeader}>Add An Answer</h2>
              <Form.Item name="answer">
                <SimpleMDE value={valueAnsw} onChange={onChangeAnsw} />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button
              clas="mainButton"
              styles={{ marginBottom: "30px" }}
              text="Add The Question"
              icon={<PlusCircleOutlined className="iconButtons" />}
              clickFunc={() => console.log("click")}
              type="submit"
              disabled={isQuestionLoading}
            />
          </Form.Item>
        </Form>
      )}

      <Collapse
        bordered={false}
        expandIcon={({ isActive }) =>
          isActive ? (
            <GoEye style={{ fontSize: "22px" }} className={styles.iconOpen} />
          ) : (
            <GoEyeClosed style={{ fontSize: "22px" }} className={styles.icon} />
          )
        }
        items={getItems()}
      />
    </div>
  );
};

export default QuestionRepository;
