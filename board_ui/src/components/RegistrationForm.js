import React from 'react'
import {useForm} from 'react-hook-form'
import './PopForm.css'

export default function RegistrationForm({setOpenModal , setSubmitted}) {
     const {register,watch, handleSubmit,formState: { errors } } = useForm({
     defaultValues: {
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:""
        } 
    });

    // const [visibleEye, setVisibleEye] = useState(false)


    const onSubmit = (data) =>{
        setSubmitted(true)
        setOpenModal(false)
    }


  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => {setOpenModal(false);}}>X</button>
        </div>
        <div className="title">
          <h3>RegistrationForm</h3>
        </div>
        <div className="body">
            <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">First Name*</label>
                    <i className="with-tooltip fa fa-question-circle" data-tooltip-content="Must have atleast 3 characters & should not start with numbers."></i>
                    <input type="text" name='firstName' {...register('firstName',{required:"First Name is required",

                    validate:{
                        starstwithNumerical: (value) => !(/^\d/.test(value)) || "Should not start with Number",
                        hasMinLength: (value) => value.length >= 3 || "Must have atleast 3 characters",
                    }

                    })} className="form-control" id="firstName" aria-describedby="emailHelp"/>
                    { <span className='errors'>{errors.firstName?.message}</span> }
                </div>
                 <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Last Name*</label>
                    <i className="with-tooltip fa fa-question-circle" data-tooltip-content="Must have atleast 3 characters & should not start with numbers."></i>
                    <input type="text" name='lastName' {...register('lastName',{required:"Last Name is required",
                     validate:{
                        starstwithNumerical: (value) => !(/^\d/.test(value)) || "Should not start with Number",
                        hasMinLength: (value) => value.length >= 3 || "Must have atleast 3 characters",
                    }
                    })}  className="form-control"  id="lastName" aria-describedby="emailHelp"/>
                    { <span className='errors'>{errors.lastName?.message}</span> }
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">E-mail*</label>
                    <input type="text" name='email' {...register('email',{required:"Email is required", pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"}})} class="form-control" id="email" aria-describedby="emailHelp"/>
                    { <span className='errors'>{errors.email?.message}</span> }
                </div>
                <div className='mb-3'>
                    <label for="exampleInputEmail1" className="form-label">Password*</label>
                    <i className="with-tooltip fa fa-question-circle" data-tooltip-content="Must have atleast 8 characters & 1 uppercae, 1 lowercase, 1 special and 1 numerical character"></i>
                    <input type="password" name='password' {...register('password',{required:"password is required", 

                    validate:{
                        hasMinLength: (value) => value.length >= 8 || "Must have atleast 8 characters",
                        hasSpecialChar: (value) => /^(?=.*\W)/.test(value) || 'Must have atleast one special character',
                        hasNumbers: (value) => /^(?=.*\d)/.test(value) || 'Must have atleast one numerical character',
                        hasUpperCaseChar: (value) => /^(?=.*[A-Z])/.test(value) || 'Must have atleast one uppercase character',
                        hasLowerCaseChar: (value) => /^(?=.*[a-z])/.test(value) || 'Must have atleast one lowercase character',
                    }
                    })} className="form-control" id="password" aria-describedby="emailHelp"/>
                    { <span className='errors'>{errors.password?.message}</span>}
                    {/* <i class="fa fa-eye eye-icon" aria-hidden="true" onClick={()=>setVisibleEye(!visibleEye)}> </i> */}
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Confirm Password*</label>
                    <input type="password" name='password' {...register('confirmPassword',{required:"Confirm Password is required", validate:(val)=>{
                        if(watch('password') !== val){
                            return "Passwords do not match"
                        }
                    }, })} className="form-control" id="confirmpassword" aria-describedby="emailHelp"/>
                    { <span className='errors'>{errors.confirmPassword?.message}</span> }
                </div>
                <button style={{position:'relative',left:'40%', borderRadius:'10px'}} id='submit-btn' type='submit'>Register</button>
            </form>
        </div>
      </div>
    </div>
  )
}