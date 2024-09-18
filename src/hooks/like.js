import {useState} from "react";
import axios from "axios";

/* 좋아요 처리 */
export function useLike(){
    const [like, setLike] = useState(0)
    function  addLike() {
        setLike(a => a +1)
    }
    return [like, addLike];
}

export function useUserName() {
    const [userName, setUserName] = useState('')
    axios.get('/username.json').then(e=> {
        setUserName( e.data )
    })
    return userName
}
