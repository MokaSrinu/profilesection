async function register(){
    try {
        registerdata={
            "name":document.querySelector("#name").value,
            "email":document.querySelector("#email").value,
            "password":document.querySelector("#password").value,
            "username":document.querySelector("#username").value,
            "mobile":document.querySelector("#mobile").value,
            "description":document.querySelector("#description").value,
        }
        console.log(registerdata);
        let response=await fetch(
            `http://masai-api-mocker.herokuapp.com/auth/register`,
        {
            method: "POST",
            body: JSON.stringify(registerdata),
            headers:{
               "Content-Type": "application/json"
            }
        });
        let data= await response.json();
        console.log(data);
        
    } catch (error) {
        console.log(error);
    }
}

async function login(){
    try {
        logindata={
            "username":document.querySelector("#loginusername").value,
            "password":document.querySelector("#loginpassword").value,
        }
        console.log(logindata);
        let response=await fetch(
            `http://masai-api-mocker.herokuapp.com/auth/login`,
        {
            method: "POST",
            body: JSON.stringify(logindata),
            headers:{
               "Content-Type": "application/json"
            }
        });
        let data= await response.json();
        console.log(data);
        displaydata(logindata.username,data.token);
        
    } catch (error) {
        console.log(error);
    }
}
async function displaydata(username,token){
  try {
      let res=await fetch(`http://masai-api-mocker.herokuapp.com/user/${username}`,{
          method: "GET",
          headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${token}`
          }
      });
      let response=await res.json();
      console.log(response);
      displayprofile(response);
  } catch (error) {
     console.log(error); 
  }
}

/* 

description: "my name is max"
​
email: "max@gmail.com"
​
mobile: "123"
​
name: "max"
​
token: "1b639779076cf65d76cc5bca05cf6736"
​
username: "maxxx"



*/
function displayprofile(data){
    document.querySelector("#profilesection").innerHTML="";
    let card=document.createElement("div");
    let {name,email,token,username,mobile,description}=data;
    let h1=document.createElement("h1");
    h1.innerText="Profile Section";
    let Name=document.createElement("p");
    Name.textContent=`Name:${name}`;
    let Email=document.createElement("p");
    Email.textContent=`Email:${email}`;
    let Token=document.createElement("p");
    Token.textContent=`Token:${token}`;
    let Username=document.createElement("p");
    Username.textContent=`Username:${username}`;
    let Mobile=document.createElement("p");
    Mobile.textContent=`Mobile:${mobile}`;
    let Description=document.createElement("p");
    Description.textContent=`Description:${description}`;
    card.append(h1,Name,Email,Token,Username,Mobile,Description);
    document.querySelector("#profilesection").append(card);
}