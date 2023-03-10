import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { InputIcon } from "../../components/input";
import { useFormik, Form, Field, ErrorMessage, Formik, useField } from "formik";
import "toolcool-range-slider";
import HomeHeaderRouter from "./HomeHeaderRouter";
import { Link } from "react-router-dom";
import categoryList from "../../assets/JsonData/category-list.json";
import serviceList from "../../assets/JsonData/service-list.json";
import { Checkbox } from "../../components/checkbox";
import slugify from "slugify";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "toolcool-range-slider": any;
    }
  }
}

const HomeFilterStyles = styled.div`
  .sidebar-search {
    width: 100%;
  }
  .sidebar__form {
    .title-search-bar {
      font-weight: 600;
      display: inline-block;
      margin-bottom: 2rem;
    }
  }
  .filterBar__price {
    margin-top: 2rem;
    &--gte,
    &--lte {
      font-weight: 600;
    }
  }

  .btn-see-more {
    font-weight: 600;
    color: #145ce6;
  }
`;
const initialValues = {};
const HomeSidebarSearch = () => {
  const rangeSliderRef = useRef<HTMLElement>();
  const [priceGte, setPriceGte] = useState<number | string>(200.0);
  const [priceLte, setPriceLte] = useState<number | string>(500.0);
  useEffect(() => {
    const priceRange = rangeSliderRef.current;

    const onChange = (evt: Event) => {
      const customEvent = evt as CustomEvent;

      if (priceGte !== customEvent.detail.value) {
        setPriceGte(customEvent.detail.value);
      }
      if (priceLte !== customEvent.detail.value2) {
        setPriceLte(customEvent.detail.value2);
      }
    };

    priceRange?.addEventListener("change", onChange);

    return () => {
      priceRange?.removeEventListener("change", onChange);
    };
  }, []);
  let id;
  return (
    <HomeFilterStyles>
      <div className="sidebar">
        <div className="sidebar-search">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
            }}
          >
            <Form className="sidebar__form">
              <div className="form-group">
                <label htmlFor="" className="title-search-bar">
                  Tìm kiếm theo địa chỉ hoặc kiểu phòng
                </label>
                <InputIcon
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Nhập email của bạn"
                  icon_position="after"
                >
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.49512 13.4902C2.90796 13.4902 0 10.5823 0 6.99512C0 3.40796 2.90796 0.5 6.49512 0.5C10.0823 0.5 12.9902 3.40796 12.9902 6.99512C12.9902 8.49625 12.481 9.87844 11.6258 10.9784L15.9993 15.3518L14.8511 16.5L10.4776 12.1265C9.37779 12.9812 7.9959 13.4902 6.49512 13.4902ZM11.3657 6.99634C11.3657 9.68671 9.18476 11.8677 6.49439 11.8677C3.80402 11.8677 1.62305 9.68671 1.62305 6.99634C1.62305 4.30597 3.80402 2.125 6.49439 2.125C9.18476 2.125 11.3657 4.30597 11.3657 6.99634Z"
                      fill="#B1B5C4"
                    />
                  </svg>
                </InputIcon>
              </div>

              <div className="form-group">
                <label htmlFor="" className="title-search-bar">
                  Giá tiền trong khoảng
                </label>
                <toolcool-range-slider
                  ref={rangeSliderRef}
                  min="0"
                  max="1000"
                  value={priceGte}
                  value2={priceLte}
                  slider-bg="#bdc3c7"
                  pointer-width="1.5rem"
                  pointer-height="1.5rem"
                  pointer-bg="#316bff"
                  slider-bg-fill="#a8cbee"
                  pointer-bg-hover="#316bff"
                  pointer-bg-focus="#316bff"
                  pointer-shadow="#a8cbee"
                  pointer-border="0"
                  pointer-border-focus="none"
                />
                <div className="filterBar__price flex justify-between">
                  <span className="filterBar__price--gte">{priceGte} VNĐ</span>
                  <span className="filterBar__price--lte">{priceLte} VNĐ</span>
                </div>
              </div>
              <div className="property-type mt-14">
                <div className="title-search-bar">Kiểu phòng</div>
                {categoryList.slice(0, 3).map((item, index) => {
                  id = slugify(item.title, {
                    replacement: "_", // replace spaces with replacement character, defaults to `_`
                    remove: undefined, // remove characters that match regex, defaults to `undefined`
                    lower: false, // convert to lower case, defaults to `false`
                    strict: false, // strip special characters except replacement, defaults to `false`
                    locale: "vi", // language code of the locale to use
                    trim: true,
                  });
                  return (
                    <div className="form-group" key={index}>
                      <Checkbox name={id} id={id} value={item.title}>
                        {item.title}
                      </Checkbox>
                    </div>
                  );
                })}
                <button className="btn-see-more">Xem thêm</button>
              </div>

              <div className="service-room mt-14">
                <div className="title-search-bar">Dịch vụ phòng</div>
                {serviceList.slice(0, 5).map((item, index) => {
                  id = slugify(item.title, {
                    replacement: "_", // replace spaces with replacement character, defaults to `_`
                    remove: undefined, // remove characters that match regex, defaults to `undefined`
                    lower: false, // convert to lower case, defaults to `false`
                    strict: false, // strip special characters except replacement, defaults to `false`
                    locale: "vi", // language code of the locale to use
                    trim: true,
                  });
                  return (
                    <div className="form-group" key={index}>
                      <Checkbox name={id} id={id} value={item.title}>
                        {item.title}
                      </Checkbox>
                    </div>
                  );
                })}
                <button className="btn-see-more">Xem thêm</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </HomeFilterStyles>
  );
};

export default HomeSidebarSearch;
