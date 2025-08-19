import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Baba2005",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
  let visited = [];
  const result = await db.query("SELECT country_code FROM visited_countries");
  result.rows.forEach((country) => {
    visited.push(country.country_code);
  });

  return visited;
}

app.get("/", async (req, res) => {
  //Write your code here.
  const visited = await checkVisited();
  console.log(visited);

  res.render("index.ejs", { total: visited.length, countries: visited });
});

app.post("/add", async (req, res) => {
  const result = await db.query(`SELECT * FROM countries WHERE country_name ILIKE $1`, [req.body.country]);

  if (result.rows.length === 0) {
    const visited = await checkVisited();
    return res.render("index.ejs", {
      total: visited.length,
      countries: visited,
      error: "Country not found. Please try again.",
    });
  }

  console.log(result.rows);
  const newCode = result.rows[0].country_code;

  const exists = await db.query('SELECT * FROM visited_countries WHERE country_code = $1', [newCode]);
  if (exists.rows.length > 0) {
    const visited = await checkVisited();
    return res.render("index.ejs", {
      total: visited.length,
      countries: visited,
      error: "Country already added.",
    });
  }

  await db.query(`INSERT INTO visited_countries (country_code) VALUES ($1)`, [newCode]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
