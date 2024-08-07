const express = require('express');
// const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');
dotenv.config();
const path = require("path");


// const corsOptions = {
//     origin: "http://localhost:5173",
//     methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//     credentials: true,
// };

// app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

//for live server
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(errorMiddleware);

const PORT =  3001;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
}).catch(error => {
    console.error('Failed to connect to the database and start the server:', error.message);
});
