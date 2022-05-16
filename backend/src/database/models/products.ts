import { Model, DataTypes } from 'sequelize';
import db from '../config';

class Products extends Model {
  id!: number;

  name!: string;

  active!: boolean;

  url_image!: string;

  price!: number;
}

Products.init(
  {
    active: {
      type: DataTypes.BOOLEAN,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlImage: {
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