import { Popover, Transition } from '@headlessui/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState, Fragment } from "react";
import { Listbox } from '@headlessui/react';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Modal} from 'antd';
import { Values } from 'utils/utils';


const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]


export default function AddEvent() {



    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {

        setUserId(sessionStorage.getItem('id'));

        addEventForm.setFieldValue('user_id',parseInt(sessionStorage.getItem('id')));

        
    }, []);


    const AddEvent = async (values) => {
       


        setLoading(true);

        await fetch(Values.server + 'event', {
            method: 'post',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (res) => {

                setLoading(false);

                if (res.status == 200 || res.status == 201) {
                    setSuccess(true);
                    const data = await res.json();
                   
                    
                    setTimeout(() => router.reload(), 2000);
                } else {
                    setSuccess(false);
                    setTimeout(() => setSuccess(null), 2000);
                }
            })
            .catch(e => { setSuccess(false); console.error(e); setLoading(false); });

    }



    const addEventForm = useFormik({
        initialValues: {
            user_id: userId,
            name: '',
            description: '',
            start_time: '',
            end_time: '',
            day_of_week: days[0]
        },
        onSubmit: AddEvent
    });

   

      const [isModalVisible, setIsModalVisible] = useState(false);

      const showModal = () => {
        setIsModalVisible(true);
      };
    
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
    
      return (
        <>
          <button
          onClick={()=>{showModal();}}
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  Add Event
                </button>
          <Modal title="Add Event" maskClosable={false} visible={isModalVisible} destroyOnClose={true} footer={null} onCancel={handleCancel}>
          <div className="flex-auto px-4 lg:px-10 py-10">
                                         <form onSubmit={addEventForm.handleSubmit}>

                                         <div className="mb-3">
                                                 <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Start and End Time
                    </label>

                    <TimePicker.RangePicker onChange={(e)=>{addEventForm.setFieldValue('start_time',e[0].format("HH:mm:ss")); addEventForm.setFieldValue('end_time',e[1].format("HH:mm:ss"));}} bordered={false} />
                    
                    </div>    

                                         <div className=" mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Day
                    </label>
                                                <div className="w-full top-16">
                                                    <Listbox value={addEventForm.values.day_of_week} onChange={(v)=>{addEventForm.setFieldValue('day_of_week',v)}}>
                                                        <div className="relative mt-1">
                                                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                                                <span className="block truncate">{addEventForm.values.day_of_week}</span>
                                                
                                                            </Listbox.Button>
                                                            <Transition
                                                                as={Fragment}
                                                                leave="transition ease-in duration-100"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                            >
                                                                <Listbox.Options className="absolute w-full py-1 mt-1 text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black  focus:outline-none sm:text-sm">
                                                                    {days.map((day, i) => (
                                                                        <Listbox.Option
                                                                            key={i}
                                                                            className={({ active }) =>
                                                                                `cursor-default select-none relative py-2 pl-10 pr-4`
                                                                            }
                                                                            value={day}
                                                                        >
                                                                            {({ selected, active }) => (
                                                                                <>
                                                                                    <span
                                                                                        className={`block truncate`}
                                                                                    >
                                                                                        {day}
                                                                                    </span>
                                                                                    {selected ? (
                                                                                        <span
                                                                                            className={'text-amber-600  absolute inset-y-0 left-0 flex items-center pl-3'}
                                                                                        >
        
                                                                                        </span>
                                                                                    ) : null}
                                                                                </>
                                                                            )}
                                                                        </Listbox.Option>
                                                                    ))}
                                                                </Listbox.Options>
                                                            </Transition>
                                                        </div>
                                                    </Listbox>
                                                </div>



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
                                                    onChange={addEventForm.handleChange}
                                                    value={addEventForm.values.name}
                                                    required
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
                                                    onChange={addEventForm.handleChange}
                                                    value={addEventForm.values.description}
                                                    required
                                                />
                                            </div>

                                            


                                           
                                            <div className="text-center mt-6">
                                                <button
                                                    disabled={loading || success != null}
                                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                    type="submit"
                                                >
                                                    {loading ? "Please Wait" : success == null ? "Add Event" : success ? "Event Added" : "Something Went Wrong"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
           
          </Modal>
        </>
      );

    
}