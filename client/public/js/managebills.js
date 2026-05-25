document.addEventListener('DOMContentLoaded', function() {
    const billsTableBody = document.getElementById('billsTableBody');
    const saveBillBtn = document.getElementById('saveBillBtn');
    const saveEditBillBtn = document.getElementById('saveEditBillBtn');
    
    let selectedRow = null;

    function loadBills() {
        const studentCount = 0;
        const bills = [];
        billsTableBody.innerHTML = '';
        
        bills.forEach((bill, index) => {
            // Skip bills with invalid amount
            if (typeof bill.amount !== 'number' || isNaN(bill.amount)) return;

            const row = document.createElement('tr');
            const expectedAmount = bill.amount * studentCount;

            let accumulatedAmount = 0;

            const students = [];

            students.forEach(student => {
                const statuses = {};

                if (statuses[bill.billId] === 'paid') {
                    accumulatedAmount += bill.amount;
                }
            });

            row.innerHTML = `
                <td>${bill.name}</td>
                <td>₱${bill.amount.toFixed(2)}</td>
                <td>${new Date(bill.dueDate).toLocaleDateString()}</td>
                <td>₱${expectedAmount.toFixed(2)}</td>
                <td>₱${accumulatedAmount.toFixed(2)}</td>
            `;
            row.onclick = () => selectRow(row, index);
            billsTableBody.appendChild(row);
        });
    }
    function selectRow(row, index) {
    // remove previous selection
    if (selectedRow) {
        selectedRow.classList.remove('selected-row');
    }

    // set new selection
    row.classList.add('selected-row');
    selectedRow = row;
    selectedRow.dataset.index = index;
}

    window.editBill = function() {
        if (!selectedRow) {
            alert('Please select a bill to edit');
            return;
        }

        const bills = [];
        const index = parseInt(selectedRow.dataset.index);
        const bill = bills[index];

        document.getElementById('editBillIndex').value = index;
        document.getElementById('editBillName').value = bill.name;
        document.getElementById('editBillAmount').value = bill.amount;
        document.getElementById('editDueDate').value = bill.dueDate;

        new bootstrap.Modal(document.getElementById('editBillModal')).show();
    };

    window.deleteBill = function() {
        if (!selectedRow) {
            alert('Please select a bill to delete');
            return;
        }

        if (confirm('Are you sure you want to delete this bill?')) {
            const bills = [];
            const index = parseInt(selectedRow.dataset.index);
            bills.splice(index, 1);
            
            loadBills();
            selectedRow = null;
        }
    };

    saveBillBtn.addEventListener('click', function() {
        const billName = document.getElementById('billName').value.trim();
        const billAmount = parseFloat(document.getElementById('billAmount').value);
        const dueDate = document.getElementById('dueDate').value;

        if (!billName || isNaN(billAmount) || !dueDate) {
            alert('Please fill in all fields with valid values.');
            return;
        }

        const bills = [];
        bills.push({
            name: billName,
            amount: billAmount,
            dueDate: dueDate,
            forAllStudents: true,
            billId: Date.now()
        });

        
        bootstrap.Modal.getInstance(document.getElementById('addBillModal')).hide();
        document.getElementById('newBillForm').reset();
        loadBills();
    });

    saveEditBillBtn.addEventListener('click', function() {
        const index = parseInt(document.getElementById('editBillIndex').value);
        const bills = [];
        const originalBill = bills[index];

        bills[index] = {
            name: document.getElementById('editBillName').value,
            amount: parseFloat(document.getElementById('editBillAmount').value),
            dueDate: document.getElementById('editDueDate').value,
            // Preserve these properties:
            forAllStudents: originalBill.forAllStudents,
            billId: originalBill.billId,
            status: originalBill.status || 'pending'
        };

        
        bootstrap.Modal.getInstance(document.getElementById('editBillModal')).hide();
        loadBills();
        selectedRow = null;
    });

    // Initial load
    loadBills();
});