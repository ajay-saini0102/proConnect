import React, { useEffect } from "react";
import UserLayout from "../layout/UserLayout";
import DashboardLayout from "../layout/DashboardLayout";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptConnection,
  getMyConnectionRequest,
} from "@/config/redux/action/authAction";
import { BASE_URL } from "@/config";
import { useRouter } from "next/router";

function MyConnection() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    dispatch(getMyConnectionRequest({ token: localStorage.getItem("token") }));
  }, []);

  useEffect(() => {
    if (authState.connectionRequest.length != 0) {
      console.log(authState.connectionRequest);
    }
  }, [authState.connectionRequest]);

  return (
    <UserLayout>
      <DashboardLayout>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <h2>My Connection</h2>

          {authState.connectionRequest.length == 0 && (
            <h1>No Connection Requset Pendding</h1>
          )}

          {authState.connectionRequest.length != 0 &&
            authState.connectionRequest
              .filter((connection) => connection.status_accepted === null)
              .map((user, index) => {
                return (
                  <div
                    onClick={() => {
                      router.push(`/view_profile/${user.userId.username}`);
                    }}
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

                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            acceptConnection({
                              token: localStorage.getItem("token"),
                              connectionId: user._id,
                              action: "accept",
                            })
                          );
                        }}
                        className={styles.connectButton}
                      >
                        Accept
                      </div>
                    </div>
                  </div>
                );
              })}

          <h2>My Network</h2>
          {console.log(authState)
          }
          {authState.connectionRequest
            .filter((connection) => connection.status_accepted !== null)
            .map((user, index) => {
              return (
                <div
                  onClick={() => {
                    router.push(`/view_profile/${user.userId.username}`);
                  }}
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
                  </div>
                </div>
              );
            })}
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}

export default MyConnection;
