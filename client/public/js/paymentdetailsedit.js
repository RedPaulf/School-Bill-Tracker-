document.addEventListener('DOMContentLoaded', function() {
    const currentStudent = JSON.parse(localStorage.getItem('currentStudent') || '{}');
    document.getElementById('studentName').textContent = currentStudent.name || '';
    
    function renderBills() {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = '';

        const bills = JSON.parse(localStorage.getItem('globalBills') || '[]');
        const studentBills = bills.filter(bill => bill.forAllStudents === true);

        // Get student-specific statuses
        const studentStatuses = JSON.parse(localStorage.getItem(`billStatuses_${currentStudent.id}`) || '{}');
        let statusesChanged = false;

        studentBills.forEach((bill) => {
            // Skip bills with invalid amount
            if (typeof bill.amount !== 'number' || isNaN(bill.amount)) return;

            const row = document.createElement('tr');
            let status = studentStatuses[bill.billId] || 'pending';

            // Check if due date is passed and status is not paid
            const dueDate = new Date(bill.dueDate);
            const now = new Date();
            if (status !== 'paid' && dueDate <= now) {
                status = 'overdue';
                studentStatuses[bill.billId] = 'overdue';
                statusesChanged = true;
            }

            row.innerHTML = `
                <td>${bill.name}</td>
                <td>₱${bill.amount.toFixed(2)}</td>
                <td>${new Date(bill.dueDate).toLocaleDateString()}</td>
                <td>
                    <select class="form-select status-select" data-bill-id="${bill.billId}">
                        <option value="paid" ${status === 'paid' ? 'selected' : ''}>Paid</option>
                        <option value="pending" ${status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="overdue" ${status === 'overdue' ? 'selected' : ''}>Overdue</option>
                    </select>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Save updated statuses if any were changed
        if (statusesChanged) {
            localStorage.setItem(`billStatuses_${currentStudent.id}`, JSON.stringify(studentStatuses));
        }

        // Add event listeners to status selects
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', function() {
                const billId = this.dataset.billId;
                const statuses = JSON.parse(localStorage.getItem(`billStatuses_${currentStudent.id}`) || '{}');
                statuses[billId] = this.value;
                localStorage.setItem(`billStatuses_${currentStudent.id}`, JSON.stringify(statuses));
                updateSelectStyle(this);
            });
            updateSelectStyle(select);
        });
    }

    function updateSelectStyle(select) {
        select.className = 'form-select status-select';
        select.classList.add(`status-${select.value}`);
    }

    renderBills();
    window.addEventListener('storage', renderBills);

    const studentList = JSON.parse(localStorage.getItem('studentList') || '[]');
    // Use studentList to render the table  
});