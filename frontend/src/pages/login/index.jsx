import React, { useEffect, useState } from "react";
import UserLayout from "../layout/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import { loginUser, registerUser } from "@/config/redux/action/authAction";
import { emptyMessage} from "@/config/redux/reducer/authReducer";

function Login() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [userLoginMethod, setUserLoginMethod] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  
  useEffect(() => {
    if(authState.loggedIn) {
      router.push("/dashboard");
    }
  }, [authState.loggedIn]);
  
  useEffect(()=>{
    if(localStorage.getItem("token")){
      router.push("/dashboard")
    }
  })

  useEffect(()=>{
    dispatch(emptyMessage());
  }, [userLoginMethod])


  const handleRegister = () =>{
    console.log("registering...");
    dispatch(registerUser({username, name, email, password}))
  }
  
  const handleLonin = () =>{
    console.log("login...");
    dispatch(loginUser({email, password}));

  }


  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainer_left}>
            <p className={styles.cardLeft_heading}>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
            <p style={{color : authState.isError ? "red" : "green"}}>{authState.message.message}</p>

            <div className={styles.inputContainer}>
              {!userLoginMethod && <div className={styles.intputRow}>
                <input onChange={(e)=> setUsername(e.target.value)} className={styles.inputField} type="text" placeholder="Username" />
                <input onChange={(e)=> setName(e.target.value) }className={styles.inputField} type="text" placeholder="Name" />
              </div>}

              <input onChange={(e)=> setEmail(e.target.value) } className={styles.inputField} type="text" placeholder="Email" />
              <input onChange={(e)=> setPassword(e.target.value) } className={styles.inputField} type="text" placeholder="Password" />

            <div onClick={()=>{
              if(userLoginMethod){
               handleLonin();
              }else{
                handleRegister();
              }
            }
            } className={styles.buttonWithOutline}>
             <p> {userLoginMethod ? "Sign In" : "Sign Up"}</p>
              
            </div>
            </div>

          </div>

          <div className={styles.cardContainer_right}>
            
              {userLoginMethod ? <p>Don't Have an Account</p> : <p>Have an Account?</p>}
              <div onClick={()=>{
                setUserLoginMethod(!userLoginMethod)
            }
            } style={{color: "black", textAlign: "center"}} className={styles.buttonWithOutline}>
             <p> {userLoginMethod ? "Sign Up" : "Sign In"}</p>
              
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
