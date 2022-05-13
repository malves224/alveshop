import Joi from 'joi';

class WalletSchema {
  typeMessage = {
    coins: {
      'any.required': 'Coins é obrigatório.',
      'number.empty': 'Coins é obrigatório.',
      'number.base': 'Coins com tipo de dado errado.',
      'number.positive': 'Coins não pode ser negativo.',
    }, 
  };

  schema = Joi.object({
    coins: Joi.number().required().positive()
      .messages(this.typeMessage.coins), 
  });
}

export default WalletSchema;