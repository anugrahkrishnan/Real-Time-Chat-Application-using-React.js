import React,{useContext,useEffect,useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { auth } from "../components/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [loading,setLoading] = useState(true);
    const [user,setUser] =useState(null);
    const history = useHistory();

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            setUser(user);
            setLoading(false);
            
            if(user) history.push('/chats');
        })
    },[user,history]);

    const value = {user};

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
