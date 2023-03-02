import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'rooms' })
export class Room extends Model<Room> {
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
  room_name: string;

  @Column({
    allowNull: false,
  })
  no_of_beds: number;

  @Column({
    allowNull: false,
    defaultValue: 0,
  })
  price: number;

  @Column({
    allowNull: false,
  })
  for_individual: boolean;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
