import axios from 'axios';
const headerConfig = {
    headers:{
        token: localStorage.getItem('token')
    }
}
export const createBoard=(obj)=>{
    let responce= axios.post("http://localhost:3003/api/v1/boards/newBoard",obj, headerConfig);
    return responce;
}
