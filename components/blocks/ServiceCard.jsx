import React from 'react'

function ServiceCard({serviceIcon,serviceName,permissions,isConnected}) {
  return (
    <div className='flex justify-between items-center py-[12px]'>
        <div className='flex gap-[16px]'>
            <div className='w-[42px] h-[42px] rounded-[8px] bg-[#E8EDF2] p-2'>
                <img src={serviceIcon} alt="" />
            </div>
            <div className='flex flex-col'>
                <h2 className="text-[#0c141c] text-base font-medium font-['Inter'] leading-normal">{serviceName}</h2>
                <p className="text-[#4f7296] text-sm font-normal font-['Inter'] leading-[21px] w-[160px] text-ellipsis overflow-hidden">{permissions}</p>
            </div>
        </div>
        <button className="h-[32px] text-center text-[#0c141c] text-sm font-medium font-['Inter'] leading-[21px] px-[16px] bg-[#E8EDF2] rounded-[12px]">{isConnected ? "Disconnect":"Connect"}</button>
    </div>
  )
}

export default ServiceCard