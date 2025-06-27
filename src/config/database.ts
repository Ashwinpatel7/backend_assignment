import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};