import React, { useEffect, useState } from 'react'
import BookmarkCollapsible from './blocks/BookmarkCollapsible';
import Card from './skeletons/Card';
import BookmarkCard from './blocks/BookmarkCard';
import { Close } from '@mui/icons-material';

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchesBookmarks, setSearchesBookmarks] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/bookmarks');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setBookmarks(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchServices();
  }, []);
  
  // Debounce function to limit the frequency of invoking the filter function
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

// Modified filter function with debounce
const filter = debounce((e) => {
  const typedSearchTerm = e.target.value.trim();
  setSearchTerm(typedSearchTerm);
  console.log(typedSearchTerm);
  
  let bookmarksFound = [];
  bookmarks.forEach(services => {
    services.bookmarks.forEach(bookmark => {
      const {author, title, body, service_name} = bookmark;
      if (author.toLowerCase().includes(typedSearchTerm) || 
          title.toLowerCase().includes(typedSearchTerm) || 
          body.toLowerCase().includes(typedSearchTerm) || 
          service_name.toLowerCase().includes(typedSearchTerm)) {
        bookmarksFound.push(bookmark);
      }
    });
  });
  
  setSearchesBookmarks(bookmarksFound);
}, 500);



  return (
    <div>
        <h1 className="text-primary-text dark:text-light-text text-[28px] font-bold font-['Inter'] leading-[35px]">Bookmarks</h1>
        <div className='mt-[16px] flex justify-center items-center relative'>
          <input
          type="text"
          placeholder="Search bookmarks..."
          defaultValue={searchTerm}
          onChange={filter}
          className="p-[8px] focus:border-none border-dark-background rounded-[8px] w-full bg-dark-surface text-light-text"
        />
        <button onClick={()=> setSearchTerm('')}>
          <Close className='absolute z-10 right-[10px] text-light-surface cursor-pointer'/>
        </button>
        </div>
        <div className='mt-[24px]'>
        {
          bookmarks && searchTerm.trim() === '' ? (
            bookmarks.map((bookmark, index) => (
              <BookmarkCollapsible key={index} bookmarkService={bookmark} />
            ))
          ) : searchTerm.trim() !== '' ? (
            searchesBookmarks.map((bookmark, index) => (
              <div className='mt-4'  key={index} ><BookmarkCard bookmark={bookmark} /></div>
            ))
          ) : (
            <Card />
          )
        }
        </div>
    </div>
  )
}

export default Bookmarks