import { Home } from './Home';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity("home_images")
export class Home_Image {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({ type: "varchar", length: 200})
  public url: string;

  @Column({ type: 'timestamp' }) // Recommended
  created_at: Date;

  @ManyToOne(() => Home, (home) => home.home_images)
  home: Home;
}