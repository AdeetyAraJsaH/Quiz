import { Router } from 'express'
import fs from 'fs'
import getQuestions, { questions } from './questions.js';
import { doesExist } from './auth_users.js';
import { nanoid } from 'nanoid'

export const public_users = Router();
const checkUser = (readData, user) => {
  console.log('Checking user...')
  readData = JSON.parse(fs.readFileSync("userData.json", "utf-8"));
  if (user.email && user.password) {
    console.log(`email: ${user.email} password: ${user.password}`)
    console.log('email and password is not empty')
    if (!doesExist(user.email, readData)) {
      console.log('user not exists.')
      readData[user.email] = user;
      fs.writeFileSync('userData.json', JSON.stringify(readData));
      console.log("user registered")
      return true
    } else {
      console.log('user exists.')
      return false
    }
  } else {
    throw new Error("Oops! Something went wrong. Please check your input.");
  }
}
public_users.post("/register", async (req, res) => {// use async-await
  try {
    const newUser = req.body;
    let readData; //can get rid of this read data
    let isRegistered = false;
    if (fs.existsSync("userData.json")) {
      console.log('file exists.')
      isRegistered = checkUser(readData, newUser);
    } else {
      fs.writeFileSync('userData.json', JSON.stringify({}));
      console.log('file created...')
      isRegistered = checkUser(readData, newUser);
    }
    if (isRegistered) {
      res.status(200).json({ message: "User successfully registered." })
    } else {
      res.status(401).json({ message: "User already exists!" })
    }

  } catch (error) {
    res.status(404).send({ message: `Unable to register !!!`, error: `${error.message}` });
  }

});

public_users.get('/api/questions', async function (req, res) {
  try {
    await getQuestions();
    res.status(200).send({ quizID: nanoid(), questions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions." });
  }
});