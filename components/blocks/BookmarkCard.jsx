import { ArrowRightAlt } from '@mui/icons-material';
import React from 'react'

function BookmarkCard({bookmark}) {
  const {title,author,body,thumbnail,link,service_id} = bookmark;
  const clickHandler = ()=>{
    window.open(link, "_blank")
  }
  return (
    <div className='flex items-center  gap-[16px] rounded-xl' onClick={clickHandler}>
        <img class="w-[70px] h-[70px] relative rounded-lg" src={thumbnail} />
        <div className='flex flex-col w-[260px]'>
            <h3 className="self-stretch text-light-text font-medium font-['Inter'] text-[16px] text-ellipsis overflow-hidden w-full">
                {title}
            </h3>
            <p className="text-subtle-text font-normal font-['Inter'] leading-[21px] w-[160px] text-[14px] text-ellipsis overflow-hidden">By:{" "}{author}</p>
            <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap text-subtle-text font-normal font-['Inter'] leading-[21px]">{body}</p>
        </div>
        {/* <ArrowRightAlt /> */}
    </div>
  )
}

export default BookmarkCard