const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/articles.model");
const methodOverride = require("method-override");

// router
const articleRouter = require("./routes/article.route");

const app = express();
const PORT = process.env.PORT || 80;

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose
//   .connect

//   // "mongodb://username:password@13.125.241.50:27017/blog?authSource=admin&authMechanism=SCRAM-SHA-1"
//   ();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/home", { articles: articles });
});

app.get("/err", (req, res) => {
  res.render("error");
});

app.use("/articles", articleRouter);

app.listen(PORT, () => {
  console.log(`listening from port number ${PORT}`);
});
