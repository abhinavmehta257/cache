import { fetchPocketSaves } from "@/utils/getSaves";

export default async function handler(req, res) {
    const responce = await fetchPocketSaves("9577ce1d-14a6-ee32-e829-fd3244");
    console.log(responce);
}