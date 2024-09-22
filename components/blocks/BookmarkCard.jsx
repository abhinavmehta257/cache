import { ArrowRightAlt, BookmarkBorderOutlined, BookmarkOutlined } from '@mui/icons-material';
import React from 'react'

function BookmarkCard({bookmark}) {
  const {title,author,body,thumbnail,link,service_id} = bookmark;
  const clickHandler = ()=>{
    window.open(link, "_blank")
  }
  
  var urlR = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  return (
    <div className='flex items-center cursor-pointer gap-4 rounded-xl w-full' onClick={clickHandler}>
        {thumbnail!='nsfw' ? <img class="w-[15%] aspect-square relative rounded-lg" src={thumbnail} /> : <div className="w-[15%] aspect-square rounded-[8px] text-light-surface dark:bg-dark-surface p-2 flex justify-center items-center"><BookmarkOutlined/></div>}
        <div className='flex flex-col w-[80%]'>
            <h3 className="w-full text-ellipsis overflow-hidden whitespace-nowrap text-light-text font-medium font-['Inter'] text-[16px]">
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