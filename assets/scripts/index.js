let container = document.getElementById("container");
let loadBtn = document.getElementById("loadBtn");
let page = 1;
let limit = 8;

const getAll = async () => {
  let skip = (page - 1) * limit;
  const response = await fetch(`http://localhost:3000/data?_page=${page}&_limit=${limit}&_skip=${skip}`);
  const data = await response.json();
  db = data;
  db.map((item) => {
    let card = document.createElement("div");
    card.className = "myCard";
    card.innerHTML = ` 
     <img src="${item.image}" alt="">   
    <h4>${item.title}</h4>
    <p>${item.description}</p>
     <button onclick="addToCart(${item.id})">ADD</button>
     <i onclick="addToFav(${item.id})"  class="fa-regular fa-heart"></i>
    `;
    container.appendChild(card);
  });
  page++
};

const addToCart = (id) => {
  fetch("http://localhost:3000/data/" + id)
    .then((res) => res.json())
    .then((data) => {
      return fetch("http://localhost:3000/basket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    })
    .then((res) => {
      if (res.status == 500) {
        throw new Error("This product already add to cart");
      }
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((err) => alert(err.message));
};
const addToFav = (id) => {
  fetch("http://localhost:3000/data/" + id)
    .then((res) => res.json())
    .then((data) => {
      return fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    })
    .then((res) => {
      if (res.status == 500) {
        throw new Error("This product already add to favorites");
      }
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((err) => alert(err.message));
};

loadBtn.addEventListener('click',getAll)
getAll();
