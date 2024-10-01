
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = 3000;
// const hostname = 'localhost';

// // Enable CORS for a specific origin
// const corsOptions = {
//     origin: 'http://localhost:5173/',
// };
// app.use(cors(corsOptions));

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Mock user data
// const users = [
//     {
//         username: "user1",
//         password: "123456"
//     },
//     {
//         username: "user2",
//         password: "123456"
//     },
//     {
//         username: "user3",
//         password: "123456"
//     }
// ];

// // POST endpoint for login
// app.post('/api/users', (req, res) => {
//     const { username, password } = req.body;

//     const user = users.find(u => u.username === username && u.password === password);

//     if (user) {
//         res.status(200).json({ message: 'Login successful!' });
//     } else {
//         res.status(401).json({ message: 'Invalid username or password' });
//     }
// });

// // GET endpoint to return all users
// app.get('/api/users', (req, res) => {
//     res.status(200).json(users);
// });

// // Handle 404 errors for other routes
// app.use((req, res) => {
//     res.status(404).json({ message: 'Not Found' });
// });

// // Start the server
// app.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });