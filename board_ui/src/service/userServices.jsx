import axios from 'axios';
export const signIn=(obj)=>{
    let responce= axios.post("http://localhost:3003/api/v1/users/login",obj);
    return responce;
}
export const signUp=(obj)=>{
    let responce= axios.post("http://localhost:3003/api/v1/users/register",obj);
    return responce;
}