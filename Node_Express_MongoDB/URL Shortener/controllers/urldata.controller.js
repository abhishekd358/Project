import express from "express";
import { UrlDb } from "../models/urldata.js";

// import shortid
import shortid from "shortid";

// here we create a function for the particular routes

// function to shorten the url and push to db

export const urlDataCreate = async (req, res) => {
  try {
    // 1. Generate short code
    const shortCode = shortid.generate();

    // 2. Build short URL
    const shortenUrl = `http://localhost:1200/${shortCode}`;

    // 3. Get original URL from form
    const originalUrlPath = req.body["originalUrl"];

    // 4. Save to database using Mongoose
    await UrlDb.create({
      shortCode: shortCode,
      originalUrl: originalUrlPath,
    });

    // 5. Render response with short URL
    res.render("index.ejs", { shortenUrl });
  } catch (error) {
    console.error("Error saving URL:", error);
    res.status(500).send("Something went wrong");
  }
};

// function to capture the shortCode from the Url and fint the code related data in the db
export const redirectToOrignialUrl = async (req, res) => {
  try {
    const shortid = req.params.shortCode;
    // finding the shortid in DB
    const urlData = await UrlDb.findOne({ shortCode: shortid });
    // console.log(urlData)
    // redirecting to OriginalUrl
    res.redirect(urlData.originalUrl);
  } catch (error) {
    console.error("Error saving URL:", error);
    res.status(401).send("");
  }
};
