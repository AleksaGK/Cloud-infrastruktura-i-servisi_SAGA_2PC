const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
app.use(bodyParser.json());

const db = require("./userConnection");
const mongoose = require("mongoose");

app.post("/users", (req, res) => {
  let newUser = req.query;
  //   console.log(newUser);

  db.promise()
    .query(
      `INSERT INTO Users VALUES('NULL', ${newUser.UserId}, ${newUser.HotelId}, '${newUser.CarId}', ${newUser.FlightId})`
    )
    .then(() => {
      // console.log("User created");
      res.status(201).send({ msg: "Created user" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db
      .promise()
      .query(`SELECT * FROM users WHERE id=${id}`);
    res.send(result[0]);
  } catch (error) {
    console.log(error);
  }
});

app.post("/users/:id/booking/:hotel/:car/:flight", async (req, res) => {});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db
      .promise()
      .query(`DELETE FROM users WHERE id=${id};`);
    res.send("user successfully deleted");
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const result = await db.promise().query(`SELECT * FROM users`);
    res.send(result[0]);
  } catch (error) {
    console.log(error);
  }
});

app.listen("4444", () => {
  console.log("Up and running - user service");
});
