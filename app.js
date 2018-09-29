//INIT SERVER VARS
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/blog");

var blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  date: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// var blogEntry = {
//   title: "First Entry",
//   body: "This is the first entry on the blog.",
//   image: "https://cdn-images-1.medium.com/max/1024/1*dFzYr0D3tFRzsn_9M6jvIg.jpeg",
// }
//
// Blog.create(blogEntry);

//ROUTES
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/blog", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if(err){
      console.log(err);
    } else{
      res.render("blog", {blogs: blogs});
    }
  });
});

app.get("/blog/new", (req, res) => {
  res.render("new");
});

app.post("/blog", (req, res) => {
    Blog.create(req.body.blog, (err, newPost) => {
      if(err){
        console.log(err);
      }else{
        res.redirect("/blog");
      }
    });
});

app.get("/blog/:id", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if(err){
      console.log(err);
    }else{
      res.render("item", {blog: foundBlog});
    }
  });
});

//LISTEN
app.listen(3000, () => {
  console.log("Server started!");
});