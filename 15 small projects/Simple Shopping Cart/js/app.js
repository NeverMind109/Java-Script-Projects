// show cart
(function () {
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");

  cartInfo.addEventListener("click", function () {
    cart.classList.toggle("show-cart");
  });
})();

(function () {
  showTotals();
  deleteItem();

  const cart = document.getElementById("cart");
  const clearBtn = document.getElementById("clear-cart");
  const cartBtn = document.querySelectorAll(".store-item-icon");

  // add items to the cart
  cartBtn.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      let imgSrc = e.currentTarget.previousElementSibling.src;
      let pos = imgSrc.indexOf("img") + 3;
      const partPath = imgSrc.slice(pos);

      const name =
        e.currentTarget.parentElement.nextElementSibling.children[0].children[0]
          .textContent;

      let price =
        e.currentTarget.parentElement.nextElementSibling.children[0].children[1]
          .children[0].textContent;
      const finalPrice = price.trim();

      const item = {};
      item.img = `img-cart${partPath}`;
      item.name = name;
      item.price = finalPrice;

      const cartItem = document.createElement("div");
      cartItem.classList.add(
        "cart-item",
        "d-flex",
        "justify-content-between",
        "text-capitalize",
        "my-3"
      );
      cartItem.innerHTML = `
        <img
            src="${item.img}"
            class="img-fluid rounded-circle"
            alt=""
        />
        <div class="item-text">
            <p class="cart-item-title font-weight-bold mb-0">
            ${item.name}
            </p>
            <span>$</span>
            <span class="cart-item-price mb-0"
            >${item.price}</span
            >
        </div>
        <a href="#" class="cart-item-remove">
            <i class="fas fa-trash"></i>
        </a>
      `;

      //   select cart
      const cart = document.getElementById("cart");
      const total = document.querySelector(".cart-total-container");
      cart.insertBefore(cartItem, total);
      alert("Item added to the cart");
      showTotals();
      deleteItem();
    });
  });

  //   remove item from cart
  function deleteItem() {
    const deleteBtn = document.querySelectorAll(".cart-item-remove");
    deleteBtn.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const item = e.currentTarget.parentElement;
        cart.removeChild(item);

        showTotals();
      });
    });
  }

  //   clear cart
  clearBtn.addEventListener("click", function () {
    const cartItems = document.querySelectorAll(".cart-item");
    cartItems.forEach(function (item) {
      cart.removeChild(item);

      showTotals();
    });
  });

  function showTotals() {
    const total = [];
    const items = document.querySelectorAll(".cart-item-price");

    items.forEach(function (item) {
      total.push(parseFloat(item.textContent));
    });

    const totalMoney = total.reduce(function (total, item) {
      total += item;
      return total;
    }, 0);

    const finalMoney = totalMoney.toFixed(2);

    document.getElementById("cart-total").textContent = finalMoney;
    document.querySelector(".item-total").textContent = finalMoney;
    document.getElementById("item-count").textContent = total.length;
  }
})();
