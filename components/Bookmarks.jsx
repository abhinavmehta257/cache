import React, { useEffect, useState } from 'react'
import BookmarkCollapsible from './blocks/BookmarkCollapsible';
import Card from './skeletons/Card';
import BookmarkCard from './blocks/BookmarkCard';
import { Close } from '@mui/icons-material';
import Loader from './blocks/Loader';

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchesBookmarks, setSearchesBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log(isLoading);
    
const fetchServices = async () => {
  try {
    const response = await fetch('/api/bookmarks');
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    
    const data = await response.json();
    setBookmarks(data);
    setIsLoading(false);
  } catch (error) {
    console.error(error.message);
    setIsLoading(false);
  }
};

    fetchServices();
  }, []);
  
  const handleDeleteBookmark = (deletedBookmarkId) => {
    const updatedBookmarks = bookmarks
      .map(service => {
        const filteredBookmarks = service.bookmarks.filter(bookmark => bookmark._id !== deletedBookmarkId);
        if (filteredBookmarks.length === 0) return null; // Return null for services with no bookmarks
        return {
          ...service,
          bookmarks: filteredBookmarks,
          count: filteredBookmarks.length,  // Update the count after deletion
        };
      })
      .filter(service => service !== null); // Filter out the null values
    
    setBookmarks(updatedBookmarks);
  };

  // Debounce function to limit the frequency of invoking the filter function
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

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
    
    if(typedSearchTerm !== ''){ 
      setIsLoading(true);
      setSearchTerm(typedSearchTerm);
      console.log("query db")
      fetch(`/api/bookmarks/query`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({query:typedSearchTerm})
			})
			.then(response => response.json())
			.then(data => {
        console.log(data);
				setSearchesBookmarks(data);
        setIsLoading(false);
			})
			.catch(error => {
				console.error('Error fetching URL:', error);
				});
    }
    let bookmarksFound = [];
    setSearchesBookmarks(bookmarksFound);
  }, 500);

  return (
    <div className='overflow-hidden'>
        <h1 className="text-primary-text dark:text-light-text text-[28px] font-bold font-['Inter'] leading-[35px]">Bookmarks</h1>
        <div className='mt-[16px] flex justify-center items-center relative'>
          <input
          type="text"
          placeholder="Search bookmarks..."
          defaultValue={searchTerm}
          onChange={filter}
          className="p-[8px] focus:border-none border-dark-background rounded-[8px] w-full bg-dark-surface text-light-text"
        />
        {/* <button onClick={() => setSearchTerm('')}>
          <Close className='absolute z-10 right-[10px] text-light-surface cursor-pointer'/>
        </button> */}
        </div>
        <div className='mt-[24px] h-[70vh] overflow-y-auto no-scrollbar'>
        {
          isLoading ? (
            <div className='w-full h-full flex justify-center items-center'>
              <Loader width={"50px"} />
            </div>
          ) : (bookmarks && searchTerm.trim() === '' ? (
            bookmarks.map((bookmark, index) => (
              <BookmarkCollapsible key={index} bookmarkService={bookmark} onDelete={handleDeleteBookmark} />
            ))
          ) : searchTerm.trim() !== '' ? (
            searchesBookmarks.map((bookmark, index) => (
              <div className='mt-4' key={index}><BookmarkCard bookmark={bookmark} onDelete={handleDeleteBookmark} /></div>
            ))
          ) : (
            <Card />
          ))
        }
        </div>
    </div>
  )
}

export default Bookmarks;
