import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({ type: "varchar" })
  public name: string;

  @Column({type: "varchar"})
  public image: string;

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP'}) // Recommended
  created_at: Date;
}
