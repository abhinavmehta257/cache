import { fetchPocketSaves } from "@/utils/getSaves";

export default async function handler(req, res) {
    const youtube = google.youtube('v3');
    const response = await youtube.playlistItems.list({
      auth: oauth2Client,
      part: 'snippet',
      playlistId: 'WL', // Watch Later Playlist
    });
    console.log(response.data);
}