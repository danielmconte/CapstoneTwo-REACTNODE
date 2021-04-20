const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");


router.get('/', (req, res, next) => {
  res.send("APP IS WORKING!!!")
})

router.post('/register', async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const inquiry = await db.query(
        `SELECT username, password 
         FROM users
         WHERE username = $1`,
        [username]);
        const alreadyUser = inquiry.rows[0];
        if(alreadyUser){
          return res.json({ message: `Username already exists`})
        }
      if (!username || !password) {
        throw new ExpressError("Username and password required", 400);
      }
      // hash password
      const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
      // save to db
      const results = await db.query(`
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING username`,
        [username, hashedPassword]);
        const user = results.rows[0];
        if (user) {
            const token = jwt.sign({ username }, SECRET_KEY);
            return res.json({ message: `Registered and Logged in! Welcome ${user.username}`, token})
          }
        
    } catch (e) {
      if (e.code === '23505') {
        return next(new ExpressError("Username taken. Please pick another!", 400));
      }
      return next(e)
    }
  });
  
  router.post('/login', async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw new ExpressError("Username and password required", 400);
      }
      const results = await db.query(
        `SELECT username, password 
         FROM users
         WHERE username = $1`,
        [username]);
      const user = results.rows[0];
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign({ username }, SECRET_KEY);
          return res.json({ message: `Logged in! Welcome ${user.username}`, token })
        }
      }
      throw new ExpressError("Invalid username/password", 400);
    } catch (e) {
      return next(e);
    }
  })

  router.post('/adminlogin', async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.json({ message: `Username and password required`})
      }
      if(username !== 'admin') {
        return res.json({ message: `Invalid Admin Username or Password`})
      }
      const results = await db.query(
        `SELECT username, password 
         FROM users
         WHERE username = $1`,
        [username]);
      const user = results.rows[0];
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign({ username, type: "admin" }, SECRET_KEY);
          return res.json({ message: `Logged in! Welcome ${user.username}`, token })
        }
      }
      return res.json({ message: `Invalid Admin Username or Password`})
    } catch (e) {
      return next(e);
    }
  })
  


module.exports = router;