export const handleLocalstorageRemove = (idForRemove) => {
  // Получите текущее значение из localStorage
  const storedData = localStorage.getItem("myDataTodos");

  // Распарсите значение в JavaScript-объект
  const existingData = storedData ? JSON.parse(storedData) : {};

  if (existingData[idForRemove]) {
    const { [idForRemove]: removedItem, ...updatedData } = existingData;

    localStorage.setItem("myDataTodos", JSON.stringify(updatedData));
  } else {
    localStorage.setItem("myDataTodos", JSON.stringify(existingData));
  }
};
