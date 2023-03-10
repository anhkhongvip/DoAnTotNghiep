import { Home } from './Home';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({ type: "varchar" })
  public name: string;

  @Column({ type: "timestamp" }) // Recommended
  created_at: Date;

  @OneToMany(() => Home, (home) => home.category)
  homes: Home[];
}
