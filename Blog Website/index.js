import express from "express";
import fs from "fs";
const posts = JSON.parse(fs.readFileSync("posts.json", "utf-8"));

const app = express();
const port = 3000;
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs", { posts });
});

app.get("/edit", (req, res) => {
  res.render("edit.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.listen(port, () => {
    console.log(`Website running on port ${port}`)
});