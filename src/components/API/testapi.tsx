import { API } from "./api";

export function testAPI() {
    new API();
    
    API.instance.signIn("t1@t.com", "12345678")
    .then((data)=> API.instance.getUser(data.userId))
    .then((data) => {console.log(data); return data})
    .then((data) => API.instance.updateUser(data.id, data.email, "12345678"))    
    .then((data) => API.instance.createUserWord(data.id, '5e9f5ee35eb9e72bc21af4a0',{difficulty: "hard"}))
    //.then((data)=> API.instance.getUserWords(data.id))
    //API.instance.createUser({name:"test1", email: "t8@t.com", password: "12345678"})
    .then((data) => {console.log(data); return data})
    .catch((e)=> {console.log(e.message);})
    //console.log(JSON.stringify({ name: "name", email: "email", password: "password" }) );
  }  
  //createUser("test1", "t1@t.com", "12345678")
  // {id: '5e9f5ee35eb9e72bc21af4a0', group: 0, page: 0, word: 'alcohol
  //{id: '62ff6bcfcc435732dceada8b', difficulty: 'hard', wordId: '5e9f5ee35eb9e72bc21af4a0'}

  
