document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!sessionStorage.getItem('userRole') || sessionStorage.getItem('userRole') !== 'admin') {
        window.location.href = 'login.html';
        return;
    }

    // Add logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('userRole');
        window.location.href = '../index.html';
    });

    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const tableBody = document.querySelector('#paymentTable tbody');
    const actionColumn = document.querySelector('.action-column');
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Load saved student data from localStorage
    let rowData = JSON.parse(localStorage.getItem('studentList') || '[]');
    
    // Initialize globalBills if it doesn't exist
    if (!localStorage.getItem('globalBills')) {
        const initialGlobalBills = [];
        localStorage.setItem('globalBills', JSON.stringify(initialGlobalBills));
    }
    
    let isEditMode = false;
    let selectedRowIndex = -1;

    function renderTable(editMode = false) {
        const searchTerm = searchInput.value;
        tableBody.innerHTML = '';
        actionColumn.style.display = editMode ? 'table-cell' : 'none';

        if (rowData.length === 0 && editMode) {
            rowData.push({ name: '', id: '' });
        }

        rowData.forEach((row, idx) => {
            const tr = document.createElement('tr');
            tr.onclick = () => selectRow(tr, idx);

            if (editMode) {
                tr.innerHTML = `
                    <td><input type="text" class="form-control name-input" value="${row.name || ''}" 
                        onchange="updateRowData(${idx}, 'name', this.value)"></td>
                    <td><input type="text" class="form-control id-input" value="${row.id || ''}"
                        onchange="updateRowData(${idx}, 'id', this.value)"></td>
                    <td class="text-center">
                        <button class="btn btn-success btn-sm me-1" onclick="event.stopPropagation(); addRowAfter(${idx})">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); removeRow(${idx})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
            } else {
                tr.innerHTML = `
                    <td>${row.name}</td>
                    <td>${row.id}</td>
                `;
            }

            if (idx === selectedRowIndex) {
                tr.classList.add('selected-row');
            }

            tableBody.appendChild(tr);
        });

        // Save to localStorage after each render
        localStorage.setItem('studentList', JSON.stringify(rowData));
        
        // Reapply search filter after rendering
        filterRows(searchTerm);
    }

    // Add event listener for Manage Bills button
    document.querySelector('.btn-success').addEventListener('click', function() {
        // Clear any previously selected student
        localStorage.removeItem('currentStudent');
        // Store that we're viewing all bills
        localStorage.setItem('viewMode', 'all');
    });

    // Modify selectRow function
    function selectRow(tr, idx) {
        if (!isEditMode) {
            const studentData = rowData[idx];
            localStorage.setItem('currentStudent', JSON.stringify(studentData));
            localStorage.setItem('viewMode', 'student');
            window.location.href = 'admin_p2.html';
            return;
        }

        document.querySelectorAll('#paymentTable tbody tr').forEach(row => {
            row.classList.remove('selected-row');
        });
        tr.classList.add('selected-row');
        selectedRowIndex = idx;
    }

    window.updateRowData = function(index, field, value) {
        rowData[index][field] = value;
        localStorage.setItem('studentList', JSON.stringify(rowData)); // Save after update
    };

    window.addRowAfter = function(index) {
        const currentValues = {};
        if (isEditMode) {
            const row = tableBody.querySelectorAll('tr')[index];
            currentValues.name = row.querySelector('.name-input').value;
            currentValues.id = row.querySelector('.id-input').value;
            rowData[index].name = currentValues.name;
            rowData[index].id = currentValues.id;
        }

        rowData.splice(index + 1, 0, { name: '', id: '' });
        renderTable(true);
    };

    window.removeRow = function(index) {
        if (rowData.length > 1) {
            rowData.splice(index, 1);
            selectedRowIndex = -1;
            renderTable(true);
        }
    };

    // Add search functionality
    function filterRows(searchTerm) {
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            if (!isEditMode) {
                const studentId = row.children[1].textContent.toLowerCase();
                const matches = studentId.includes(searchTerm.toLowerCase());
                row.style.display = matches ? '' : 'none';
            } else {
                const studentId = row.querySelector('.id-input').value.toLowerCase();
                const matches = studentId.includes(searchTerm.toLowerCase());
                row.style.display = matches ? '' : 'none';
            }
        });
    }

    // Search input event listener
    searchInput.addEventListener('input', function(e) {
        filterRows(e.target.value);
    });

    // Clear search button
    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        filterRows('');
    });

    editBtn.addEventListener('click', function() {
        isEditMode = true;
        if (rowData.length === 0) {
            rowData.push({ name: '', id: '' });
        }
        renderTable(true);
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
        // Reapply search after entering edit mode
        filterRows(searchInput.value);
    });

    saveBtn.addEventListener('click', function() {
        isEditMode = false;
        selectedRowIndex = -1;
        
        // Filter out empty rows
        rowData = rowData.filter(row => row.name.trim() !== '' || row.id.trim() !== '');
        
        // Save to localStorage
        localStorage.setItem('studentList', JSON.stringify(rowData));
        
        renderTable(false);
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
        // Reapply search after saving
        filterRows(searchInput.value);
    });

    // Initial render using saved data
    renderTable(false);
});

// Add this function after the DOMContentLoaded event listener
function goHome(event) {
    event.preventDefault();
    if (confirm('Going to home page will log you out. Do you want to continue?')) {
        sessionStorage.removeItem('userRole');
        window.location.href = '../index.html';
    }
}