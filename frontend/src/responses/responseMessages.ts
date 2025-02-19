export const successMessages: Record<string, string> = {
  EVENT_CREATED_SUCCESSFULLY: "Evento criado com sucesso!",
  EVENT_DELETED_SUCCESSFULLY: "Evento excluído com sucesso!",
  EVENT_UPDATED_SUCCESSFULLY: "Evento atualizado com sucesso!",
  NO_CHANGES_DETECTED: "Nenhuma alteração.",
};

export const errorMessages: Record<string, string> = {
  EVENT_TIME_RANGE_CONFLICT: "O intervalo de datas já está em uso.",
  END_DATE_MUST_BE_GREATER_THAN_START_DATE:
    "A data de fim deve ser maior que a data de início.",
  INVALID_DATE_FORMAT: "Formato de data inválido.",
  EVENT_NOT_FOUND: "Evento não encontrado.",
  USER_NOT_FOUND: "Usuário não encontrado.",
  NO_USERS_FOUND: "Nao foram encontrados usuários.",
  EMPTY_BODY: "Corpo da requisição vazio.",
};
