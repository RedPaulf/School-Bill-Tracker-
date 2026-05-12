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

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in as student
    if (!sessionStorage.getItem('userRole') || sessionStorage.getItem('userRole') !== 'student') {
        window.location.href = 'login.html';
        return;
    }

    // Get current student data
    const currentStudent = JSON.parse(sessionStorage.getItem('currentStudent') || '{}');
    
    // Update the header with student name
    document.getElementById('studentName').textContent = currentStudent.name || '';
    
    const tableBody = document.querySelector('tbody');
    
    function renderBills() {
        const bills = JSON.parse(localStorage.getItem('globalBills') || '[]');
        tableBody.innerHTML = '';
        
        bills.forEach(bill => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bill.name}</td>
                <td>₱${bill.amount.toFixed(2)}</td>
                <td>${new Date(bill.dueDate).toLocaleDateString()}</td>
                <td>
                    <span class="badge ${getBadgeClass(bill.status)}">
                        ${bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </span>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function getBadgeClass(status) {
        switch(status) {
            case 'paid': return 'bg-success';
            case 'pending': return 'bg-warning';
            case 'overdue': return 'bg-danger';
            default: return 'bg-secondary';
        }
    }

    // Initial render
    renderBills();

    // Listen for storage changes
    window.addEventListener('storage', renderBills);

    // Add logout functionality with confirmation
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.removeItem('userRole');
            sessionStorage.removeItem('currentStudent');
            window.location.href = 'login.html';
        }
    });
});