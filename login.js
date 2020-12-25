var firebaseConfig = {
    apiKey: "AIzaSyCHt93tGa2VIVHVYp8ker8x0s6gBSYs_0Q",
    authDomain: "game-saver-51775.firebaseapp.com",
    projectId: "game-saver-51775",
    storageBucket: "game-saver-51775.appspot.com",
    messagingSenderId: "273195375991",
    appId: "1:273195375991:web:3bd4414a0a591f86e29572"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

// Event listeners
// Add login event
btnLogin.addEventListener("click",()=>{
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
})

// Add logout event
btnLogout.addEventListener("click", e => {
    firebase.auth().signOut();
})

// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser);
        btnLogout.style.display = 'block';
    }
    else{
        console.log("not logged in")
        btnLogout.style.display = 'none';
    }
})