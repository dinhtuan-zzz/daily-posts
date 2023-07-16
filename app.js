const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const _ = require("lodash");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const posts = [
  {
    title: "Day 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id commodo dui. Aliquam eu nulla euismod orci porta facilisis. Mauris sit amet dictum dolor. Aliquam hendrerit eu mi non placerat. Quisque velit orci, semper sit amet mauris id, congue pellentesque velit. Duis et diam eu ipsum finibus efficitur sed non eros. Sed ornare faucibus augue, id sollicitudin est porttitor ac. Fusce ornare dui ipsum, id pharetra orci interdum viverra. Ut vel libero a neque gravida dictum sit amet id odio. Nunc molestie consectetur lorem. Fusce eu consequat diam. Mauris et velit quis elit aliquet tincidunt. Cras enim sem, vestibulum vel rhoncus quis, tincidunt ut massa. Nulla vitae leo nisl. Maecenas sit amet ipsum eu metus placerat tincidunt.",
  },

  {
    title: "Day 2",
    content:
      "Fusce luctus nibh at ornare pretium. Donec lacus quam, viverra non auctor rutrum, maximus vitae nisl. Morbi auctor tempus dui, ut elementum odio tempus et. Donec et lacinia ante, ac elementum risus. Curabitur dui turpis, porttitor id ante at, tempus rhoncus felis. Nam dignissim mollis turpis hendrerit varius. Aliquam dictum mauris nec odio tempor, a fermentum lacus feugiat. Aliquam nec velit turpis. Suspendisse potenti. Pellentesque quis dapibus nibh, eget blandit leo. Aenean eleifend, sapien id aliquet placerat, ligula leo sagittis lectus, a dapibus lorem nisi quis mauris. In in vehicula mi. Suspendisse risus leo, gravida quis mattis vitae, finibus id purus. Morbi at molestie risus.",
  },

  {
    title: "Day 3",
    content:
      "Nunc commodo cursus sem, sed pretium metus. Proin pretium nunc ex, hendrerit imperdiet risus blandit sed. Sed vehicula cursus mi at efficitur. Donec tempor, ligula ut consectetur porta, risus purus sollicitudin nulla, ac ultrices nisl enim at ante. Mauris vitae lacus ut turpis viverra feugiat ut ut nibh. Nunc euismod ex non elementum fringilla. Vivamus faucibus, odio vitae consectetur ultrices, neque sem elementum neque, vel aliquet orci nibh eget lacus. Suspendisse tellus augue, accumsan a leo id, dictum tempor justo. Mauris in lobortis metus. Integer tincidunt et ipsum eget efficitur. Nulla facilisi. Nam finibus imperdiet volutpat. Praesent rhoncus metus massa, at volutpat diam molestie efficitur. Nulla malesuada, risus sed bibendum dapibus, tortor turpis dictum neque, at gravida est odio vitae nunc.",
  },
];
app.get("/", function (req, res) {
  res.render("index.ejs", { posts: posts });
});
app.post("/", function (req, res) {
  const post = {
    title: req.body.title,
    content: req.body.post,
  };
  posts.push(post);
  res.render("index.ejs", { posts: posts });
});

app.get("/upload", function (req, res) {
  res.render("upload");
});
app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/posts/:postName", function (req, res) {
  post = posts.find(
    (post) => _.lowerCase(post.title) === _.lowerCase(req.params.postName)
  );
  if (post) {
    res.render("post", { post: post });
  } else {
    res.render("/");
  }
});

app.listen(3000, function () {
  console.log("Server is running...");
});
