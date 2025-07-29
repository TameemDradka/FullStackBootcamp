import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
const posts = JSON.parse(fs.readFileSync("posts.json", "utf-8"));

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs", { posts });
});

app.get("/posts/:slug", (req, res) => {
    const requestedSlug = req.params.slug;
    const post = posts.find(p => p.slug === requestedSlug);
    if (post) {
        res.render("blog.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});

app.get("/edit", (req, res) => {
  res.render("editMain.ejs", { posts });
});

app.get("/edit/:slug", (req, res) => {
    const requestedSlug = req.params.slug;
    const post = posts.find((p) => p.slug === requestedSlug);
    if (post) {
      res.render("editBlog.ejs", { post });
    } else {
      res.status(404).send("Post not found");
    }
});

app.post("/confirmEdit/:slug", (req, res) => {
    const slug = req.params.slug;
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;

    const post = posts.find((p) => p.slug === slug);
    if (post) {
        post.title = updatedTitle;
        post.content = updatedContent;

        res.redirect(`/posts/${slug}`);
    } else {
        res.status(404).send("Post not found");
    }
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