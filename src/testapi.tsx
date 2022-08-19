import { API } from "./API/api";

export function testAPI() {
    new API();
    
    /*API.instance.signIn("t1@t.com", "12345678")
    .then((data)=> API.instance.getUser(data.userId))
    .then((data) => {console.log(data); return data})
    .then((data) => API.instance.updateUser(data.id, data.email, "12345678"))*/
    API.instance.createUser({name:"test1", email: "t8@t.com", password: "12345678"})
    .then((data) => {console.log(data); return data})
    .catch((e)=> {console.log(e.message);})
    //console.log(JSON.stringify({ name: "name", email: "email", password: "password" }) );
  }  
  //createUser("test1", "t1@t.com", "12345678")

  
