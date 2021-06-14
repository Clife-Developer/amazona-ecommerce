const sgMail=require('@sendgrid/mail')

//letting sendgrind know we wanna use the sendgridAPIKey above
sgMail.setApiKey(process.env.sendgridAPIKey)

//welcoming Email
const SendWelcomingEmail=(email, name)=>{
  
        sgMail.send(
        {
            to:email,
            from:process.env.AdminEmail,
            subject:"Welcoming Email",
            text:`
            Hello ${name} 


            Welcome to Clife's store, one of the most trusted online stores
            Should you have any queries, please contact us on ${email}
            
            Enjoy your shopping!!` 
        }
    )
}

const orderEmail=(email)=>{
   
    
        sgMail.send(
        {
            to:email,
            from:process.env.AdminEmail,
            subject:"Order Email",
            text:`
            Hello
            
            
            Your order has been successfully placed.
            
            For any questions, please contact us on ${email}

            Enjoy!
            Clife's Store`
            
         
        }
    )
}


module.exports={
    SendWelcomingEmail,
    orderEmail
}