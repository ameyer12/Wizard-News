const html = require("html-template-tag");

const postDetails = (post) => {
    return html`
    <!DOCTYPE html>
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
    </body>
  </html>`
}

module.exports = postDetails;