

export const PostCall =async (URL,payload)=> {
    console.log("Got the call ", payload);
    
   return await fetch(URL,{
    method: 'POST', // Specify POST method
    headers: {
        'Content-Type': 'application/json', // Specify the content type
    },
    body: JSON.stringify(payload),
    mode:'cors' // Convert data to JSON string
});
};

 export const PostCallNoPayload =async (URL,auth)=> {

    return await fetch(URL,{
     method: 'POST', // Specify POST method
     headers: {
        'Authorization':auth,
         'Content-Type': 'application/json', // Specify the content type
     },
     mode:'cors' // Convert data to JSON string
 });
 };


 export const PostCallWithPayload =async (URL,auth,payload)=> {
console.log("In correct place");

  return await fetch(URL,{
   method: 'POST', // Specify POST method
   headers: {
      'Authorization':auth,
       'Content-Type': 'application/json', // Specify the content type
   },
   body: JSON.stringify(payload),
   mode:'cors' // Convert data to JSON string
});
};

export const DeleteCallWithPayload =async (URL,auth,payload)=> {
console.log("Deleting ", payload);

    return await fetch(URL,{
     method: 'DELETE', // Specify POST method
     headers: {
        'Authorization':auth,
         'Content-Type': 'application/json', // Specify the content type
     },
     body: JSON.stringify(payload),
     mode:'cors' // Convert data to JSON string
  });
  };
export const GetCall =async (URL,auth)=> {

    
    return await fetch(URL,{
     method: 'GET', 
     headers: {
        'Authorization':auth,
         'Content-Type': 'application/json', // Specify the content type
     },
     mode:'cors' // Convert data to JSON string
 });
 };

  export const ApproveRequest = async (email) => {
    return await fetch(`/api/registration-requests/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  };
  
  export const RejectRequest = async (email) => {
    return await fetch(`/api/registration-requests/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  };
  