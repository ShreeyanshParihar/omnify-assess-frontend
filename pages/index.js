import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


export default function Index(){
  const router = useRouter();
  useEffect(()=>{
    router.push('/home');
  },[]);

  return(
    <div className='flex flex-row'>
      <div className='w-screen h-screen' style={{paddingLeft:'50%',paddingTop:'20%'}}>
      <Spin size='large' />
      </div>
    </div>
  );
}
