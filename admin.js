
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showBookings() {
  const bookingsDiv = document.getElementById("adminBookings");
  bookingsDiv.innerHTML = "";

  getDocs(collection(db, "bookings")).then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.className = "room";
      div.textContent = `${data.guestName} - ${data.roomType} (${new Date(data.timestamp).toLocaleString()})`;
      bookingsDiv.appendChild(div);
    });
  });
}

function adminLogin() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("adminPanel").style.display = "block";
      showBookings();
    })
    .catch(err => alert("Login failed: " + err.message));
}

function logout() {
  signOut(auth).then(() => {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("adminPanel").style.display = "none";
  });
}

onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    showBookings();
  }
});
