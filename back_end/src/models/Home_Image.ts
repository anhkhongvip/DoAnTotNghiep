import { Home } from './Home';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity("home_images")
export class Home_Image {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({ type: "varchar", length: 200})
  public url: string;

  @Column({
    type: "varchar",
    length: 200,
    nullable: true,
  })
  public public_id: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Recommended
  created_at: Date;

  @Column({ type: "int"})
  public home_id: number;
}