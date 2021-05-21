import React, { useEffect, useState,Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AddEvent from "components/AddEvent/AddEvent";


export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();
  const [name, setName] = useState('');
  const [userId, setUserId] = useState(null);
 


  useEffect(() => {

    if (!sessionStorage.length) {
      router.push('/login');
    } else {
      setName(sessionStorage.getItem('name'));
      setUserId(sessionStorage.getItem('id'));
    }


  }, []);


  const logout = async () => {

    sessionStorage.clear();
    router.replace('/login');
  }
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                href="#pablo"
              >
                Omnify Assessment
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >



            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            

            <li className="flex items-center">
            <AddEvent />
              </li>

              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  {name}
                </button>
              </li>

              <li className="flex items-center">
                <button

                  onClick={() => { logout(); }}
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  Log Out
                </button>
              </li>
            </ul>

            
          </div>
        </div>
      </nav>

     
    </>
  );
}
