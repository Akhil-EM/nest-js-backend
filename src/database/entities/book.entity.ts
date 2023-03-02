import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'bookings' })
export class Book extends Model<Book> {
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
  role: string;

  @Column({
    allowNull: false,
  })
  payment_id: string;

  @Column({
    allowNull: false,
  })
  room_id: number;

  @Column({
    allowNull: false,
  })
  user_id: number;

  @Column({
    allowNull: false,
    defaultValue: 0,
  })
  bed_count: number;

  @Column({
    allowNull: false,
  })
  total_price: number;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  phone: string;

  @Column({
    allowNull: false,
  })
  address: string;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
