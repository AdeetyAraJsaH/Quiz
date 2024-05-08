import { Router } from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
import jwt from 'jsonwebtoken'
import fs from 'fs'
import getQuestions, { questions } from './questions.js';
import { nanoid } from 'nanoid'
// import session from 'express-session';
const regd_users = Router();

export const doesExist = (email, users) => { //returns boolean
  // console.log(Object.entries(users));
  let userwithemail = Object.keys(users).filter(key => email === key);
  if (userwithemail.length > 0) return true;
  else return false;
}

export const authenticatedUser = async (email, password) => {//return boolean
  const users = JSON.parse(fs.readFileSync("userData.json", "utf-8"));
  // console.log(users);
  let validUsers = Object.entries(users).filter(([key, value]) => { if (email === key && value['password'] === password) return key });
  if (validUsers.length > 0) return true;
  else throw new Error(JSON.stringify({
    status: 401,
    error: "Error 401: User not authenticated!",
    message: "Invalid credentials !!!"
  }))
}

const saveQuiz = (quizData) => {
  const quizfile = JSON.parse(fs.readFileSync("quizData.json", "utf-8"));
  quizfile[quizData.quizID] = quizData;
  fs.writeFileSync('quizData.json', JSON.stringify(quizfile));
  console.log('Quiz saved.');
}

const getUserQuizData = async (email) => {
  const quizfile = JSON.parse(fs.readFileSync("quizData.json", "utf-8"));
  const filteredData = Object.fromEntries(
    Object.entries(quizfile).map(([key, value]) => {
      if (value.email === email) {
        const quizID = value.quizID;
        const Result = value.Result;
        const Details = value.details;
        return [value.time, { quizID, Result, Details }];
      }
      return null;
    })
  );
  return filteredData;
}

regd_users.post('/auth', async (req, res) => {
  try {
    if (req.body.token) {
      const token = req.body.token;
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (!err) {
          // console.log(user);
          // console.log("session available")
          req.user = user;
          return res.json({ valid: true, email: req.session.email })
        } else {
          throw new Error(JSON.stringify({
            status: 401,
            error: "Error 401: User not authenticated!",
            message: "Session Ended !!!"
          }))
        }
      });
    } else {
      throw new Error(JSON.stringify({
        status: 200,
        error: "",
        message: "Session Ended !!!"
      }))
    }
  } catch (error) {
    const parsedError = JSON.parse(error.message);
    res.status(parsedError.status).json({ message: parsedError.error + " " + parsedError.message, valid: false });

  }
})
//only registered users can login
regd_users.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // check if valid credentials
    if (await authenticatedUser(email, password)) {
      req.session.email = email;
      let accessToken = jwt.sign({
        data: password
      }, process.env.SECRET_KEY, { expiresIn: 10 * 60 });
      // store user information in session, typically a user id
      req.session.authorization = accessToken
      return res.json({ login: true, email: email, token: accessToken })
    }
  } catch (error) {
    const parsedError = JSON.parse(error.message);
    res.status(parsedError.status).json({ message: parsedError.error + " " + parsedError.message });
  }
});
regd_users.post("/auth/questions", async (req, res) => {
  const custom_URL = {}
  if (req.body) {
    console.log(req.body)
    try {
      await getQuestions(req.body);
      res.status(200).send({ quizID: nanoid(), questions });
    } catch (error) {
      res.status(500).json({ message: "Error fetching questions." });
    }
  }
})
regd_users.post("/auth/quizsave", async (req, res) => {
  if (req.body) {
    try {
      let quizData;
      if (fs.existsSync("quizData.json")) {
        console.log('file exists.')
        saveQuiz(req.body)
        res.status(200).json("Quiz Saved")
      } else {
        fs.writeFileSync('quizData.json', JSON.stringify({}));
        console.log('file created...')
        saveQuiz(req.body);
        res.status(200).json("Quiz Saved.")
      }
    } catch (error) {
      res.status(200).json({ error: "Error : Quiz not saved!" })
    }
  }
})
regd_users.post("/auth/quizData/:email", async (req, res) => {
  console.log(req.params.email);
  try {
    const data = await getUserQuizData(req.params.email);
    console.log(data)
    if (data){
      res.status(200).send({ data, message:"Data found" });
    }else{
      res.status(200).send({ data, message:"No Data found" });
    }
  } catch (error) {
    res.status(200).send(error)
  }
})
export default regd_users;