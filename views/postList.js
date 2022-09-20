const timeAgo = require('node-time-ago');

const postList = (posts) => {
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
          ${post.upvotes} upvotes | ${timeAgo(post.date)}
        </small>
       </div>`
      ).join('')}
    </div>
  </body>
  </html>`

  return html
}

module.exports = postList;