import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Home } from "./Home";

@Entity("home_days")
export class Home_Day {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({ type: "date" })
  public time: Date;

  @Column({ type: "int", nullable: true })
  public home_id : number;

  @Column({ type: "int", nullable: true })
  public contract_id : number;

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }) // Recommended
  created_at: Date;
}
