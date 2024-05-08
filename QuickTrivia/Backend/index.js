import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'
import session from 'express-session'
import regd_users from './routes/auth_users.js';
import { public_users } from './routes/general.js'

const app = express();

app.use(express.json());

app.use(session({
    secret: "fingerprint_user",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 2* 60 * 1000
    }
}))

// app.use("/user/auth", async function auth(req, res, next) {
    
// });
const PORT = process.env.PORT || 3000;

app.use("/user", regd_users);
app.use("/", public_users);

app.listen(PORT, () => console.log(`Server is running at PORT:${PORT}`));
