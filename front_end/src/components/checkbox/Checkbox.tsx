import React from "react";
import styled from "styled-components";
const CheckboxStyles = styled.div`
  .checkbox {
    &__input {
      display: none;
    }
    &__label {
      position: relative;
      padding-left: 4rem;
      cursor: pointer;
      &::before {
        content: "";
        width: 3rem;
        height: 3rem;
        background-color: #145ce6;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 0.8rem;
      }
      &::after {
        content: "";
        position: absolute;
        top: 0.2rem;
        left: 0.5rem;
        width: 1.8rem;
        height: 1rem;
        transform: rotate(-45deg);
        border-left: 3px solid white;
        border-bottom: 3px solid white;
        opacity: 0;
        visibility: hidden;
        transition: 0.25s linear;
      }
    }
    .checkbox__input:checked + .checkbox__label::after {
      opacity: 1;
      visibility: visible;
    }
  }
`;

type Props = {
  children?: React.ReactNode;
  id?: string;
  name?: string;
  value?: string;
  onClick?: () => void;
};
const Checkbox = ({ children, ...props }: Props) => {
  return (
    <CheckboxStyles>
      <div className="checkbox">
        <input type="checkbox" {...props} className="checkbox__input" onClick={props.onClick}/>
        <label htmlFor={props.id} className="checkbox__label" >
          {children}
        </label>
      </div>
    </CheckboxStyles>
  );
};

export default Checkbox;
