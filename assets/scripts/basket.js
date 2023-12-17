let bskcontainer = document.getElementById("bskcontainer");
let frmInp = document.getElementById("frmInp");

const getBasket = async () => {
  const response = await fetch(`http://localhost:3000/basket`);
  const data = await response.json();
  db = data;
  db.map((item) => {
    let card = document.createElement("div");
    card.className = "myCard";
    card.innerHTML = ` 
       <img src="${item.image}" alt="">   
      <h4>${item.title}</h4>
      <p>${item.description}</p>
      <h3>${item.id}</h3>
       <button onclick="removeFromBasket(${item.id})">Remove from basket</button>
       <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Edit ID
  </button>
      `;
    bskcontainer.appendChild(card);
  });
};

const removeFromBasket = (id) => {
  fetch("http://localhost:3000/basket/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

function changeId(id) {
  fetch("http://localhost:3000/basket/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: frmInp.value
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

getBasket();
