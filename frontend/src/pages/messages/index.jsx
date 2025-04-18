import React, { useEffect, useState } from 'react'
import UserLayout from '../layout/UserLayout'
import DashboardLayout from '../layout/DashboardLayout'
import { connect, useDispatch, useSelector } from 'react-redux'
import styles from "./style.module.css"
import { resetPostId } from "@/config/redux/reducer/postReducer";
import { useRouter } from 'next/router'
import {getAboutUser, getMyConnectionRequest} from "@/config/redux/action/authAction";
import { BASE_URL, clintServer } from "@/config";





function Messages({ userProfile }) {

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const postState = useSelector((state) => state.postReducer);
  
  const [profile, setProfile] = useState()
  const [isModal, setIsModal] = useState(false)
  const [text, setText] = useState('')

    useEffect(() => {
      dispatch(getMyConnectionRequest({ token: localStorage.getItem("token") }));
    }, []);
  
    useEffect(() => {
      if (isModal) {
      dispatch(getAboutUser({token : localStorage.getItem("token")}))
      }
      
      
    }, [isModal]);


    const getUserFromUsername = async(user_name)=>{
      try{
        const response = await clintServer.get("/user/get_userProfile_by_username", {
          params:{
            username : user_name,
          }
        })
        await setProfile(response.data.Profile.userId);
        setIsModal(true)
        // console.log(profile);
        
        
      }catch(err){
        console.log(err);        
      }
    }

  return (
    <UserLayout>
      <DashboardLayout>
        


      <h2>My Connections</h2>
      {authState.connectionRequest
            .filter((connection) => connection.status_accepted !== null)
            .map((user, index) => {
              return (
                <div
                  // onClick={() => {
                  //   router.push(`/view_profile/${user.userId.username}`);
                  // }}
                  className={styles.userCard}
                  key={index}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className={styles.profilePicture}>
                      <img
                        src={`${BASE_URL}/${user.userId.profilePicture}`}
                        alt="userProfilePicture"
                      />
                    </div>
                    <div className={styles.userInfo}>
                      <h3>{user.userId.name}</h3>
                      <p>{user.userId.username}</p>
                    </div>
                    <button className={styles.chatBtn}
                      onClick={()=>{
                        getUserFromUsername(user.userId.username)
                        console.log(user.userId.username);
                        
                        
                      }}
                    >Message</button>
                  </div>
                </div>
              );
            })}

            
          {
            isModal && 
            <div
              onClick={() => {
                setIsModal(false)
                                
              }}
              className={styles.messageContainer}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={styles.chatContaier}
              >
                {/* {profile.username}
                {authState.user.userId.username} */}
                <div className={styles.chat_Container}>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write Something..."
                  />
                  <div
                    onClick={async () => {
                      
                    }}
                    className={styles.ChatBtn}
                  >
                    <p>Send</p>
                  </div>
                </div>
                
              </div>
            </div>
          }
      </DashboardLayout>
    </UserLayout>
  )
}





export default Messages
