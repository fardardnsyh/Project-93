import QuestionModel from "../models/Question.js";
import { v4 as uuidv4 } from "uuid";

export const create = async (req, res) => {
  try {
    const data = new QuestionModel({
      question: req.body.question,
      answer: req.body.answer,
      status: 1,
      user: req.userId,
      id: uuidv4(),
    });

    const post = await data.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create question",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await QuestionModel.find({ user: req.userId })
      .populate("user")
      .exec();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get questions",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const questionId = req.params.id;
    const deletedQuestion = await QuestionModel.findOneAndDelete({
      _id: questionId,
    });

    if (!deletedQuestion) {
      return res.status(404).json({
        message: "Couldn't find the question to delete",
      });
    }

    res.json({
      message: "Question deleted successfully",
      deletedQuestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete question",
    });
  }
};

export const update = async (req, res) => {
  
  try {
    const questionId = req.params.id;
    const newStatus = req.body.status;

    const updatedQuestion = await QuestionModel.findOneAndUpdate(
      { _id: questionId },
      { status: newStatus },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        message: "Couldn't find the question to update",
      });
    }
    res.json({
      message: "Question updated successfully",
      updatedQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update card",
    });
  }
};
