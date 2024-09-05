import React, { useEffect, useState } from 'react'
import BookmarkCollapsible from './blocks/BookmarkCollapsible';
import Card from './skeletons/Card';

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState(null)
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/bookmarks');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setBookmarks(data);
        console.log(data);
        
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchServices();
  }, []);
  
  return (
    <div>
        <h1 className="text-primary-text dark:text-light-text text-[28px] font-bold font-['Inter'] leading-[35px]">Bookmarks</h1>
        <div className='mt-[24px]'>
          { bookmarks ?
            bookmarks.map((bookmark,index)=>(
              <BookmarkCollapsible bookmarkService={bookmark}/>
            ))
            : <Card />
          }
        </div>
    </div>
  )
}

export default Bookmarks