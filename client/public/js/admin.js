document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    

    // Add logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', function() {
        
        window.location.href = '../index.html';
    });

    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const tableBody = document.querySelector('#paymentTable tbody');
    const actionColumn = document.querySelector('.action-column');
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const searchBar = document.getElementById('searchBar');
    
    // Load saved student data from localStorage
    let rowData = [];
    
    // Initialize globalBills if it doesn't exist
    
    
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
    <td>
        <input type="text" class="form-control name-input"
            value="${row.name || ''}"
            onchange="updateRowData(${idx}, 'name', this.value)">
    </td>

    <td>
        <input type="text" class="form-control id-input"
            value="${row.id || ''}"
            onchange="updateRowData(${idx}, 'id', this.value)">
    </td>

    <td>
    <select class="form-control yearlevel-input"
        onchange="updateRowData(${idx}, 'yearLevel', this.value)">

        <option value="">Select Year Level</option>

        <option value="2nd Year"
            ${row.yearLevel === '2nd Year' ? 'selected' : ''}>
            2nd Year
        </option>

        <option value="3rd Year"
            ${row.yearLevel === '3rd Year' ? 'selected' : ''}>
            3rd Year
        </option>

        <option value="4th Year"
            ${row.yearLevel === '4th Year' ? 'selected' : ''}>
            4th Year
        </option>

    </select>
</td>

    <td class="text-center">
        <button class="btn btn-success btn-sm me-1"
            onclick="event.stopPropagation(); addRowAfter(${idx})">
            <i class="fas fa-plus"></i>
        </button>

        <button class="btn btn-danger btn-sm"
            onclick="event.stopPropagation(); removeRow(${idx})">
            <i class="fas fa-trash"></i>
        </button>
    </td>
`;
            } else {
                tr.innerHTML = `
                    <td>${row.name}</td>
                    <td>${row.id}</td>
                    <td>${row.yearLevel || ''}</td>
                `;
            }

            if (idx === selectedRowIndex) {
                tr.classList.add('selected-row');
            }

            tableBody.appendChild(tr);
        });

        // Save to localStorage after each render
        
        
        // Reapply search filter after rendering
        filterRows(searchTerm);
    }

    // Add event listener for Manage Bills button
    document.querySelector('.btn-success').addEventListener('click', function() {
        // Clear any previously selected student
        
        // Store that we're viewing all bills
        
    });

    // Modify selectRow function
    function selectRow(tr, idx) {
        if (!isEditMode) {
            const studentData = rowData[idx];
            
            
            window.location.href = 'paymentdetailsedit.html';
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
         // Save after update
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
                const matches = studentId.startsWith(searchTerm.toLowerCase());
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
        // Hide search bar when editing
        searchBar.style.display = 'none';
        // Reapply search after entering edit mode
        filterRows(searchInput.value);
    });

    saveBtn.addEventListener('click', function() {
        isEditMode = false;
        selectedRowIndex = -1;
        
        // Filter out empty rows
        rowData = rowData.filter(row => row.name.trim() !== '' || row.id.trim() !== '');
        
        // Save to localStorage
        
        
        renderTable(false);
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
        // Show search bar when done editing
        searchBar.style.display = '';
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
        
        window.location.href = '../index.html';
    }
}