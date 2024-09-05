export default function groupByService(data) {
    const formatted = [];
  
    data.forEach(bookmark => {
      // Find if the service already exists in the formatted array
      const existingService = formatted.find(item => item.service_name === bookmark.service_name);
      
      if (existingService) {
        // If it exists, increase the count and add the bookmark to the bookmarks array
        existingService.count++;
        existingService.bookmarks.push(bookmark);
      } else {
        // If not, create a new service entry
        formatted.push({
          service_name: bookmark.service_name,
          count: 1,
          bookmarks: [bookmark]
        });
      }
    });
  
    return formatted;
  }