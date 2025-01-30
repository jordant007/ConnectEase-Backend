const mpesaAccessToken= async()=>{
    const consumerKey ="zebjsQGMptO9OK1U5rQR8nw9XHsIq8oXltw04heeo86LNaC8"
    const consumerSecret ="oMvveYUAcymQnRUkJxVhtrCcLSw05VTyONmF65hpdDLvLQDDZ6fsVSjA6n5sdLy0"

    const base64String = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")
    const url ="https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    const headers = new Headers()
    headers.set("Authorization", `Basic ${base64String}`)

     const response =  await fetch(url,{headers});
     const data = await  response.json();
      
    console.log(data)
}
mpesaAccessToken()
module.export ={mpesaAccessToken}

