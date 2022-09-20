const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const postList = require("./views/postList");
const errorPage = require("./views/errorPage")
const postDetails = require("./views/postDetails");

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));

app.get("/", (req, res) => {
  const posts = postBank.list();
  res.send(postList(posts));
});

app.get( '/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);

  if (!post) {
    // If the post wasn't found, set the HTTP status to 404 and send Not Found HTML
    res.status(404)
    res.send(errorPage())
  } else {
    res.send(postDetails(post));
  }
});

app.get( '/users/:name', (req, res) => {
  console.log( req.params.name );
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

