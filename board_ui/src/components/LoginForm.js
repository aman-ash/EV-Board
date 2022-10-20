import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./PopForm.css";
import { signIn } from "../service/userServices";

export default function LoginForm({ setOpenModal, setShowCreate, setSubmitted, setErrorMessage }) {

  const defaultValues = {
      email: "",
      password: "",
    }
  const {
    register,
    watch,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues
  });

  const [error, setError] = useState({
    error: {
      message:"",
    },
  })

  // useEffect(()=>{
  //   setError({
  //     "message":"",
  //   })
  // },[])

  const onSubmit = (data) => {
    signIn(data)
        .then( (resp) => {console.log(resp); localStorage.setItem('token', resp.data.data); setShowCreate(true); setErrorMessage({
          status: "200",
          message: resp.data.message,
        }); setOpenModal(false); setSubmitted(true) })
        .catch( (error) => {console.log(error.response.data);
          setError({
            "message":error.response.data.message,
          })
        })
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
                onChange={()=> setError({
                  "message":"",
                })}
              />
              {<span className="errors">{errors.email?.message}</span>}
              {<span className="errors">{error.message}</span>}
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Password*
              </label>
              <input
                type="password"
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
