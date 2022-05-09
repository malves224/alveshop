import { Model, DataTypes } from 'sequelize';
import db from '../config';
import Wallet from './wallet';

class User extends Model {
}

User.init(
  {
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

Wallet.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(Wallet, { foreignKey: 'user_id', as: 'wallet' });

export default User;