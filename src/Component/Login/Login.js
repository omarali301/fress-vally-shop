import React, { useContext, useState } from 'react';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css'


const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const[user,setUser] = useState({
    isSignIn: false,
    Name : '',
    email : '',
    password : '',
    photo : '',

  });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    const provider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleSignIn = ()=>{
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    const {displayName, email} = result.user;
   const signedInUser = {name:displayName, email}
    setLoggedInUser(signedInUser);
    // storAuthToken();
    history.replace(from)
  })
  
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);
  });
    }

    const handleBlur =(e) =>{
      // debugger;
      let isFieldValid = true;
      if(e.target.name === "email"){
         isFieldValid  = /\S+@\S+\.\S+/.test(e.target.value);    
      }
      if(e.target.name === 'password'){
    
       const isPasswordValid = e.target.value.length > 6;
       const isPasswordHasNumbers =  /\d{1}/.test(e.target.value);
    
        isFieldValid =isPasswordHasNumbers && isPasswordValid;
      }
    
      if(isFieldValid){
    
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
      }
    }


    
const handleSubmit =(e)=>{

  if(newUser && user.email && user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((res) => {
      const newUserInfo = {...user};
      newUserInfo.error = '';
      newUserInfo.success = true;
      setUser(newUserInfo);
  
      userUpdateName(user.name);
      
    })
    .catch(error => {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
    });
  }
  
  if(!newUser && user.email && user.password){
  
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
     
      const newUserInfo = {...user};
      newUserInfo.error = '';
      newUserInfo.success = true;
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo);
      
      history.replace(from);
      // console.log('signIn user Info' , res.user)
    })
    .catch((error) => {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
    });
  
  }
  
  const userUpdateName = name => {
  
  const user = firebase.auth().currentUser;
  
  user.updateProfile({
    displayName: name,
    
  }).then(function() {
    console.log('name update successfully')
  }).catch(function(error) {
    console.log(error)
  });
  }
  e.preventDefault();
  }
    

  // const storAuthToken = () => {

  //   firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
  //   .then(function(idToken) {
  //     sessionStorage.setItem('token', idToken)
  //   }).catch(function(error) {
  //     // Handle error
  //   });
  // }
    return (
        <div className="container">
        

  
   {
     user.isSignIn && <div><p> Welcom {user.name}</p>
     
     <p>user email : {user.email}</p>
     <p>user Name : {user.displayName}</p>

     <img src={user.photo} alt=""/>
     
     </div>
   }
     
   
     <input type="checkbox" onChange={()=> setNewUser(!newUser)}  name="newUser" id=""/>
     <label htmlFor="newUser">new User signUP</label>

     <form onSubmit={handleSubmit}> 
      
     {newUser && <input type="text" name ="name" onBlur={handleBlur}  placeholder="user name" required/>}
     <br/>
       <input type="text" name ="email" onBlur={handleBlur}  placeholder="please add email" required/><br/>
       <input type="password" name = "password" onBlur={handleBlur}  placeholder="please add email" required/>
        <br/>
       <input type="submit" value={newUser ? 'signUP' : 'signIn'}/>
     </form>
     <p style={{color:'red'}}> {user.error}</p>
     {
       user.success &&  <p style={{color:'green'}}> Account {newUser ? 'created' : 'logged In'} successfully </p>
     }

            <button onClick={handleGoogleSignIn}>Sign in  google</button>
        </div>
    );
};

export default Login;