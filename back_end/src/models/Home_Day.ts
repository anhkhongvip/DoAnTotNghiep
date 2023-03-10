import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Home } from "./Home";

@Entity("home_days")
export class Home_Day {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({ type: "date" })
  public time_start: string;

  @Column({ type: "date" })
  public time_end: string;

  @Column({ type: "int" })
  public passenger: number;

  @Column({ type: "int", default: 0 })
  public total_money: number;

  @Column({ type: "timestamp" }) // Recommended
  created_at: Date;

  @ManyToOne(() => Home, (home) => home.home_days)
  home: Home;
}
