import Joi from 'joi';

class UserSchema {
  typeMessage = {
    name: {
      'any.required': 'Nome é obrigatório.',
      'string.base': 'Nome com tipo de dado errado.',
      'string.min': 'Nome deve ser maior que 2 caracteres.',
      'string.empty': 'Nome é obrigatório.',
    },
    email: {
      'any.required': 'Email é obrigatório.',
      'string.base': 'Email com tipo de dado errado.',
      'string.pattern.base': 'Email com formato invalido.',
      'string.empty': 'Email é obrigatório.',
    },
    password: {
      'any.required': 'Senha é obrigatório.',
      'string.base': 'Senha com tipo de dado errado.',
      'string.min': 'Senha deve ser maior que 6 caracteres.',
      'string.empty': 'Senha é obrigatório.',
    },
  };

  schema = Joi.object({
    name: Joi.string().min(3).required().messages(this.typeMessage.name),
    email: Joi.string()
      .pattern(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .required().messages(this.typeMessage.email),
    password: Joi.string().min(6).required()
      .messages(this.typeMessage.password),
  });
}

export default UserSchema;