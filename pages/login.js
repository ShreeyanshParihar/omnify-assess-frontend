import React, { useState } from "react";
import Auth from "layouts/Auth.js";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Values } from "utils/utils";

export default function Login() {

  const router = useRouter();

  const [loading , setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const Login = async (values)=>{
   


        setLoading(true);

        await fetch(Values.server+'login',{
          method:'post',
          body:JSON.stringify(values),
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
            sessionStorage.setItem('name',data['name']);
            setTimeout(()=>router.replace('/home'),2000);
          }else{
            setSuccess(false);
            setTimeout(()=>setSuccess(null),2000);
          }
        })
        .catch(e=>{ setSuccess(false); console.error(e); setLoading(false); });

        



  }



  const loginForm = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    onSubmit: Login
  });


  return (
    <Auth>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Login
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={loginForm.handleSubmit}>
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
                      onChange={loginForm.handleChange}
                      value={loginForm.values.email}
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
                      placeholder="Password (Min. 8 Charater Password)"
                      minLength="8"
                      onChange={loginForm.handleChange}
                      value={loginForm.values.password}
                      required
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      disabled = {loading || success != null}
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      { loading ? "Please Wait" : success == null ? "Login" : success ? "Logged In" : "Something Went Wrong"  }
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link href="/register">
                  <a href="#pablo" className="text-blueGray-200">
                    <small>Create new account</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Auth>
  );
}


