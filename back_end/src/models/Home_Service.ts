import { Service } from './Services';
import { Home } from './Home';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity("home_services")
export class Home_Service {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Recommended
  created_at: Date;

  @ManyToOne(() => Home, (home) => home.home_services)
  home: Home;

  @ManyToOne(() => Service, (service) => service.home_services)
  service: Service;

}