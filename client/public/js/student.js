import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get student ID from URL
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('studentId');

// Reference to the student's bills in the database
const billsRef = ref(db, `students/${studentId}/bills`);

// Function to display bills
onValue(billsRef, (snapshot) => {
    const billsTable = document.getElementById('billsTable');
    billsTable.innerHTML = ''; // Clear existing table data

    snapshot.forEach((childSnapshot) => {
        const bill = childSnapshot.val();
        const row = billsTable.insertRow();

        const descriptionCell = row.insertCell(0);
        const amountCell = row.insertCell(1);
        const dueDateCell = row.insertCell(2);
        const statusCell = row.insertCell(3);

        descriptionCell.textContent = bill.description;
        amountCell.textContent = bill.amount;
        dueDateCell.textContent = bill.dueDate;
        statusCell.textContent = bill.status;
    });
});

