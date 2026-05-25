document.addEventListener('DOMContentLoaded', function() {
    const currentStudent = { id: "temp", name: "Student" };
    document.getElementById('studentName').textContent = currentStudent.name || '';
    
    function renderBills() {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = '';

        const bills = [];
        const studentBills = bills.filter(bill => bill.forAllStudents === true);

        // Get student-specific statuses
        const studentStatuses = {};
        let statusesChanged = false;
       

        studentBills.forEach((bill) => {
            // Skip bills with invalid amount
            if (typeof bill.amount !== 'number' || isNaN(bill.amount)) return;

            const row = document.createElement('tr');
            let status = 'pending';

            // Check if due date is passed and status is not paid
            const dueDate = new Date(bill.dueDate);
            const now = new Date();
            if (status !== 'paid' && dueDate <= now) {
                status = 'overdue';
                // backend will handle overdue updates
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
       

        // Add event listeners to status selects
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', function() {
                const billId = this.dataset.billId;
                // value will be sent to backend later
                const newStatus = this.value;
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

    // backend will handle student list later
    // Use studentList to render the table  
});