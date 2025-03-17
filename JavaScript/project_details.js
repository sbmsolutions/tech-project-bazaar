// Get the project ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

console.log("Project ID:", projectId); // Check if ID is correctly received

// Now, fetch project details from Firebase using this ID
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAghIMQu-4uzN_Bh024AmNbBnnm1cSpaco",
    authDomain: "prepwise-bb055.firebaseapp.com",
    projectId: "prepwise-bb055",
    storageBucket: "prepwise-bb055.appspot.com",
    messagingSenderId: "529962612183",
    appId: "1:529962612183:web:05197f67975a1b59d2c792",
    measurementId: "G-08LNDHFMMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchProjectDetails() {
    if (!projectId) {
        console.error("Project ID not found in URL!");
        return;
    }

    const docRef = doc(db, "Projects", projectId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById("project-title").textContent = data.ProjectName;
        document.getElementById("project-description").textContent = data.ProjectDescription;
        document.getElementById("project-image").src = data.ProjectImage;
    } else {
        console.error("No such project found!");
    }
}

// Fetch project details on page load
window.onload = fetchProjectDetails;
