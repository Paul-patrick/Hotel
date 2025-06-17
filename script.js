
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function bookRoom() {
  const name = document.getElementById("guestName").value;
  const type = document.getElementById("roomType").value;

  if (!name.trim()) {
    alert("Please enter guest name");
    return;
  }

  try {
    await addDoc(collection(db, "bookings"), {
      guestName: name,
      roomType: type,
      timestamp: new Date().toISOString()
    });
    alert(`Room booked for ${name}`);
    displayRooms();
  } catch (e) {
    alert("Error booking room: " + e);
  }
}

async function displayRooms() {
  const list = document.getElementById("roomsList");
  list.innerHTML = "<h3>Bookings:</h3>";

  const querySnapshot = await getDocs(collection(db, "bookings"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "room";
    div.textContent = `${data.guestName} - ${data.roomType}`;
    list.appendChild(div);
  });
}

window.onload = displayRooms;
