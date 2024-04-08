import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

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
