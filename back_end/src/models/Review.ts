import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({ type: "int", nullable: true })
  public cleanliness_rating: number | null; //mức độ sạch sẽ

  @Column({ type: "int", nullable: true })
  public communication_rating: number | null; //mức độ giao tiếp, trò chuyện với khách

  @Column({ type: "int", nullable: true })
  public check_in_rating: number | null; // mức độ thuận tiện khi nhận phòng

  @Column({ type: "int", nullable: true })
  public accuracy_rating: number | null; // mức độ chính xác thông tin của phòng

  @Column({ type: "int", nullable: true })
  public overall_rating: number | null; // đại diện cho điểm số chung của phòng trên các tiêu chí đánh giá khác nhau

  @Column({ type: "varchar", nullable: true })
  public feedback: string | null;

  @Column({ type: "int" })
  public home_id: number;

  @Column({ type: "int" })
  public account_id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }) // Recommended
  created_at: Date;
}
