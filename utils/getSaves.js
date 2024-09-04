import { transformPosts } from "@/helpers/PostDataTransformer";

export async function fetchRedditSaves(accessToken,username) {
        const limit = 25; // Default limit is 25
        const sort = 'new'; // Default sort order is 'new'
        const after = null; // To fetch results after a specific item
        const before = null; // To fetch results before a specific item
    const queryParams = new URLSearchParams({
        limit: limit.toString(),
        sort,
        after,
        before,
    });
    
    const apiUrl = `${process.env.REDDIT_API_URL}/user/${username}/saved?${queryParams}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            console.log(response.data);
        }

        const data = await response.json();
        
        return transformPosts(data.data.children);; // Contains the saved posts data
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}