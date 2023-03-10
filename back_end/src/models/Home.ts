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

  @Column({ type: "varchar", length: 200 })
  public title: string;

  @Column({ type: "int" })
  public price: number;

  @Column({ type: "varchar" })
  public address: string;

  @Column({ type: "int" })
  public max_passenger: number;

  @Column({ type: "int", default: 0 })
  public bedroom: number;

  @Column({ type: "int", default: 0 })
  public bathroom: number;

  @Column({
    type: "varchar",
    length: 200,
    nullable: true,
  })
  public image_main: string | null;

  @Column({ type: "int", default: 1 }) // 1: Đang hoạt động - 2: Đã đóng cửa
  public status: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  public description: string | null;

  @Column({ type: "int" })
  public rate_star: number;

  @Column({ type: "timestamp" }) // Recommended
  created_at: Date;

  @OneToMany(() => Home_Image, (home_image) => home_image.home)
  home_images: Home_Image[];

  @OneToMany(() => Home_Service, (home_service) => home_service.home)
  home_services: Home_Service[];

  @OneToMany(() => Home_Day, (home_day) => home_day.home)
  home_days: Home_Day[];

  @ManyToOne(() => Category, (category) => category.homes)
  category: Category;

  @ManyToOne(() => Account, (account) => account.homes)
  account: Account;

 
}
