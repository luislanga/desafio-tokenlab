import Joi from "joi";

export const eventValidationSchema = Joi.object({
  title: Joi.string().min(1).max(50).required().messages({
    "string.empty": "Descrição obrigatória",
    "string.min": "Descrição deve ter pelo menos 1 caractere",
    "string.max": "Descrição deve ter no máximo 50 caracteres",
  }),
  start: Joi.date().iso().required().messages({
    "date.base": "Data de início é inválida",
  }),
  end: Joi.date().iso().greater(Joi.ref("start")).required().messages({
    "date.base": "Data de término é inválida",
    "date.greater": "Data de término deve ser após a data de início",
  }),
});
