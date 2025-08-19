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

let currentUserId = 1;

async function checkVisisted(id) {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id=$1", [id]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
app.get("/", async (req, res) => {
  const users = await db.query("SELECT * FROM users");
  console.log(users.rows);
  const countries = await checkVisisted(currentUserId);
  const currentColor = await db.query("SELECT color FROM users WHERE id=$1", [currentUserId]);
  const color = currentColor.rows[0].color;
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users.rows,
    color: color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  const users = await db.query("SELECT * FROM users");
  if (req.body.user) {
    const userID = req.body.user;
    const selectedUser = await db.query("SELECT * FROM users WHERE id=$1", [userID]);
    const user = selectedUser.rows[0];
    currentUserId = user.id;

    const countries = await checkVisisted(userID);
    return res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users.rows,
      color: user.color
    });
  } else if (req.body.add) {
    return res.redirect("/new");
  }
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const newName = req.body.name;
  const newColor = req.body.color;

  const result = await db.query("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *", [newName, newColor]);
  console.log(result.rows);
  currentUserId = result.rows[0].id;

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
