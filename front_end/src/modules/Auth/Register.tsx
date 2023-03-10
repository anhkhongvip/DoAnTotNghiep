import React, { Fragment, useEffect, useState } from "react";
import { useFormik, Form, Field, ErrorMessage, Formik, useField } from "formik";
import { Link } from "react-router-dom";
import { Input, InputPasswordToggle } from "../../components/input";
import styled from "styled-components";
import { Button } from "../../components/button";
import * as yup from "yup";
import { toast } from "react-toastify";
const RegisterStyles = styled.div`
  .form-auth {
    &-header {
      font-size: 1.4rem;
      color: #84878b;
      margin: 3rem 0;
    }
    .link-forgot {
      display: block;
      text-align: right;
      font-size: 1.4rem;
      color: #5a89ff;
    }
  }

  .btn-google {
    background-color: #316bff;
    padding: 0 5rem;
    height: 4.8rem;
    color: white;
    font-weight: 600;
    font-size: 1.4rem;
    border-radius: 0.8rem;
  }

  .btn-facebook {
    padding: 0 2rem;
    height: 4.8rem;
    border-radius: 0.8rem;
    background-color: #3b3e44;
    margin-left: 1.2rem;
  }

  .btn-login {
    margin-top: 2rem;
    display: block;
    height: 4.8rem;
    width: 100%;
    border-radius: 0.8rem;
    background-color: #316bff;
    font-size: 2rem;
    font-weight: 700;
    color: white;
  }

  .not-have-account {
    margin-top: 2rem;
    display: block;
    text-align: center;
    font-weight: 500;
    font-size: 1.4rem;
    & a {
      color: #5a89ff;
    }
  }
`;
const Register = () => {
  const initialValues = {
    email: "",
    username: "",
    password: "",
  };

  let validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email nhập không hợp lệ")
      .required("Email không được để trống"),
    username: yup.string().required("Tên người dùng không được để trống"),
    password: yup
      .string()
      .min(8, "Mật khẩu phải từ 8 kí tự trở lên")
      .required("Mật khẩu không được để trống"),
  });

  return (
    <RegisterStyles>
      <div className="social-network flex items-center">
        <button type="button" className="btn btn-google">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3"
          >
            <path
              d="M20.6251 8.49019H11.0884V12.353H16.5765C16.0657 14.8076 13.9275 16.218 11.0884 16.218C7.74071 16.218 5.04244 13.5809 5.04244 10.308C5.04244 7.03619 7.74071 4.39908 11.0884 4.39908C12.5303 4.39908 13.8336 4.89941 14.8563 5.71763L17.8341 2.80852C16.0199 1.26274 13.6939 0.309082 11.0884 0.309082C5.41465 0.309082 0.856445 4.76285 0.856445 10.3091C0.856445 15.8553 5.41351 20.3091 11.0884 20.3091C16.2043 20.3091 20.8564 16.6724 20.8564 10.3091C20.8564 9.71808 20.7637 9.08119 20.6251 8.49019Z"
              fill="white"
            />
          </svg>
          Sign in with Google
        </button>
        <button type="button" className="btn btn-facebook">
          <svg
            width="10"
            height="24"
            viewBox="0 0 13 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.8564 0.974947V4.62399H10.6759C9.87959 4.62399 9.34256 4.78985 9.06478 5.12158C8.787 5.45331 8.64811 5.95091 8.64811 6.61437V9.22675H12.7176L12.1759 13.3181H8.64811V23.8091H4.39811V13.3181H0.856445V9.22675H4.39811V6.21353C4.39811 4.49959 4.87959 3.17036 5.84256 2.22585C6.80552 1.28134 8.08793 0.809082 9.68978 0.809082C11.0509 0.809082 12.1064 0.86437 12.8564 0.974947Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div className="form-auth">
        <h4 className="form-auth-header text-center">hoặc tiếp tục với</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => {  
            return (
              
                <Form className="search-bar__form">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Nhập email của bạn"
                    />
                    <ErrorMessage name="email" component="div" className="text-xl text-red-500 mt-2" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Tên người dùng</label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên của bạn"
                    />
                     <ErrorMessage name="username" component="div" className="text-xl text-red-500 mt-2" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <InputPasswordToggle />
                    <ErrorMessage name="password" component="div" className="text-xl text-red-500 mt-2" />
                  </div>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    className="btn__submit"
                    width="100%"
                    height="4.8rem"
                  >
                    Đăng ký
                  </Button>
                </Form>
            );
          }}
        </Formik>
        <span className="not-have-account">
          Bạn đã có tài khoản?{" "}
          <Link to="/" className="">
            Đăng nhập
          </Link>
        </span>
      </div>
    </RegisterStyles>
  );
};

interface IFormilkCustom {
  errors: any;
  isSubmitting: boolean;
}

const FormilkCustom = (props: IFormilkCustom) => {};

export default Register;
