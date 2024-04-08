import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BookingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  customer_id: string;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;
}
