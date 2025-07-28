import express from "express";

const app = express();
const port = 3000;
app.use(express.static("public"));

app.get("/", (req, res) => {
    app.render("home.ejs");
});

app.listen(port, () => {
    console.log(`Website running on port ${port}`)
});