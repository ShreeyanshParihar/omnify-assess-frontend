import React, { useState } from "react";
import Auth from "layouts/Auth.js";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Values } from "utils/utils";

export default function Register() {

  const router = useRouter();

  const [loading , setLoading] = useState(false);
  const [success, setSuccess] = useState(null);


  const SignUp = async (values)=>{
 

    if(signupForm.values.password == signupForm.values.re_password){
        var payload = values;

        setLoading(true);

        await fetch(Values.server+'signup',{
          method:'post',
          body:JSON.stringify(payload),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then(async (res)=>{

          setLoading(false);

          if(res.status==200||res.status==201){
            setSuccess(true);
            const data = await res.json();
         
            sessionStorage.setItem('id',data['id']);
            sessionStorage.setItem('name',`${data['f_name']} ${data['l_name']}`);
            setTimeout(()=>router.replace('/'),2000);
          }else{
            setSuccess(false);
            setTimeout(()=>setSuccess(null),2000);
          }
        })
        .catch(e=>{ setSuccess(false); console.error(e); setLoading(false); });

        
    }


  }


  const signupForm = useFormik({
    initialValues:{
      f_name:'',
      l_name:'',
      email:'',
      password:'',
      re_password:''
    },
    onSubmit: SignUp
  });



  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign Up
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={signupForm.handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                     First Name
                    </label>
                    <input
                      type="text"
                      name="f_name"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="First Name"
                      onChange={signupForm.handleChange}
                      value={signupForm.values.f_name}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Last Name
                    </label>
                    <input
                      type='text'
                      name="l_name"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Last Name"
                      onChange={signupForm.handleChange}
                      value={signupForm.values.l_name}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      onChange={signupForm.handleChange}
                      value={signupForm.values.email}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password (Min. 8 Characters)"
                      minLength="8"
                      onChange={signupForm.handleChange}
                      value={signupForm.values.password}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                     Corfirm Password
                    </label>
                    <input
                      type="password"
                      name="re_password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password Min. 8 Characters"
                      minLength="8"
                      onChange={signupForm.handleChange}
                      value={signupForm.values.re_password}
                      required
                    />
                  </div>

                  { signupForm.values.password != signupForm.values.re_password && (<>Both Passwords do not match</>)  }
                

                  <div className="text-center mt-6">
                    <button
                      disabled={loading || success != null }
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type='submit'
                    >
                      { loading ? "Please Wait" : success == null ? "Create Account" : success ? "Account Created" : "Something Went Wrong"  }
                  
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link href="/login">
                  <a href="#pablo" className="text-blueGray-200">
                    <small>Log In Instead</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
