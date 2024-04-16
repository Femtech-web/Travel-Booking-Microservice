import { BaseEntity, Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class PaymentEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  booking_id: string;

  @Column()
  customer_id: string;

  @Column()
  created_at: Date;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  stripe_id: string;

  @Column()
  stripe_status: string;
}
