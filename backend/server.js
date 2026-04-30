const app = require("./src/app");
const connectDB = require("./src/config/db");
require("dotenv").config();
connectDB();

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.json({
        message: 'Red Product API',
        status: 'running',
        endpoints: {
            auth: '/api/auth',
            admin: '/api/admin',
            posts: '/api/posts'
        }
    });
});

// Route health check - pour Render
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        service: 'Red Product API',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
