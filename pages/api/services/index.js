import { URLSearchParams } from 'url';
import cookie from 'cookie';

export default async function handler(req, res) {
     // Parse cookies
    const cookies = cookie.parse(req.headers.cookie || '');
    const authToken = cookies.authToken; // Assuming the token is stored in a cookie named 'token'
    console.log(authToken);
    if (!authToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const services = await fetch(`${process.env.NEXT_PUBLIC_XANO_AUTH_API_BASE_URL}/api:G4709Pzi/services`,{
        headers:{
            'Authorization':`${authToken}`
        }
    })
    .then(response => {return response.json()})
    .catch(err=>console.log(err))
    console.log(services);
    
    res.json(services);
}


