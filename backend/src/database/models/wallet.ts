import { Model, DataTypes } from 'sequelize';
import db from '../config';

class Wallet extends Model {
  id!: number;

  coins!: number;
}

Wallet.init(
  {
    coins: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, 
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

export default Wallet;