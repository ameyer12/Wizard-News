const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank")

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));

app.get("/", (req, res) => {
  const posts = postBank.list();

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet' href="/style.css" />
  </head>
  <body>
    <div className="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
       <div class='news-item'>
         <p>
           <span className="news-position">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
           <small>(bu ${post.name})</small>
        </p> 
        <small className="news-info">
          ${post.upvotes} upvotes | ${post.date}
        </small>
       </div>`
      ).join('')}
    </div>
  </body>
  </html>`
  
  res.send(html);
});

app.get( '/posts/:id', (req, res) => {
  console.log( req.params.id );
  const id = req.params.id;
  const post = postBank.find(id);
  if (!post) {
    // If the post wasn't found, set the HTTP status to 404 and send Not Found HTML
    res.status(404)
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
        <img src="/dumbledore-404.gif" />
      </div>
    </body>
    </html>`
    res.send(html)
  } else {
  res.send(`
<html>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
    
      <div class='news-item'>
        <p>
          <span class="news-position">${post.id}. ▲</span><a href="/">${post.title}</a>
          <small>(bu ${post.name})</small>
        </p> 
        <p>
          <span>${post.content}</span>
        </p>
        <small class="news-info">
          ${post.upvotes} upvotes | ${post.date} </span><a href="/">Back</a>
        </small>
      </div>

    </div>
  </body>
</html>`)
  }
});

app.get( '/users/:name', (req, res) => {
  console.log( req.params.name );
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
