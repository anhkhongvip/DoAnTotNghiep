import { Account } from "./Account";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity("contracts")
export class Contract {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({ type: "date" })
  public checkin: string;

  @Column({ type: "date" })
  public checkout: string;

  @Column({ type: "int" })
  public numberOfAdults: number;

  @Column({ type: "int" })
  public numberOfChildrens: number;

  @Column({ type: "int" })
  public numberOfInfants: number;

  @Column({ type: "int", default: 0 })
  public total_money: number;

  @Column({ type: "int", default: 4 }) // 1 - Approved // 2 - Pending // 3 - Cancelled  // 4 - Wait payment - đang chờ thanh toán
  public status: number; 

  @Column({ type: "int", default: 3 }) // 1 - paid-all // 2 - paid-half  // 3 - unpaid
  public status_payment: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }) // Recommended
  created_at: Date;

  @Column({ type: "int" })
  public home_id: number;

  @Column({ type: "int" })
  public account_id: number;
}
