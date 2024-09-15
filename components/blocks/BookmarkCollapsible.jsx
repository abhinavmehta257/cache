import { ArrowRightSharp, ArrowDropDownSharp, Reddit } from '@mui/icons-material';
import React, { useState } from 'react';
import BookmarkCard from './BookmarkCard';

function BookmarkCollapsible({ bookmarkService }) {
  const { service_name, count, bookmarks } = bookmarkService;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-2 flex flex-col gap-[16px] bg-light-container dark:bg-dark-container">
      {/* Header Section */}
      <div className="flex gap-[16px] items-center cursor-pointer" onClick={toggleExpand}>
        <div className="w-[42px] h-[42px] rounded-[8px] bg-light-surface dark:bg-dark-surface p-2">
          <Reddit className="text-primary-text dark:text-light-text" />
        </div>
        <div className="flex-1">
          <h1 className="text-light-text text-base font-medium font-['Inter'] leading-normal">{service_name}</h1>
          <p className="text-subtle-text font-normal font-['Inter'] leading-[21px] w-[160px] text-ellipsis overflow-hidden">{count} Items</p>
        </div>
        {/* Arrow Icon */}
        {isExpanded ? (
          <ArrowDropDownSharp className="text-light-text dark:text-light-text" />
        ) : (
          <ArrowRightSharp className="text-light-text dark:text-light-text" />
        )}
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="mt-4 flex flex-col gap-6">
          {bookmarks.slice(0, 4).map((bookmark, index) => (
            <BookmarkCard key={index} bookmark={bookmark} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookmarkCollapsible;