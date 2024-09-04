export async function saveRedditToken(token,refresh_token,token_expires_at,reddit_name,services_id,auth_token){
    const data = {
        "access_token": token,
        "refresh_token": "",
        "token_expires_at": 0,
        "user_name": reddit_name,
        "services_id": null
      };
    const response = await fetch(`${process.env.XANO_API_BASE_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    
}

export async function getRedditToken(userId = '14471e3e-1529-4819-b315-28e4cc4dd115'){
    const {reddit_token,reddit_name} = await fetch(`${process.env.XANO_API_BASE_URL}/users/${userId}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
    return {reddit_token,reddit_name};
}