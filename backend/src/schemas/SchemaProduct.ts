import Joi from 'joi';

class ProductSchema {
  typeMessage = {
    name: {
      'any.required': 'Nome é obrigatório.',
      'string.base': 'Nome com tipo de dado errado.',
      'string.min': 'Nome deve ser maior que 2 caracteres.',
      'string.empty': 'Nome é obrigatório.',
    },
    urlImage: {
      'any.required': 'urlImage é obrigatório.',
      'string.base': 'urlImage com tipo de dado errado.',
      'string.min': 'urlImage deve ser maior que 8 caracteres.',
      'string.empty': 'urlImage é obrigatório.',
    },
    price: {
      'any.required': 'Preço é obrigatório.',
      'number.empty': 'Preço é obrigatório.',
      'number.base': 'Preço com tipo de dado errado.',
      'number.positive': 'Preço não pode ser negativo.',
    },
  };

  schema = Joi.object({
    name: Joi.string().min(3).required().messages(this.typeMessage.name),
    urlImage: Joi.string().min(9).required()
      .messages(this.typeMessage.urlImage),
    price: Joi.number().required().positive().messages(this.typeMessage.price), 
  });
}

export default ProductSchema;