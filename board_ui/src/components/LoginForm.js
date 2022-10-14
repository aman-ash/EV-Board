import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./PopForm.css";

export default function LoginForm({ setOpenModal }) {
  const {
    register,
    watch,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isSubmitted, setSubmitted] = useState(false);
  const [visibleEye, setVisibleEye] = useState(false);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        email: "",
        password: "",
      });
    }
  }, [formState]);

  const onSubmit = (data) => {
    setSubmitted(true);
    setOpenModal(false);
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h3>Login Form</h3>
        </div>
        <div className="body">
          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                E-mail*
              </label>
              <input
                type="text"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
              {<span className="errors">{errors.email?.message}</span>}
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Password*
              </label>
              <input
                type={visibleEye ? "text" : "password"}
                name="password"
                {...register("password", {
                  required: "password is required",

                  validate: {
                    hasMinLength: (value) =>
                      value.length >= 8 || "Must have atleast 8 characters",
                    hasSpecialChar: (value) =>
                      /^(?=.*\W)/.test(value) ||
                      "Must have atleast one special character",
                    hasNumbers: (value) =>
                      /^(?=.*\d)/.test(value) ||
                      "Must have atleast one numerical character",
                    hasUpperCaseChar: (value) =>
                      /^(?=.*[A-Z])/.test(value) ||
                      "Must have atleast one uppercase character",
                    hasLowerCaseChar: (value) =>
                      /^(?=.*[a-z])/.test(value) ||
                      "Must have atleast one lowercase character",
                  },
                })}
                class="form-control"
                id="password"
                aria-describedby="emailHelp"
              />
              {<span className="errors">{errors.password?.message}</span>}
              {/* <i class="fa fa-eye eye-icon" aria-hidden="true"
                        onClick={()=>setVisibleEye(!visibleEye)} >
                    </i> */}
            </div>

            <button
              style={{
                position: "relative",
                left: "40%",
                borderRadius: "10px",
              }}
              id="submit-btn"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
