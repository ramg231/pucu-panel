import { createContext, useState, useContext,useEffect } from "react";
import { registerRequest, loginRequest,verityTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
  };
  
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors,setErrors] = useState([])
  const [loading,setLoading] = useState(true)

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
        
      setErrors(error.response.data);
    }
  }

  const signin = async (user) => {
    try {
      const res = await loginRequest (user)
      setIsAuthenticated(true);
      setUser(res.data)
    } catch (error) {
      if(Array.isArray(error.response.data)){
        return setErrors(error.response.data)
      }
      setErrors([error.response.data.message])
  }
}
useEffect(()=>{
if(errors.length>0){
 const timer =  setTimeout(()=>{
    setErrors([])
  },3000 )
  return () => clearTimeout(timer)
}
},[errors])

const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
}

useEffect(() => {
   async function checkLogin ()  {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false)
        return setUser(null)
      }
        try {
            const res = await verityTokenRequest(cookies.token)
            if(!res.data){ 
            setIsAuthenticated(false)
            setLoading(false)
            return ;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false)
        } catch (error) {
            console.log(error)
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
        }
    }
    checkLogin();





},[]);
  return (
    <AuthContext.Provider
      value={{
        signin,
        signup,
        logout,
        loading,
        user,
        isAuthenticated,
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;