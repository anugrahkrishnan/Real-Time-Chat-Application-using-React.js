import React,{useRef,useEffect,useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {ChatEngine} from "react-chat-engine";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../contexts/AuthContexts";
import axios from "axios";

const Chats = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [loading,setLoading]=useState(true);

    const handleLogout = async() => {
        await signOut(auth);
        history.push('/');
    }

    const getFile = async(url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data],"userPhoto.jpg",{type:'image/jpeg'})
    }

    useEffect(()=>{
        if(!user)
        {
            history.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers:{
                "project-id" : process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name" : user.email,
                "user-secret" : user.uid,
            }
        })

        .then(()=>{
            setLoading(false);
        })

        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email',user.email);
            formdata.append('username',user.email);
            formdata.append('secret',user.uid);

            getFile(user.photoURL)
                .then((avatar)=>{
                    formdata.append('avatar',avatar,avatar.name);

                    axios.post('https://api.chatengine.io/users',formdata,{
                        headers:{
                            "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY
                        }})

                    .then(()=>setLoading(false))
                    .catch((error)=>console.log(error))
                })
        
    })
    },[user,history])

    if(!user || loading) return 'loading...';

    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div onClick = {handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine height = "calc(100vh-60px)" projectID = {process.env.REACT_APP_CHAT_ENGINE_ID} userName = {user.email} userSecret = {user.uid} />
            
        </div>
        
    );
}

export default Chats;