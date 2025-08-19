import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "Baba2005",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let items = await db.query("SELECT * FROM items ORDER BY id ASC");
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items.rows,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  const result = await db.query("INSERT INTO items (title) VALUES ($1) RETURNING *", [item]);
  console.log(result.rows);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const itemID = req.body.updatedItemId;
  const newTitle = req.body.updatedItemTitle;
  const result = await db.query("UPDATE items SET title=$1 WHERE id=$2 RETURNING *", [newTitle, itemID]);
  console.log(result.rows);

  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const itemID = req.body.deleteItemId;
  const result = await db.query("DELETE FROM items WHERE id=$1 RETURNING *", [itemID]);
  console.log(result.rows);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
