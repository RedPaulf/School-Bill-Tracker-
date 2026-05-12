# School Bill Tracker

This project is a school bill-tracking prototype that allows students to view their bills and admins to manage bill statuses. It utilizes vanilla HTML, CSS, and JavaScript, along with Firebase Realtime Database for data management.

## Project Structure

```
school-bill-tracker
├── css
│   ├── styles.css
│   └── login.css
├── js
│   ├── firebase-config.js
│   ├── login.js
│   ├── student.js
│   ├── admin.js
│   └── utils.js
├── pages
│   ├── admin.html
│   ├── login.html
│   └── student.html
├── index.html
└── README.md
```

## Features

- **Student Interface**: Students can log in using their ID to view their bills, including description, amount, due date, and status.
- **Admin Interface**: Admins can log in using a password to manage bills for all students, updating their statuses as paid or unpaid.
- **Real-time Updates**: The application retrieves and displays data in real-time from Firebase.

## Setup Instructions

1. Clone the repository to your local machine.
2. Open the project in your preferred code editor.
3. Set up Firebase and replace the configuration in `js/firebase-config.js` with your Firebase project credentials.
4. Open `index.html` in a web browser to access the application.

## Technologies Used

- HTML
- CSS
- JavaScript
- Firebase Realtime Database

## License

This project is open-source and available for anyone to use and modify.