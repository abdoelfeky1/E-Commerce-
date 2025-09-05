export function initProductDetails() {
  let productsDetails = document.getElementById("productDetails");

  
  let product = JSON.parse(sessionStorage.getItem("selectedProduct"));
  console.log(product);

  productsDetails.innerHTML += `<div class="col-md-4">
            <div class="image mt-5">
              <img
              style="object-fit: cover; height: 400px;"
                class="rounded-2"
                src="${product.image}"
                alt=""
              />
            </div>
          </div>
          <div class="col-md-8">
            <div class="inner mt-5">
              <h3>M${product.name}</h3>

              <p>Category : ${product.category}</p>
              <p>Size : ${product.size[0]}</p>
              <p class="price my-3">
                price : <span class="fw-bold">${product.price}$</span>
              </p>

              <p class="my-3 w-75">
                ${product.description}
              </p>

              <button class="btn px-3 fw-semibold py-2 cart">
                Add to cart
              </button>
            </div>
          </div>`;

  let cartbtn = document.querySelector(".cart");

  cartbtn.addEventListener("click", () => {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || {};
    currentUser.cart = currentUser.cart || [];

    if (!currentUser.cart.some((item) => item.id === product.id)) {
      currentUser.cart.push(product);
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      Toastify({
        text: "item added to cart successfully!.",
        duration: 1000,
        style: {
          background:
           "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(86, 84, 83, 1))",
        },
      }).showToast();
      let users = JSON.parse(localStorage.getItem("users")) || [];
      let updatedUsers = users.map((user) => {
        if (user.email === currentUser.email) {
          return { ...user, cart: currentUser.cart };
        }
        return user;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    } else {
      Toastify({
        text: "item is already in cart !",
        duration: 1000,
        style: {
          background:
           "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(86, 84, 83, 1))",
        },
      }).showToast();
    }
  });
}
