import React from "react";
import styles from "./style.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/config/redux/reducer/authReducer";

function NavbarComponent() {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const handleLogout = ()=>{
    localStorage.removeItem("token");
    router.push('/login')
    dispatch(reset());
  } 

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        <h1
          onClick={() => {
            router.push("/");
          }}
        >
          Pro Connect
        </h1>

        <div className={styles.navBarOptionContainer}>
          {authState.profileFetched && <div>
              <div style={{display:"flex", gap : "1.2rem"}}>
              <p onClick={()=>{router.push("/profile")}} style={{fontWeight : "bold", cursor : "pointer"}}>Profile</p>
              <p onClick={()=>handleLogout()} style={{fontWeight : "bold", cursor : "pointer"}}>Logout</p>
              </div>
            </div>}
            

          {!authState.profileFetched && (
            <div
              onClick={() => {
                router.push("/login");
              }}
              className={styles.buttonJoin}
            >
              <p>Be a Part</p>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavbarComponent;
