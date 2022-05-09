import { Model, DataTypes } from 'sequelize';
import db from '../config';

class Products extends Model {
  id!: number;

  name!: string;

  url_image!: string;

  password!: string;

  price!: number;
}

Products.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  }, 
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

export default Products;