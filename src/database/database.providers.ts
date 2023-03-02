import { Sequelize } from 'sequelize-typescript';
import { Book } from './entities/book.entity';
import { Role } from './entities/role.entity';
import { Room } from './entities/room.entity';
import { TokenType } from './entities/token-type.entity';
import { Token } from './entities/token.entity';
import { UserType } from './entities/user-type.entity';
import { User } from './entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
      });

      try {
        sequelize.addModels([
          User,
          Book,
          Role,
          Room,
          TokenType,
          Token,
          UserType,
        ]);
        await sequelize.authenticate();
        console.log('database connection success...');
        // await sequelize.sync({ force: true });
        // console.log('database sync success');
      } catch (error) {
        console.log('database connection error :', error.message);
      }

      return sequelize;
    },
  },
];
