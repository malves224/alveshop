import { Model, DataTypes } from 'sequelize';
import db from '../config';

class User extends Model {
  id!: number;

  id_waller!: number;

  name!: string;

  email!: string;

  password!: string;

  role!: string;
}

User.init(
  {
    id_wallet: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, 
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

export default User;