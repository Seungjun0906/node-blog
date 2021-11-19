const express = require("express");
const Article = require("./../models/articles.model");
const articleRouter = express.Router();
const slugify = require("slugify");

articleRouter.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

articleRouter.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);

  res.render("articles/edit", { article: article });
});

articleRouter.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");

  res.render("articles/show", { article: article });
});

articleRouter.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    password: req.body.password,
  });

  try {
    article = await article.save();
    res.redirect(`/`);
  } catch (err) {
    res.render("articles/new", {
      article: article,
    });
  }
});

articleRouter.put("/:id", async (req, res, next) => {
  let savedArticle = await Article.findById(req.params.id);
  let editedArticle = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    password: req.body.password,
  });
  try {
    if (savedArticle.password === editedArticle.password) {
      savedArticle = await savedArticle.save();
      res.redirect("/");
    } else {
      res.redirect("/err");
    }
  } catch (err) {
    console.log(err);
  }
});

articleRouter.delete("/:id", async (req, res) => {
  let savedArticle = await Article.findById(req.params.id);
  let checkPassword = req.body["check-password"];

  try {
    if (savedArticle.password === checkPassword) {
      await Article.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } else {
      res.redirect("/err");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = articleRouter;
