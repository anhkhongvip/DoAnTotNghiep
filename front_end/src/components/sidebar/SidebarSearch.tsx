import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { InputIcon } from "../input";
import { useFormik, Form, Field, ErrorMessage, Formik, useField } from "formik";
import "toolcool-range-slider";
import HomeHeaderRouter from "../../modules/Home/HomeHeaderRouter";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import categoryList from "../../assets/JsonData/category-list.json";
import serviceList from "../../assets/JsonData/service-list.json";
import { Checkbox } from "../checkbox";
import slugify from "slugify";
import { fommatCurrency } from "../../configs/formatCurrency";
import { useAppDispatch } from "../../app/hooks";
import { getCategoriesAsync } from "../../services/category.service";
import { findHomeByQuery } from "../../services/room.service";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "toolcool-range-slider": any;
    }
  }
}

const SidebarSearchStyles = styled.div`
  .sidebar-search {
    width: 100%;
    padding: 0 1rem;
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
  .input-search {
    width: 100%;
    padding: 1rem 0.5rem;
  }
`;

const SidebarSearch = () => {
  const rangeSliderRef = useRef<HTMLElement>();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceGte, setPriceGte] = useState<number | string>(100000);
  const [priceLte, setPriceLte] = useState<number | string>(1000000);
  const [categories, setCategories] = useState<any>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
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

  useEffect(() => {
    dispatch(getCategoriesAsync()).then((res) => {
      const { categories } = res.payload.data;
      setCategories(categories);
    });
  }, []);

  const handleOptionSelect = (option: any) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o: any) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleChange = (event: ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    setInputSearch(value);
  };

  const handleSearch = (event: MouseEvent) => {
    event.preventDefault();
    setSearchParams({
      categories: selectedOptions.join(","),
      name: inputSearch,
      min: priceGte.toString(),
      max: priceLte.toString(),
    });
  };

  return (
    <SidebarSearchStyles>
      <div className="sidebar">
        <div className="sidebar-search">
          <form className="sidebar__form">
            <div className="form-group">
              <label htmlFor="" className="title-search-bar">
                Tìm kiếm theo địa chỉ hoặc kiểu phòng
              </label>
              <input
                className="input-search"
                type="text"
                placeholder="Nhập tên phòng hoặc địa điểm"
                onChange={(event) => handleChange(event)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="" className="title-search-bar">
                Giá tiền trong khoảng
              </label>
              <toolcool-range-slider
                ref={rangeSliderRef}
                min="100000"
                max="10000000"
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
                <span className="filterBar__price--gte">
                  {fommatCurrency("vi-VN", "VND").format(Number(priceGte))}
                </span>
                <span className="filterBar__price--lte">
                  {fommatCurrency("vi-VN", "VND").format(Number(priceLte))}
                </span>
              </div>
            </div>
            <div className="property-type mt-14">
              <div className="title-search-bar">Kiểu phòng</div>
              {categories.map((item: any, index: number) => {
                return (
                  <div className="form-group" key={index}>
                    <Checkbox
                      name="categories"
                      id={item.id}
                      value={item.id}
                      onClick={() => handleOptionSelect(item.id)}
                    >
                      {item.name}
                    </Checkbox>
                  </div>
                );
              })}
            </div>
            <button type="submit" onClick={(event) => handleSearch(event)}>
              Tìm kiếm
            </button>
          </form>
        </div>
      </div>
    </SidebarSearchStyles>
  );
};

export default SidebarSearch;
