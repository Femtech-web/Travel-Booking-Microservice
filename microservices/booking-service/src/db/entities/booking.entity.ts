import { BaseEntity, Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class BookingEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  customer_id: string;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;
}
