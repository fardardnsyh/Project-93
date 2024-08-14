import { useEffect, useState, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  DeleteOutlined,
  PaperClipOutlined,
  DownOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { GoTasklist, GoChecklist } from "react-icons/go";
import Button from "../UI/Button/Button";
import { Form, Input } from "antd";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodosSection.module.css";
import { fetchUpdateTodos } from "../../redux/slices/cards";
import { useSound } from "../utils/useSound";

function TodosSection({ cardId, cardData }) {
  const [stores, setStores] = useState(cardData.todos);
  const [isFormShowed, setIsFormShowed] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const playSoundClick = useSound("/audio/click-sound.mp3", 0.05);
  const playSoundWarning = useSound("/audio/scout-message.wav", 0.05);

  useEffect(() => {
    const handleUnload = async () => {
      try {
        const storedData = localStorage.getItem("myDataTodos");
        const dataToSend = storedData ? JSON.parse(storedData) : null;

        if (dataToSend) {
          dispatch(fetchUpdateTodos({ id, values: dataToSend[`${id}`] }));
        }
      } catch (error) {
        console.error("Failed to update data on the server:", error);
      }
    };

    const unlisten = () => {
      handleUnload();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      unlisten();
    };
  }, [useLocation]);

  const handleLocalstorageChange = (dataStor, action, idForRemove) => {
    const storedData = localStorage.getItem("myDataTodos");

    const existingData = storedData ? JSON.parse(storedData) : {};

    if (action === "add") {
      existingData[id] = dataStor;
    } else if (action === "removeOne") {
      if (existingData[id]) {
        existingData[id] = existingData[id].map((group) => {
          if (group.items) {
            group.items = group.items.filter((item) => item.id !== idForRemove);
          }
          return group;
        });
      } else {
        return dataStor;
      }
    }

    // update data in localStorage and state
    localStorage.setItem("myDataTodos", JSON.stringify(existingData));
    return existingData[id];
  };

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStores(reorderedStores);
    }

    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );

    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };

    setStores(handleLocalstorageChange(newStores, "add"));
  };

  const handleOnFinish = (value) => {
    if (value.todo) {
      playSoundClick();
      const newData = [{ items: [...(stores[0]?.items || [])] }];

      const newItems = [
        ...newData[0].items,
        { id: uuidv4(), name: value.todo },
      ];

      const data = [...stores];
      const dataFinal = [{ ...data[0], items: newItems }, data[1]];

      setStores(handleLocalstorageChange(dataFinal, "add"));
      form.resetFields();
      setIsFormShowed(false);
    } else {
      playSoundWarning();
      window.alert("You have to fill input");
    }
  };

  const togleFormShowed = () => {
    playSoundClick();
    setIsFormShowed(!isFormShowed);
  };

  const handleRemoveItem = (itemId) => {
    const valueStor = [...stores];

    const newData = valueStor.map((group) => {
      if (group.items) {
        return {
          ...group,
          items: group.items.filter((item) => item.id !== itemId),
        };
      }
      return group;
    });

    setStores(handleLocalstorageChange(newData, "removeOne", itemId));
  };

  function StoreList({ name, items, id }) {
    return (
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ padding: "20px" }}
          >
            <h2 className={styles.headerCard}>{name}</h2>

            <div className={styles.itemsContainer}>
              {items.map((item, index) => (
                <Draggable draggableId={item.id} index={index} key={item.id}>
                  {(provided) => (
                    <div
                      className={styles.itemContainer}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <p className={styles.todo}>
                        {name === "Doing" ? (
                          <span>
                            <PaperClipOutlined className={styles.iconDoing} />
                          </span>
                        ) : (
                          <span>
                            <DownOutlined className={styles.iconDone} />
                          </span>
                        )}

                        {item.name}
                      </p>
                      <span>
                        <DeleteOutlined
                          onClick={() => handleRemoveItem(item.id)}
                        />
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    );
  }

  return (
    <div className={styles.section}>
      <h1 className="headerMain">
        <GoChecklist className="infoIcon" />
        The To-Do Section
      </h1>
      <div className={styles.todoFormConteiner}>
        {isFormShowed ? (
          <MinusCircleOutlined
            className="form-showed-buttons"
            style={{ marginBottom: "30px" }}
            onClick={() => togleFormShowed()}
          />
        ) : (
          <PlusCircleOutlined
            className="form-showed-buttons"
            style={{ marginBottom: "30px" }}
            onClick={() => togleFormShowed()}
          />
        )}
        {isFormShowed && (
          <Form
            form={form}
            onFinish={(val) => handleOnFinish(val)}
            style={{
              maxWidth: 600,
            }}
          >
            <h2 className={styles.todoHeader}>
              <GoTasklist />
              Create a New To-Do
            </h2>
            <div className={styles.conteinForForm}>
              <Form.Item name="todo">
                <Input.TextArea autoSize={true} size="large" />
              </Form.Item>
              <Form.Item>
                <Button
                  clas="secandaryButton"
                  text="Add"
                  icon={<PlusCircleOutlined />}
                  clickFunc={() => console.log("click")}
                  type="submit"
                />
              </Form.Item>
            </div>
          </Form>
        )}
      </div>
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.conteiner}
            >
              {stores.map((store, index) => (
                <div index={index} key={store.id}>
                  <div className={styles.group}>
                    <StoreList {...store} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TodosSection;
