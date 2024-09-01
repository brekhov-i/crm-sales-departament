import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientSchema } from '@/modules/client/client.schema';

@Entity({ name: 'documents' })
export class DocumentsSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  path: string;

  @Column({ default: false })
  isGlobal: boolean;

  @ManyToOne(() => ClientSchema, (client) => client.id, { nullable: true })
  userId: ClientSchema;
}
