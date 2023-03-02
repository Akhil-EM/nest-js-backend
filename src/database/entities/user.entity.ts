import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  user_type_id: number;

  @Column({
    allowNull: false,
    defaultValue: false,
  })
  email_verified: boolean;
  @Column({
    allowNull: false,
    defaultValue: true,
  })
  active: boolean;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
