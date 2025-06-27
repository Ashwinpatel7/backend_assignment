import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { User as UserInterface } from '../types';

interface UserCreationAttributes extends Optional<UserInterface, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserInterface, UserCreationAttributes> implements UserInterface {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: 'user' | 'admin';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  indexes: [
    {
      unique: true,
      fields: ['email']
    }
  ]
});

export default User;