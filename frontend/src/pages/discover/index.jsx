import React, { useEffect } from "react";
import UserLayout from "../layout/UserLayout";
import DashboardLayout from "../layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "@/config/redux/action/authAction";
import styles from "./style.module.css";
import { BASE_URL } from "@/config";
import { useRouter } from "next/router";

function Discover() {
  const authState = useSelector((state) => state.auth);
  const route = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authState.all_user_fetched) {
      dispatch(getAllUser());
    }
  }, []);

  return (
    <UserLayout>
      <DashboardLayout>
        <div>
          <h2>Discover</h2>
          <div className={styles.allUserProfile}>
            {
              authState.all_profile_fetched && authState.all_profiles.map((profile, idx)=>{
                return(
                  <div key={profile._id} className={styles.profileCard}>
                    <img src={`${BASE_URL}/${profile.userId.profilePicture}`} alt="User's Profile Picture" />
                    <div onClick={()=>{
                      route.push(`/view_profile/${profile.userId.username}`)
                    }}>
                      <h2>{profile.userId.name}</h2>
                      <h3 style={{color:"grey"}}>{profile.userId.username}</h3>
                    </div>


                  </div>
                )
              })
            }
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}

export default Discover;
