window.onload = function () {
  displayPosts();
};

function addPost() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const category = document.getElementById("category").value;

  if (!title || !content) {
    alert("Please enter both a title and content.");
    return;
  }

  const date = new Date().toLocaleString();

  const post = {
    title,
    content,
    category,
    date
  };

  let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
  posts.unshift(post);
  localStorage.setItem("blogPosts", JSON.stringify(posts));

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("category").value = "General";

  displayPosts();
}

function displayPosts() {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";

  const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

  posts.forEach((post, index) => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    postDiv.innerHTML = `
      <button class="delete-btn" onclick="deletePost(${index})">🗑️</button>
      <h3>${post.title}</h3>
      <div class="meta">🗂️ ${post.category} | 📅 ${post.date}</div>
      <p>${post.content}</p>
    `;

    postsContainer.appendChild(postDiv);
  });
}

function deletePost(index) {
  let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
  posts.splice(index, 1);
  localStorage.setItem("blogPosts", JSON.stringify(posts));
  displayPosts();
}

function searchPosts() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach(post => {
    const title = post.querySelector("h3").innerText.toLowerCase();
    const content = post.querySelector("p").innerText.toLowerCase();
    post.style.display = title.includes(searchValue) || content.includes(searchValue) ? "block" : "none";
  });
}
