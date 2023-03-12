import React from "react";
import styled from "styled-components";
import { useField } from "formik";
interface styleProps {
  readonly hasIcon: boolean;
  readonly iconPosition: string;
}

const MyInputStyles = styled.div<styleProps>`
  height: 4.8rem;
  border-radius: 0.8rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  position: relative;
  input {
    background-color: #e7ecf3 !important;
    padding-right: ${(props) => (props.hasIcon ? (props.iconPosition === 'after' ? "5rem" : "2rem") : "2rem")};
    padding-left:  ${(props) => (props.hasIcon ? (props.iconPosition === 'after' ? "2rem" : "5rem") : "2rem")};
    background-color: inherit;
    font-size: 1.4rem;
    width: 100%;
    height: 100%;
  }
  .input-icon {
    position: absolute;
    top: 50%;
    right: ${(props) => (props.iconPosition === 'after' ? '2rem' : '')};
    left : ${(props) => (props.iconPosition === 'after' ? '' : '2rem')};
    transform: translateY(-50%);
  }
`;

// interface Iprops {
//   type: string;
//   name: string;
//   id ?: string;
//   classname ?: string;
// }

type Props = {
  children?: React.ReactNode;
  icon_position?: string;
  type?: string;
  name: string;
  id?: string;
  className?: string;
  placeholder?: string;
};

const Input = ({
  children,
  icon_position = "",
  ...props
}: Props) => {
  const [field, meta] = useField({name: props.name});  
  return (
    <MyInputStyles hasIcon={children ? true : false} iconPosition={icon_position}>
      {children ? (
        icon_position === "before" ? (
          <>
            <input {...props} {...field}/>
            <div className="input-icon cursor-pointer">{children}</div>
          </>
        ) : (
          <>
            <div className="input-icon cursor-pointer">{children}</div>
            <input {...props} {...field}/>
          </>
        )
      ) : (
        <input {...props} {...field}/>
      )}
    </MyInputStyles>
  );
};

export default Input;
