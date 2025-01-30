const express = require("express");
const {Router} = express
const router =Router()

router.get("/stk", async (req,res)=>{
    try {
        const token = await mpesaAccessToken()
        const url ="https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        const body ={    
            "BusinessShortCode": "174379",    
            "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",    
            "Timestamp":"20160216165627",    
            "TransactionType": "CustomerPayBillOnline",    
            "Amount": "1",    
            "PartyA":"254710148740",    
            "PartyB":"174379",    
            "PhoneNumber":"254710148740",    
            "CallBackURL": "https://connectease-backend-eeda.onrender.com/api/mpesa/stk",    
            "AccountReference":"Test",    
            "TransactionDesc":"Test"
         }
         const options  ={
            method:"POST",
            headers:{"content-Type":"application/json",Authorization:`Bearer ${token.access_token}`},
            body: JSON.stringify(body)
         };
         const response = fetch (url,options)
         const data = await(response).json()

         console.log(req.body)
         return res.status(200).json(req.body)

         
    } catch (error) {
       res.status(500).json({message:error})
    }
})
module.exports = route