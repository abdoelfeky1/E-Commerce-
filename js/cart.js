// export function initcart() {
//   let displayPrice = document.querySelector(".totalPrice");
//   let displaySubTotal = document.querySelector(".subTotal");
//   let subTotal = 0;
//   let totalPrice = 0;

//   let cartCheckout = document.querySelector(".cartCheckout");
//   console.log(cartCheckout);

//   let { cart } = JSON.parse(sessionStorage.getItem("currentUser")) || {};
//   console.log(cart);

//   function updateTotalPrice() {
//     subTotal = cart.reduce((acc, product) => acc + product.price, 0).toFixed(3);
//     displaySubTotal.textContent = `${subTotal} $`;
//     totalPrice = (subTotal * 1 + 4.99).toFixed(3);
//     displayPrice.textContent = `${totalPrice} $`;
//   }
//   cartCheckout.innerHTML += cart
//     .map((product) => {
//       return `<!-- Left side products -->

//             <!-- Product card 1 -->
//             <div class="card mb-3 shadow-sm">
//               <div class="row g-0 align-items-center">
//                 <div class="col-md-4">
//                   <img
//                   style="object-fit: cover; height: 150px;"
//                     src="${product.image}"
//                     class="img-fluid rounded-start"
//                     alt="product-image"
//                   />
//                 </div>
//                 <div class="col-md-8">
//                   <div class="card-body d-flex justify-content-between">
//                     <div>
//                       <h5 class="card-title fw-bold">${product.name}</h5>
//                       <p class="card-text text-muted">
//                         price : <span class="fw-bold"> ${product.price}$</span>
//                       </p>
//                     </div>
//                     <div class="d-flex flex-column align-items-end">
//                       <div
//                         class="input-group input-group-sm mb-2"
//                         style="width: 110px"
//                       >
//                         <button class="btn btn-outline-secondary" id= "decrease">-</button>
//                         <input
//                           type="number"
//                           class="form-control text-center"
//                           value="2"
//                           min="1"
//                         />
//                         <button class="btn btn-outline-secondary" id = "increse">+</button>
//                       </div>
//                       <div class="d-flex align-items-center">
//                         <button class="btn btn-sm btn-outline-danger" id= "remove">
//                           delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           `;
//     })
//     .join("");

//   window.addEventListener("load", updateTotalPrice);
// }
export function initcart() {
  let displayPrice = document.querySelector(".totalPrice");
  let displaySubTotal = document.querySelector(".subTotal");
  let cartCheckout = document.querySelector(".cartCheckout");

  let { cart } = JSON.parse(sessionStorage.getItem("currentUser")) || {
    cart: [],
  };

  function updateTotalPrice() {
    if (cart.length === 0) {
      displaySubTotal.textContent = `0 $`;
      displayPrice.textContent = `0 $`;
      return;
    }

    let subTotal = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    displaySubTotal.textContent = `${subTotal.toFixed(2)} $`;

    let totalPrice = (subTotal + 4.99).toFixed(2);
    displayPrice.textContent = `${totalPrice} $`;

    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    currentUser.cart = cart;
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  function renderCart() {
    if (!cartCheckout) return;

    if (cart.length === 0) {
      cartCheckout.innerHTML = `
        <div class="text-center p-5">
          <h4 class="text-muted">🛒 Your cart is empty</h4>
          <a href="../home.html#products" class="btn btn-primary mt-3">Continue Shopping</a>
        </div>
      `;
      updateTotalPrice();
      return;
    }

    cartCheckout.innerHTML = cart
      .map((product, index) => {
        return `
          <div class="card mb-3 shadow-sm" data-index="${index}">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <img
                  style="object-fit: cover; height: 150px;"
                  src="${product.image}"
                  class="img-fluid rounded-start"
                  alt="product-image"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body d-flex justify-content-between">
                  <div>
                    <h5 class="card-title fw-bold">${product.name}</h5>
                    <p class="card-text text-muted">
                      Price: <span class="fw-bold"> ${product.price}$</span>
                    </p>
                  </div>
                  <div class="d-flex flex-column align-items-end">
                    <div class="input-group input-group-sm mb-2" style="width: 110px">
                      <button class="btn btn-outline-secondary btn-decrease">-</button>
                      <input
                        type="number"
                        class="form-control text-center product-qty"
                        value="${product.quantity}"
                        min="1"
                        readonly
                      />
                      <button class="btn btn-outline-secondary btn-increase">+</button>
                    </div>
                    <div class="d-flex align-items-center">
                      <button class="btn btn-sm btn-outline-danger btn-remove">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    updateTotalPrice();
  }

  function initEvents() {
    cartCheckout.addEventListener("click", (e) => {
      let card = e.target.closest(".card");
      if (!card) return;
      let index = card.getAttribute("data-index");

      if (e.target.classList.contains("btn-increase")) {
        cart[index].quantity++;
        renderCart();
      }

      if (e.target.classList.contains("btn-decrease")) {
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
          renderCart();
        }
      }

      if (e.target.classList.contains("btn-remove")) {
        cart.splice(index, 1);
        let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        currentUser.cart = cart || [];
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        renderCart();
      }
    });
  }

  renderCart();
  initEvents();
  document.getElementById("checkoutbtn").addEventListener("click", () => {
    window.location.href = "orderDone.html";
  });
}
