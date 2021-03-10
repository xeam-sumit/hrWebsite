require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser")

const { PEP_API_KEY, PORT } = process.env

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json

// pepipost configuration
'use strict';

const lib = require('pepipost/lib');
const configuration = lib.Configuration;
const controller = lib.MailSendController;

configuration.apiKey = PEP_API_KEY;

let body = new lib.Send();

app.use(bodyParser.json())
app.get("/api", (req, res) => {
  res.json({
    "name": "zomato",
    "service": "food"
  });
});

// function to send the email to user
app.post("/api/:formPage", async (req, res) => {
  const { email, toUser, toUs } = req.body
  // const { formPage } = req.params;
  console.log("userData", toUser, toUs, email)
  const sendEmail = (toEmail, data) => {
    body.from = new lib.From();
    body.from.email = "career@xeamventures.com";
    body.from.name = 'Pepipost';
    body.subject = data.subject;

    body.content = [];
    body.content[0] = new lib.Content();
    body.content[0].type = lib.TypeEnum.HTML;
    body.content[0].value = data.content;

    body.personalizations = [];
    body.personalizations[0] = new lib.Personalizations();
    body.personalizations[0].attributes = JSON.parse('{"name":"Pepi","love":"Email"}');

    body.personalizations[0].to = [];
    body.personalizations[0].to[0] = new lib.EmailStruct();
    body.personalizations[0].to[0].name = 'to-address';
    body.personalizations[0].to[0].email = `${toEmail}`;

    body.tags = ['campaign'];
    return promise = controller.createGeneratethemailsendrequest(body);
  }
  // sending email to user
  const check = sendEmail(email, toUser)
  check.then((resolve) => {
    console.log("resolve", resolve)
    sendEmail("sumit26star@gmail.com", toUs)
  }).then((resolve) => {
    res.send("req is processed")
  }).catch((err) => {
    console.log("ERROR: ", err)
  })
});

app.listen(PORT, () => {
  console.log(`server has been started ${process.env.PORT}`)
});