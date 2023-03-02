import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'tokens' })
export class Token extends Model<Token> {
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
  })
  token: string;

  @Column({
    allowNull: false,
  })
  token_type_id: number;

  @Column({
    allowNull: false,
  })
  token_user_id: number;

  @Column({
    allowNull: false,
    defaultValue: true,
  })
  active: boolean;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
