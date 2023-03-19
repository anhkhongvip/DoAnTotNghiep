import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "../../components/category/CategoryCard";
import { Autoplay } from "swiper";
import "swiper/css/autoplay";
import categoryList from "../../assets/JsonData/category-list.json";
import { useAppDispatch } from "../../app/hooks";
import { getCategoriesAsync } from "../../services/category.service";
const HomeDiscoveryStyles = styled.div`
  margin-top: 7rem;
  .home-discovery {
    &__header {
      .title {
        font-size: 3rem;
        font-weight: bold;
      }
    }
  }
`;

const HomeDiscovery = () => {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<any>([]);
  useEffect(() => {
    async function fetchCategories() {
      let {
        payload: { data },
      } = await dispatch(getCategoriesAsync());
      setCategories([...data.categories, ...data.categories]);
    }
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <HomeDiscoveryStyles>
      <div className="home-discovery">
        <div className="home-discovery__header text-center">
          <h2 className="title">Khám phá thêm loại hình du lịch</h2>
        </div>
        <div className="home-discovery__content mt-16">
          <Swiper
            modules={[Autoplay]}
            grabCursor={true}
            slidesPerView={4}
            loop={true}
            autoplay={{
              delay: 4000,
            }}
            spaceBetween={30}
          >
            {categories.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <CategoryCard item={item}></CategoryCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </HomeDiscoveryStyles>
  );
};

export default HomeDiscovery;
