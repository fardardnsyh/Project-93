import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
  body("nickname", "Please provide a nickname").isLength({ min: 3 }),
  body("avatarUrl", "Invalid link to avatar").optional().isURL(),
];

export const cardCreateValidation = [
  body("title", "Enter company name").isString(),
  body("description", "Add a job description")
    .isLength({
      min: 5,
    })
    .isString(),
  body("expectations").optional().isString(),
  body("deadline", "Please set a response deadline").optional().isString(),
  body("state", "Problem with state").optional().isString(),
];

export const cardUpdateValidation = [
  body("title", "Enter company name").optional().isString(),
  body("description", "Add a job description").optional()
    .isLength({
      min: 5,
    })
    .isString(),
  body("expectations").optional().isString(),
  body("deadline", "Please set a response deadline").optional().isString(),
  body("state", "Problem with state").optional().isString(),
  body("todos", "Problem with todos").optional(),
];



export const postCreateValidation = [
  body("title", "Enter a note title").isLength({ min: 3 }).isString(),
  body("description", "Add a note please")
    .isLength({
      min: 10,
    })
    .isString(),
  body("expectations").optional().isString(),
  body("imageUrl", "Invalid link to image").optional().isString(),
];

export const questionCreateValidation = [
  body("question", "Add a question").isString(),
  body("answer", "Add a janswer").isString(),
  body("status").isNumeric(),
];