import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .messages({ "string.empty": "Email is required" }),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
      "string.empty": "Password is required!!",
      "string.pattern":
        "Password must contain a-z A-Z  0-9 and must be 6 at least characters",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "Confirm Password Incorrect",
    "any.only": "Password and confirm Password id not match",
  }),
  firstName: Joi.string().required().trim().messages({
    "string.empty": "First Name is required",
  }),
  lastName: Joi.string().required().trim().messages({
    "string.empty": "Last Name is required",
  }),
  phone: Joi.string().required().trim().messages({
    "string.empty": "Phone is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().required().trim().email({ tlds: false }),
  password: Joi.string().required(),
});

export const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const formatError = error.details.reduce((acc, curr) => {
      acc[curr.path[0]] = curr.message;
      return acc;
    }, {});

    return formatError;
  }
  return null;
};

export const validateLogin = (input) => {
  const { error } = loginSchema.validate(input, { abortEarly: false });

  if (error) {
    const formatError = error.details.reduce((acc, curr) => {
      acc[curr.path[0]] = curr.message;
      return acc;
    }, {});
    return formatError;
  }
  return null; // No errors
};

export default { validateRegister, validateLogin };
