import { data } from "./dataProduct.js";
export function initHome() {
  console.log(data);

  let next = document.getElementById("next");
  let previous = document.getElementById("previous");
  let slider = document.getElementById("slider");
  let product = document.getElementById("diplayProduct");
  let buttons = document.querySelectorAll(".filter-btn");
  let priceInput = document.getElementById("priceInput");
  let cartPage = document.querySelector(".cartPage");

  let { cart } = JSON.parse(sessionStorage.getItem("currentUser")) || {};
  console.log(cart);



  let sliderarr = [
    {
      image: "../images/1.jpg",
    
    },
    {
      image: "../images/2.jpg",
      
    },
    {
      image: "../images/3.jpg",
      
    },
    {
      image: "../images/4.jpg",
      
    },
    {
      image: "../images/5.jpg",
      
    },
  ];

  let currentindex = 0;

  next.addEventListener("click", () => {
    currentindex < sliderarr.length - 1 ? currentindex++ : (currentindex = 0);
    updateContent(currentindex);
  });

  previous.addEventListener("click", () => {
    currentindex > 0 ? currentindex-- : (currentindex = sliderarr.length - 1);
    updateContent(currentindex);
  });

  function updateContent(index) {
   
    slider.style.opacity=0;

    setTimeout(() => {
      slider.style.backgroundImage = `url(${sliderarr[index].image})`;
      slider.style.opacity=1;
      
    }, 200);
  }


  /* filteration*/
  let currentCategory = "All";

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentCategory = btn.getAttribute("data-category");
      applyFilters();

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  priceInput.addEventListener("input", () => {
    applyFilters();
  });

  function applyFilters() {
    let filteredData = data;

    if (currentCategory !== "All") {
      filteredData = filteredData.filter(
        (item) => item.category === currentCategory
      );
    }

    if (priceInput.value) {
      filteredData = filteredData.filter(
        (item) => item.price <= priceInput.value
      );
    }

    filteredData.length ? displayData(filteredData) : displayData(data);
  }

  function displayData(products) {
    product.innerHTML = products
      .map((item) => {
        return `
      <div class="col-md-3">
        <div class="card">
          <div class="image position-relative">
            <img
              style="object-fit: cover; height: 200px;"
              src="${item.image}"
              class="card-img-top"
              alt="${item.name}"
            />
            <i
              class="fa-solid fa-heart position-absolute end-0 top-0 m-2 fs-2 heart"
              style="color: #fb4407"
            ></i>
          </div>
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
             ${item.size[0]} size <br/>
             ${item.color[0]} color
            <div class="d-flex justify-content-between align-items-center mt-2">
              <p class="price fw-bold mt-2 fs-4">${item.price}$</p>
              <div class="links d-flex gap-4">
                <i class="fa-solid fa-eye fs-4 showProduct" ></i>
                <i class="fa-solid fa-cart-plus fs-4 productCheckout"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
      })
      .join("");

    document.querySelectorAll(".showProduct").forEach((eye, index) => {
      eye.addEventListener("click", () => {
        let product = products[index];
        sessionStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = `productDetails.html`;
      });
    });

    document.querySelectorAll(".productCheckout").forEach((cartt, index) => {
      cartt.addEventListener("click", () => {
        let product = products[index];

        /* to get current user  */
        let currentUser =
          JSON.parse(sessionStorage.getItem("currentUser")) || {};
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
                "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(86, 84, 83, 0.8))",
            },
          }).showToast();
        }
      });
    });
  }

  cartPage.addEventListener("click", () => {
    console.log("cart clicked");
    window.location.href = "cart.html";
  });

  window.onload = () => {
    displayData(data);
  };

  // Scroll to top functionality
  function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 200) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });

    // Smooth scroll to top
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Call the scroll to top initializer
  initScrollToTop();
}
