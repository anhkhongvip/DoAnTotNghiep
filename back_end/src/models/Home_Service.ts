import { Service } from './Services';
import { Home } from './Home';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity("home_services")
export class Home_Service {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Recommended
  created_at: Date;

  @Column({ type: 'int'})
  home_id: number;

  @Column({ type: 'int'})
  service_id: number;
  
}