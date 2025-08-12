const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = []; // in-memory storage

// Home - show all posts
app.get("/", (req, res) => {
    res.render("index", { posts });
});

// New post form
app.get("/new", (req, res) => {
    res.render("new-post");
});

// Handle new post
app.post("/new", (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: Date.now(), title, content });
    res.redirect("/");
});

// Edit form
app.get("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render("edit-post", { post });
});

// Handle edit
app.post("/edit/:id", (req, res) => {
    const { title, content } = req.body;
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        post.title = title;
        post.content = content;
    }
    res.redirect("/");
});

// Delete post
app.post("/delete/:id", (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect("/");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
