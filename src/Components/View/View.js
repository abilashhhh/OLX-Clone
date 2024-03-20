import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, query, where, getFirestore, getDocs } from "firebase/firestore";
import Footer from '../Footer/Footer';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    console.log('hai 1')
    const fetchData = async () => {
      if (!postDetails) return; //  postDetails should be available before fetching user data
      try {
        console.log('hai 2')

        // const db = firebase.firestore();  
        const db = getFirestore(firebase);

        const usersData = collection(db, "users");
        console.log('hai 1', usersData)
        const dataFound = query(usersData, where("id", "==", postDetails.userId));
        console.log('hai 1', dataFound)

        const snapshot = await getDocs(dataFound);
        snapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
        console.log('hai 1', snapshot)

        console.log("user details : ", userDetails)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <div className="viewParentDiv">
      <div className="imageShowDiv" >
      <h1>{postDetails.name}</h1>
        {postDetails.downloadURL && <img style={{ maxWidth: '500px', maxHeight: '500px' }} src={postDetails.downloadURL} alt="downloadURL" />}
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
      <hr />
    <div>
      <img style={{height: '700px' , width:'100%'}} />
    </div>
    </div>
      <div className="banner">
      <img style={{width:'100%'}}
        src="../../../Images/banner copy.png"
        alt=""
      />
    </div>
<Footer  />
    </div>
    
  );
}
export default View;
