const sgMail=require('@sendgrid/mail')

const sendgridAPIKey='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';
//letting sendgrind know we wanna use the sendgridAPIKey above
sgMail.setApiKey(sendgridAPIKey)

//welcoming Email
const SendWelcomingEmail=(email, name)=>{
  
        sgMail.send(
        {
            to:email,
            from:"clife.united@gmail.com",
            subject:"Welcoming Email",
            text:`
            Hello ${name} 


            Welcome to Clife's store, one of the most trusted online stores
            Should you have any queries, please contact us on ${email}
            
            Enjoy your shopping!!` 
        }
    )
}

//Cancellation Email
// const SendCancellationEmail=(email, name)=>{
//     sgMail.send(
//         {
//             to:email,
//             from:"clife.united@gmail.com",
//             subject:"Cancellation Email",
//             text:`Dear ${name} you have successfully unsubscribed to the app` 
//         }
//     )
// }

const orderEmail=(email)=>{
   
    
        sgMail.send(
        {
            to:email,
            from:"clife.united@gmail.com",
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