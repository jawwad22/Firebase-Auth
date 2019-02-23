

//listen for auth status changed
auth.onAuthStateChanged(user=>{
if(user){
    //get data
db.collection('guides').get().then(snapshot=>{
    setupGuides(snapshot.docs);
    setupUI();
    
    })
    console.log('user logged in')
}
else {
    setupGuides([])
    setupUI();
    
    console.log('user logged out')
}
})

//signup
const signupForm=document.querySelector('#signup-form');

signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    //get user info
    const email =signupForm['signup-email'].value;
    const password =signupForm['signup-password'].value;

    //sign up user
auth.createUserWithEmailAndPassword(email,password).then(cred =>{
    // console.log(cred.user)
    const modal=document.querySelector('#modal-signup')
    M.Modal.getInstance(modal).close()
    signupForm.reset()
 });
});
//login 
const loginForm=document.querySelector('#login-form');
loginForm.addEventListener('submit',(e)=>{
e.preventDefault();

const email=loginForm['login-email'].value;
const password=loginForm['login-password'].value;
auth.signInWithEmailAndPassword(email,password).then(cred =>{
console.log(cred.user)
M.Modal.getInstance(modal).close()
loginForm.reset();
})
})
//logout
const logout =document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        console.log('User Logout')
    })
})