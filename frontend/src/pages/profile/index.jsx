import { BASE_URL, clintServer } from "@/config";
import React, { useEffect, useReducer, useState } from "react";
import UserLayout from "../layout/UserLayout";
import DashboardLayout from "../layout/DashboardLayout";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getAboutUser } from "@/config/redux/action/authAction";
import { getAllPosts } from "@/config/redux/action/postAction";

function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const postReducer = useSelector((state) => state.postReducer);

  const [userProfile, setUserProfile] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [userPosts, setUserPosts] = useState({});

  const [inputData, setInputData] = useState({company : '', positon : '', years  : ''});
  const [inputEduData, setInputEduData] = useState({school : '', degree : '', fieldOfStudy  : ''});
  

  const handleWorkInputData = (e)=>{
    const {name, value} = e.target;
    setInputData({...inputData, [name]: value});
  }
  const handleEducationInputData = (e)=>{
    const {name, value} = e.target;
    setInputEduData({...inputEduData, [name]: value});
  }

  useEffect(() => {
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    dispatch(getAllPosts());
  }, [authState.isToken]);

  useEffect(() => {
    if (authState.user != undefined) {
      setUserProfile(authState.user);
      let post = postReducer.posts.filter((post) => {
        return post.userId.username == authState.user.userId.username;
      });
      setUserPosts(post);
    }
  }, [authState.user, postReducer.posts]);


  const uploadProfilePicture = async()=>{
    const formData = new FormData();
    formData.append("profile_picture", file[0]);
    formData.append('token', localStorage.getItem('token'));


    const response = await clintServer.post("/update_profile_picture", formData, {
      headers : {
        "Content-Type" : "multipart/form-data",
      },
    })
    dispatch(getAboutUser({token : localStorage.getItem("token")}))
  }

  const updateProfileData = async()=>{
    const requset = await clintServer.post("/user_update", {
      token : localStorage.getItem("token"),
      name : userProfile.userId.name
    })

    const response = await clintServer.post("/update_profile_data", {
      token : localStorage.getItem("token"),
      bio : userProfile.bio,
      currentPost : userProfile.currentPost,
      pastWork : userProfile.pastWork,
      education : userProfile.education
    })

    dispatch(getAboutUser({token : localStorage.getItem("token")}))
  }


  return (
    <UserLayout>
      <DashboardLayout>
        {authState.user && userProfile.userId &&
          <div className={styles.container}>
            <div className={styles.backDropContainer}>
            <label htmlFor="profilePictureUpload" className={styles.backDrop_overlay}>
              <p>Edit</p>
            </label>
            <input onChange={(e)=>uploadProfilePicture(e.target.files[0])} type="file" id="profilePictureUpload" hidden/>
            <img
                src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
                alt=""
              />
            
            </div>
            <div className={styles.profileContainer_details}>
              <div style={{ display: "flex", gap: "0.7rem" }}>
                <div style={{ flex: "0.8" }}>
                  <div
                    style={{
                      display: "flex",
                      width: "fit-content",
                      alignItems: "center",
                      gap: "1.2rem",
                    }}
                  >
                    <input className={styles.nameEdit} value={userProfile.userId.name} type="text" onChange={(e)=>{setUserProfile({...userProfile, userId : {...userProfile.userId,name : e.target.value}})}} />
                    <p style={{ color: "gray" }}>
                      @{userProfile.userId.username}
                    </p>
                  </div>
                  <div>
                    <textarea 
                    value={userProfile.bio} 
                    onChange={(e)=>{setUserProfile({...userProfile, bio : e.target.value})}} 
                    rows={Math.max(3, Math.ceil(userProfile.bio.length / 80))} 
                    style={{width :"100%"}} ></textarea>
                  </div>
                </div>
                <div style={{ flex: "0.2" }}>
                  <h3>Recent Activity</h3>
                  {userPosts.map((post) => {
                    return (
                      <div key={post._id} className={styles.postCard}>
                        <div className={styles.card}>
                          <div className={styles.card_profileContainer}>
                            {post.media !== "" ? (
                              <img src={`${BASE_URL}/${post.media}`} />
                            ) : (
                              <div
                                style={{ width: "3.4rem", height: "3.4rem" }}
                              ></div>
                            )}
                          </div>

                          <p>{post.body}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.workHistory}>
              <h3>Work History</h3>
              <div className={styles.workHistoryContainre}>
                {userProfile.pastWork.map((work, idx) => {
                  return (
                    <div key={idx} className={styles.workHistoryCard}>
                      <p
                        style={{
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.8rem",
                        }}
                      >
                        {work.company} - {work.position}
                      </p>
                      <p>{work.years}</p>
                    </div>
                  );
                })}
                <button onClick={()=>setIsModalOpen(true)} className={styles.addWorkBtn}>Add Work</button>
              </div>
            </div>
            
            <div className={styles.educationHistory}>
                <h3> Education History</h3>
                <div className={styles.workHistoryContainre}>
                  {console.log(userProfile)}
                {userProfile.education.map((education, idx) => {
                  return (
                    <div key={idx} className={styles.workHistoryCard}>
                      <p
                        style={{
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.8rem",
                        }}
                      >
                        {education.school} - {education.degree}
                      </p>
                      <p>{education.fieldOfStudy}</p>
                    </div>
                  );
                })}
                <button onClick={()=>setIsEduModalOpen(true)} className={styles.addWorkBtn}>Add Education</button>
              </div>
            </div>



              {userProfile != authState.user && 
                <div onClick={()=>updateProfileData()} className={styles.updateProfileBtn}>
                  Update Profile
                </div>
              }
          </div>
        }
        {
            isModalOpen && 
            <div
              onClick={() => {
               setIsModalOpen(false)
              }}
              className={styles.commetsContainer}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={styles.allCommentsContaier}
              >
              <input onChange={handleWorkInputData} name='company' className={styles.inputField} type="text" placeholder="Enter Company" />
              <input onChange={handleWorkInputData} name='position' className={styles.inputField} type="text" placeholder="Enter Position" />
              <input onChange={handleWorkInputData} name='years' className={styles.inputField} type="number" placeholder="Years" />

              <div onClick={()=>{setUserProfile({...userProfile, pastWork: [...userProfile.pastWork, inputData]})
                setIsModalOpen(false)
              }} className={styles.updateProfileBtn}>Add Work</div> 

                
              </div>
            </div>
          }

          {
            isEduModalOpen && 
            <div
              onClick={() => {
               setIsEduModalOpen(false)
              }}
              className={styles.commetsContainer}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={styles.allCommentsContaier}
              >
              <input onChange={handleEducationInputData} name='school' className={styles.inputField} type="text" placeholder="Enter School" />
              <input onChange={handleEducationInputData} name='degree' className={styles.inputField} type="text" placeholder="Enter Degree" />
              <input onChange={handleEducationInputData} name='fieldOfStudy' className={styles.inputField} type="text" placeholder="Enter Field Of Study" />

              <div onClick={()=>{setUserProfile({...userProfile, education : [...userProfile.education, inputEduData]})
                setIsEduModalOpen(false)
              }} className={styles.updateProfileBtn}>Add Education</div> 

                
              </div>
            </div>
          }
      </DashboardLayout>
    </UserLayout>
  );
}

export default Profile;
