import CardModel from "../models/Card.js";
import { v4 as uuidv4 } from "uuid";

export const getAll = async (req, res) => {
  try {
    const cards = await CardModel.find({ user: req.userId })
      .populate("user")
      .exec();
    res.json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get cards",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const cardsId = req.params.id;
    const card = await CardModel.findOne({ _id: cardsId });

    if (!card) {
      return res.status(404).json({
        message: "couldn't find the card",
      });
    }
    res.json(card);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get cards",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const cardId = req.params.id;

    const deletedCard = await CardModel.findOneAndDelete({ _id: cardId });

    if (!deletedCard) {
      return res.status(404).json({
        message: "Couldn't find the card to delete",
      });
    }

    res.json({
      message: "Card deleted successfully",
      deletedCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete card",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new CardModel({
      title: req.body.title,
      description: req.body.description,
      expectations: req.body.expectations,
      deadline: req.body.deadline,
      state: req.body.state,
      user: req.userId,
      todos: [
        {
          id: uuidv4(),
          name: "Doing",
          items: [
            {
              id: "5bee94eb-6bde-4411-b438-1c37fa6af364",
              name: "Exemple doing todo",
            },
          ],
          tint: 1,
        },
        {
          id: uuidv4(),
          items: [
            {
              id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc",
              name: "Exemple done todo",
            },
          ],
          name: "Done",
          tint: 2,
        },
      ],
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create card",
    });
  }
};

export const update = async (req, res) => {
  try {
    const cardId = req.params.id;
    let updateData;

    if (req.body.todos) {
      updateData = req.body.todos;
    }

    await CardModel.updateOne(
      {
        _id: cardId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        expectations: req.body.expectations,
        deadline: req.body.deadline,
        state: req.body.state,
        //user: req.userId,
        todos: updateData,
      }
    );

    const card = await CardModel.findOne({ _id: cardId })
      .populate("user")
      .exec();
    res.json(card);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update card",
    });
  }
};

export const updateTodos = async (req, res) => {
  try {
    const cardId = req.params.id;
    let updateData;
    if (req.body) {
      updateData = req.body;
    }

    await CardModel.updateOne(
      {
        _id: cardId,
      },
      {
        todos: updateData,
      }
    );

    const card = await CardModel.findOne({ _id: cardId })
      .populate("user")
      .exec();
    res.json(card);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update todos",
    });
  }
};

export const updateCards = async (req, res) => {
  try {
    const cardUpdates = req.body.items; // Предположим, что информация о картах передается в теле запроса

    const updateResults = [];

    for (const cardUpdate of cardUpdates) {
      const filter = { _id: cardUpdate._id }; // Предположим, что вы используете идентификатор _id для поиска карты
      const update = { $set: cardUpdate }; // Обновляем все поля карты

      const result = await CardModel.updateOne(filter, update);

      updateResults.push(result);
    }
    console.log(updateResults);
    res.json({ message: "Cards updated successfully", updateResults });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update cards",
    });
  }
};

// export const update = async (req, res) => {
//   try {
//     const cardId = req.params.id;

//     await CardModel.updateOne(
//       {
//         _id: cardId,
//       },
//       {
//         title: req.body.title,
//         description: req.body.description,
//         expectations: req.body.expectations,
//         deadline: req.body.deadline,
//         state: req.body.state,
//         user: req.userId,
//       }
//     );
//     const card = await CardModel.findOne({ _id: cardId });
//     res.json(card);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Failed to update card",
//     });
//   }
// };
