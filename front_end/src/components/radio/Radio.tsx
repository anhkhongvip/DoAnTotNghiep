import { useField } from "formik";
import React from "react";
import styled from "styled-components";
const RadioStyles = styled.div`
  display: inline-block;
  .radio {
    &__input {
      display: none;
      &:checked + .radio__label::before {
        background-color: #fc556f;
        box-shadow: 0 0 0 4px #fff, 0 0 0 6px #fc556f;
      }
    }
    &__label {
      position: relative;
      padding-left: 4rem;
      cursor: pointer;
      &::before {
        content: "";
        width: 2rem;
        height: 2rem;
        border-radius: 3rem;
        background-color: #eff1f5;
        box-shadow: 0 0 0 4px #eff1f5, 0 0 0 6px #b7c1cb;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        transition: 0.25s ease;
      }
    }
  }
`;

type Props = {
  children?: React.ReactNode;
  id?: string;
  name: string;
  value: string;
  disabled?: boolean;
  checked?: boolean;
  onClick?: ()=> void;
};

const Radio = ({ children, ...props }: Props) => {
  
  const [field, meta] = useField({ name: props.name });  
  return (
    <RadioStyles onClick={props.onClick}>
      <div className="radio">
        <input type="radio" className="radio__input" {...field} {...props}  />
        <label htmlFor={props.id} className="radio__label">
          {children}
        </label>
      </div>
    </RadioStyles>
  );
};

export default Radio;
