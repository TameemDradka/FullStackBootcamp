import express from "express";

const app = express();
const port = 3000;
let today = new Date();
let dayOfWeek = today.getDay();

app.get("/", (req, res) => {
  let type = "a weekday";
  let adv = "it's time to work hard";

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    type = "the weekend";
    adv = "it's time to have fun";
  }

  res.render("index.ejs", { typeOfDay: type, advice: adv });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
