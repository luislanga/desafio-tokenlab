import Joi from "joi";

export const createEventValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Descrição obrigatória",
  }),
  start: Joi.date().iso().required().messages({
    "date.base": "Data de início é inválida",
  }),
  end: Joi.date().iso().greater(Joi.ref("start")).required().messages({
    "date.base": "Data de término é inválida",
    "date.greater": "Data de término deve ser após a data de início",
  }),
});
