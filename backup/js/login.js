document.addEventListener('DOMContentLoaded', function () {
    // Handle login logic
    function login() {
        const studentIdInput = document.getElementById('studentId');
        const passwordInput = document.getElementById('adminPassword');

        if (!studentIdInput || !passwordInput) {
            alert("Login fields not found.");
            return;
        }

        const id = studentIdInput.value.trim();
        const password = passwordInput.value.trim();

        // Check for admin login
        if (id === 'admin' && password === 'admin') {
            sessionStorage.setItem('userRole', 'admin');
            window.location.href = 'admin.html';
            return;
        }

        // Check for student login
        const studentList = JSON.parse(localStorage.getItem('studentList') || '[]');
        const student = studentList.find(s => s.id === id);
        
        if (student && password === 'ubian2022') { // Add password check for students
            // Store student info in session
            sessionStorage.setItem('userRole', 'student');
            sessionStorage.setItem('currentStudent', JSON.stringify(student));
            window.location.href = 'admin_p2.html';
        } else {
            alert('Invalid student ID or password. Please try again.');
            passwordInput.value = '';
        }
    }

    // Form submission handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            login();
        });
    }

    // Password visibility toggle
    const toggleBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('adminPassword');
    const toggleIcon = document.getElementById('toggleIcon');

    if (toggleBtn && passwordInput && toggleIcon) {
        toggleBtn.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
                this.setAttribute('aria-label', 'Hide password');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
                this.setAttribute('aria-label', 'Show password');
            }
        });
    }
});
