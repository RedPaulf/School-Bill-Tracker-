document.addEventListener('DOMContentLoaded', function() {
    const currentStudent = JSON.parse(sessionStorage.getItem('currentStudent') || '{}');
    document.getElementById('studentName').textContent = currentStudent.name || '';
    
    function renderBills() {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = '';

        const bills = JSON.parse(localStorage.getItem('globalBills') || '[]');
        const studentBills = bills.filter(bill => bill.forAllStudents === true);

        // Get student-specific statuses (set by admin)
        const studentStatuses = JSON.parse(localStorage.getItem(`billStatuses_${currentStudent.id}`) || '{}');

        studentBills.forEach((bill) => {
            // Skip bills with invalid amount
            if (typeof bill.amount !== 'number' || isNaN(bill.amount)) return;

            const row = document.createElement('tr');
            // Use the status as set by admin, default to 'pending'
            let status = studentStatuses[bill.billId] || 'pending';

            row.innerHTML = `
                <td>${bill.name}</td>
                <td>₱${bill.amount.toFixed(2)}</td>
                <td>${new Date(bill.dueDate).toLocaleDateString()}</td>
                <td>
                    <span class="badge status-${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderBills();
    window.addEventListener('storage', renderBills);
});