import { Home_Day } from './Home_Day';
import { Home_Service } from './Home_Service';
import { Account } from "./Account";
import { Category } from "./Category";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Home_Image } from "./Home_Image";

@Entity("homes")
export class Home {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({ type: "varchar", length: 200, nullable: true})
  public title: string | null;

  @Column({ type: "int", nullable: true })
  public price: number | null;

  @Column({ type: "varchar", nullable: true})
  public address: string | null;

  @Column({ type: "int", nullable: true})
  public max_passenger: number | null;

  @Column({ type: "int", nullable: true })
  public bed: number | null;

  @Column({ type: "int", nullable: true })
  public bathroom: number | null;

  @Column({ type: "int", nullable: true })
  public bedroom: number | null;

  @Column({
    type: "varchar",
    length: 200,
    nullable: true,
  })
  public image_main: string | null;

  @Column({
    type: "varchar",
    length: 200,
    nullable: true,
  })
  
  public public_id: string | null;

  @Column({ type: "int", default: 1})
  public stepProgress: number;

  @Column({ type: "int", default: 3 }) // 1: Đã đăng - 2: Đã hủy - 3: Đang tiến hành
  public status: string;

  @Column({ type: "varchar", length: 200, default: '' })
  public description: string;

  @Column({ type: "int", nullable: true })
  public rate_star: number;

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }) // Recommended
  public created_at: Date;

  @Column({ type: "int", nullable: true }) //
  public category_id: number;

  @Column({ type: "int" })
  public account_id: number;

  
}
