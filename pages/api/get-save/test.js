import dbConnect from "@/pages/api/lib/connectDB";
import Chunk from "@/model/chunk";

export default async function handler(req, res) {
    await dbConnect();
    const { userId } = req.query;
    try {
        const chunks = await Chunk.find({ userid: userId }).limit(10);
        res.status(200).json({ chunks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
