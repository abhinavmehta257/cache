const UserBookmark = require("@/model/userBookmark");

export default async function saveBookmarks(bookmarks) {
    try {
        // Extract all ids from the bookmarks array
        const bookmarkIds = bookmarks.map(b => b.post_id);

        // Find existing records that match these ids
        const existingBookmarks = await UserBookmark.find({ post_id: { $in: bookmarkIds } });

        // Get the ids of the already existing bookmarks
        const existingIds = existingBookmarks.map(b => b.post_id);

        // Filter out bookmarks whose post_id already exists in the collection
        const newBookmarks = bookmarks.filter(b => !existingIds.includes(b.post_id));

        // If there are new bookmarks, save them
        if (newBookmarks.length > 0) {
            // Generate embedding for each new bookmark chunk before saving
            const { generateEmbedding } = require("./generateEmbedding");
            for (const bookmark of newBookmarks) {
                if (bookmark.content) {
                    bookmark.embedding = await generateEmbedding(bookmark.content);
                }
            }
            await UserBookmark.insertMany(newBookmarks);
            console.log(`${newBookmarks.length} new bookmarks inserted.`);
        } else {
            console.log("No new bookmarks to insert.");
        }
    } catch (error) {
        console.error("Error saving bookmarks:", error);
    }
}
