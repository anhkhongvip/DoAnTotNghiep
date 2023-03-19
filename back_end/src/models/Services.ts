import { Home_Service } from './Home_Service';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("services")
export class Service {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({ type: "varchar" })
  public name: string;

  @Column({ type: "varchar" })
  public icon_service: string;


  @Column({type: "int"})
  public type_service: number; // 1: default -  2: popular - 3: safety


  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }) // Recommended
  created_at: Date;


  @OneToMany(() => Home_Service, (home_service) => home_service.home)
  home_services: Home_Service[];
}
