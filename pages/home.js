import React, { useEffect, useState } from "react";
import Navbar from "components/Navbars/AuthNavbar";
import { useRouter } from "next/router";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import Link from "next/link";
import { Spin } from "antd";
import { Values } from "utils/utils";
import { Modal } from 'antd';
//import 'antd/dist/antd.css';
import "react-big-calendar/lib/css/react-big-calendar.css";




export async function getServerSideProps(context) {
  return {
    props: {query:context.query},
  }
}


export default function Home({query}) {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const localizer = momentLocalizer(moment);

  const showModal = (e) => {
    setIsModalVisible(true);
    setModalData(e);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(async () => {
    await getEvents();
  }, [router]);

  const getEvents = async () => {

    setLoading(true);

    await fetch(Values.server + 'schedule/' + sessionStorage.getItem('id'), {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async (res) => {

        setLoading(false);

        if (res.status == 200 || res.status == 201) {
          const data = await res.json();

          setEvents(data.map((e, i) => ({
            id: i,
            title: e.name,
            resource: e.description,
            start: new Date(`${e.date} ${e.start_time}`),
            end: new Date(`${e.date} ${e.end_time}`)
          })));


        } else {
          setEvents([]);

        }
      })
      .catch(e => { console.error(e); setEvents([]); setLoading(false); });


  }



  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>

        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">

              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    My Calender
                  </h6>
                </div>
              </div>


              <div className="p-3 mt-32 sm:mt-0">
                <Spin size='large' spinning={loading} />
                <Calendar
                  localizer={localizer}
                  events={events}
                  style={{ height: 500 }}
                  onSelectEvent={(e) => { showModal(e); }}
                />

                <Modal title="Event Info" maskClosable={false} visible={isModalVisible} destroyOnClose={true} footer={null} onCancel={handleCancel}>
                  <div className="flex-auto px-4 lg:px-10 py-10">
                    <form >

                    <div className=" w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Start
                    </label>
                        <input
                          type="text"
                          name="name"
                          className=" border-0 w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                          placeholder="Event Name"
                          value={modalData.start}
                          readOnly
                        />
                      </div>

                      <div className=" w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          End
                    </label>
                        <input
                          type="text"
                          name="name"
                          className=" border-0 w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                          placeholder="Event Name"
                          value={modalData.end}
                          readOnly
                        />
                      </div>

                      <div className=" w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Event Name
                    </label>
                        <input
                          type="text"
                          name="name"
                          className=" border-0 w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                          placeholder="Event Name"
                          value={modalData.title}
                          readOnly
                        />
                      </div>

                      <div className=" mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Description
                    </label>
                        <textarea
                          name="description"
                          className="border-0 w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                          placeholder="Event Description"
                          minLength="8"
                          rows='4'
                          value={modalData.resource}
                          readOnly
                        />
                      </div>






                    </form>
                  </div>
                </Modal>


              </div>
            </div>
          </div>
        </section>
      </main>



    </>
  );
}