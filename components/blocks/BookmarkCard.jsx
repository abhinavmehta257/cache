import { BookmarkOutlined } from '@mui/icons-material';
import React, { useState, useEffect, useRef } from 'react';
import Loader from './Loader';
import ContextMenu from './ui/ContextMenu';

function BookmarkCard({bookmark, onDelete}) {
  const { title, author, body, thumbnail, link } = bookmark;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cardRef = useRef(null); // To track clicks outside the component
  const [loader, setLoader] = useState(false)

  const clickHandler = () => {
    window.open(link, "_blank");
  };

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent card click when menu is toggled
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside or on scrolling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsMenuOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const deleteBookmark = async () => {
    try {
      setLoader(true);
      const response = await fetch(`/api/bookmarks/delete?bookmark_id=${bookmark._id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete bookmark: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Bookmark deleted successfully:', data);
      // Optionally, trigger any state updates or UI changes after deletion
      onDelete(bookmark._id);
      setLoader(false);
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };
  


  return (
    <>
      <div
        className="relative flex items-center cursor-pointer gap-4 rounded-xl w-full p-2 bg-white dark:bg-dark-surface transition-all duration-300 ease-in-out"
        onClick={clickHandler}
        ref={cardRef}
      >
        {/* Thumbnail */}
        {thumbnail !== 'nsfw' ? (
          <img className="w-[15%] aspect-square rounded-lg" src={thumbnail} alt="thumbnail" />
        ) : (
          <div className="w-[15%] aspect-square rounded-lg text-light-surface dark:bg-dark-surface p-2 flex justify-center items-center">
            <BookmarkOutlined />
          </div>
        )}

        {/* Bookmark Details */}
        <div className="flex flex-col w-[70%]">
          <h3 className="w-full text-ellipsis overflow-hidden whitespace-nowrap text-light-text font-medium font-['Inter'] text-[16px]">
            {title}
          </h3>
          <p className="text-subtle-text font-normal font-['Inter'] leading-[21px] w-[160px] text-[14px] text-ellipsis overflow-hidden">
            By: {author}
          </p>
          <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap text-subtle-text font-normal font-['Inter'] leading-[21px]">
            {body}
          </p>
        </div>

        {/* 3 Dots (Context Menu Trigger) */}
        <ContextMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} deleteBookmark={deleteBookmark}/>

      </div>
      {
          loader ? <Loader/> : null
        }
    </>
  );
}

export default BookmarkCard;
