import { Contract } from './Contract';
import { Home } from "./Home";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({ type: "varchar" })
  public email: string;

  @Column({ type: "varchar" })
  public username: string;

  @Column({ type: "varchar" })
  public password: string;

  @Column({
    type: "varchar",
    length: 200,
    default:
      "https://i.pinimg.com/564x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
  })
  public avatar: string;

  @Column({ type: "text", nullable: true })
  public description: string | null;

  @Column({ type: "int", nullable: true }) // 1: nam  - 2: nữ
  public gender: number | null;

  @Column({ type: "varchar", nullable: true })
  public address: string | null;

  @Column({ type: "varchar", nullable: true })
  public phone_number: string | null;

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP'}) // Recommended
  created_at: string;
}
