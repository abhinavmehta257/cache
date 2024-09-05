import { Reddit } from '@mui/icons-material'
import { useRouter } from 'next/router'
import React from 'react'

function ServiceCard({service}) {
  const {_id,service_name,permissions,isConnected,service_url} = service
  
  const router = useRouter();
  const clickHandler = ()=>{
    router.push(`${service_url}?service_id=${_id}`);
  }

  return (
    <div className='flex justify-between items-center py-[12px]'>
        <div className='flex gap-[16px]'>
            <div className='w-[42px] h-[42px] rounded-[8px] bg-light-surface dark:bg-dark-surface p-2'>
                {/* <img src={serviceIcon} alt="" /> */}
                <Reddit className='text-primary-text dark:text-light-text'/>
            </div>
            <div className='flex flex-col'>
                <h2 className="text-primary-text dark:text-light-text text-base font-medium font-['Inter'] leading-normal">{service_name}</h2>
                <p className="text-subtle-text font-normal font-['Inter'] leading-[21px] w-[160px] text-ellipsis overflow-hidden">{permissions ? permissions.join(", "):null}</p>
            </div>
        </div>
        <button disabled={isConnected} onClick={clickHandler} className="h-[32px] text-center text-primary-text dark:text-light-text text-sm font-medium font-['Inter'] leading-[21px] px-[16px] bg-light-surface dark:bg-dark-surface rounded-[12px]">{isConnected ? "Connected":"Connect"}</button>
    </div>
  )
}

export default ServiceCard