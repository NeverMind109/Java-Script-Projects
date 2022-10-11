document.addEventListener("DOMContentLoaded", () => {
  const productsBtn = document.querySelectorAll(".product__btn");
  const cartProductsList = document.querySelector(".cart-content__list");
  const cart = document.querySelector(".cart");
  const cartQuantity = document.querySelector(".cart__quantity");
  const fullPrice = document.querySelector(".fullprice");
  const orderModalIsOpenProd = document.querySelector(".order-modal__btn");
  const orderModalList = document.querySelector(".order-modal__list");
  const orderModalQuantity = document.querySelector(
    ".order-modal__quantity span"
  );
  const orderModalSum = document.querySelector(".order-modal__sum span");

  let randomId = 0;
  let price = 0;

  const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, "");
  };

  const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  };

  const plusFullPrice = (currentPrice) => {
    return (price += currentPrice);
  };

  const minusFullPrice = (currentPrice) => {
    return (price -= currentPrice);
  };

  const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} ₽`;
  };

  const printQuantity = () => {
    let length =
      cartProductsList.querySelector(".simplebar-content").children.length;
    cartQuantity.textContent = length;
    if (length > 0) {
      cart.classList.add("active");
    } else {
      cart.classList.remove("active");
    }
  };

  // cart item template
  const generateCartProduct = (img, title, price, id) => {
    return `
    <li class="cart-content__item">
        <article class="cart-content__product cart-product" data-id="${id}">
            <img
                class="cart-product__img" src="${img}" alt="Macbook"
            />
            <div class="cart-product__text">
                <h3 class="cart-product__title">${title}</h3>
                <span class="cart-product__price">${normalPrice(price)} ₽</span>
            </div>
            <button
                class="cart-product__delete"
                aria-label="Удалить товар"
            ></button>
        </article>
    </li>
    `;
  };

  // add to cart
  productsBtn.forEach((el) => {
    el.closest(".product").setAttribute("data-id", randomId++);
    el.addEventListener("click", (e) => {
      let btn = e.currentTarget;
      let parent = btn.closest(".product");
      let id = parent.dataset.id;
      let img = parent
        .querySelector(".image-switch__img img")
        .getAttribute("src");
      let title = parent.querySelector(".product__title").textContent;
      let priceNumber = parseInt(
        priceWithoutSpaces(
          parent.querySelector(".product-price__current").textContent
        )
      );

      // get sum
      plusFullPrice(priceNumber);

      // print full price
      printFullPrice();

      // add to cart
      cartProductsList
        .querySelector(".simplebar-content")
        .insertAdjacentHTML(
          "afterbegin",
          generateCartProduct(img, title, priceNumber, id)
        );

      // count and print quantity
      printQuantity();

      // local storage
      updateStorage();

      // disable btn
      btn.disabled = true;
    });
  });

  // delete item from cart
  cartProductsList.addEventListener("click", function (e) {
    if (e.target.classList.contains("cart-product__delete")) {
      deleteProducts(e.target.closest(".cart-content__item"));
    }
  });

  const deleteProducts = (productParent) => {
    // get id
    let id = productParent.querySelector(".cart-product").dataset.id;

    // disabled false
    document
      .querySelector(`.product[data-id='${id}']`)
      .querySelector(".product__btn").disabled = false;

    // minus price
    let currentPrice = parseInt(
      priceWithoutSpaces(
        productParent.querySelector(".cart-product__price").textContent
      )
    );
    minusFullPrice(currentPrice);

    // print full price
    printFullPrice();

    // remove productParent
    productParent.remove();

    // count and print quantity
    printQuantity();

    // local storage
    updateStorage();
  };

  // modal
  let flag = 0;
  orderModalIsOpenProd.addEventListener("click", (e) => {
    if (flag == 0) {
      orderModalIsOpenProd.classList.add("open");
      orderModalList.style.display = "block";
      flag = 1;
    } else {
      orderModalIsOpenProd.classList.remove("open");
      orderModalList.style.display = "none";
      flag = 0;
    }
  });

  // modal order template
  const generateModalProduct = (img, title, price, id) => {
    return `
    <li class="order-modal__item">
      <article class="order-modal__product order-product" data-id=${id}>
        <img
          class="order-product__img"
          src="${img}"
          alt="Macbook"
        />
        <div class="order-product__text">
          <h3 class="order-product__title">
            ${title}
          </h3>
          <span class="order-product__price">${normalPrice(price)}</span>
        </div>
        <button class="order-product__delete">Удалить</button>
      </article>
    </li>
    `;
  };

  const modal = new GraphModal({
    isOpen: (modal) => {
      let array = cartProductsList.querySelector(".simplebar-content").children;
      let fullprice = fullPrice.textContent;
      let length = array.length;
      orderModalSum.textContent = `${fullprice}`;
      orderModalQuantity.textContent = `${length} шт.`;

      for (item of array) {
        let img = item.querySelector(".cart-product__img").getAttribute("src");
        let title = item.querySelector(".cart-product__title").textContent;
        let priceString = priceWithoutSpaces(
          item.querySelector(".cart-product__price").textContent
        );
        let id = item.querySelector(".cart-product").dataset.id;

        orderModalList.insertAdjacentHTML(
          "afterbegin",
          generateModalProduct(img, title, priceString, id)
        );
      }
    },
    isClose: () => {
      console.log("closed");
    },
  });

  // total price for local storage function
  const countSum = () => {
    document.querySelectorAll(".cart-content__item").forEach((el) => {
      price += parseInt(
        priceWithoutSpaces(el.querySelector(".cart-product__price").textContent)
      );
    });
  };

  // local storage for page renew
  const initialState = () => {
    if (localStorage.getItem("products") !== null) {
      cartProductsList.querySelector(".simplebar-content").innerHTML =
        localStorage.getItem("products");
      printQuantity();
      countSum();
      printFullPrice();

      document.querySelectorAll(".cart-content__product").forEach((el) => {
        let id = el.dataset.id;
        document
          .querySelector(`.product[data-id="${id}"]`)
          .querySelector(".product__btn").disabled = true;
      });
    }
  };

  initialState();

  const updateStorage = () => {
    let parent = cartProductsList.querySelector(".simplebar-content");
    let html = parent.innerHTML;
    html = html.trim();

    if (html.length) {
      localStorage.setItem("products", html);
    } else {
      localStorage.removeItem("products");
    }
  };

  // delete items from modal
  document.querySelector(".modal").addEventListener("click", (e) => {
    if (e.target.classList.contains("order-product__delete")) {
      let deleteBtn = e.target;
      let id = deleteBtn.closest(".order-modal__product").dataset.id;
      let cartProduct = document
        .querySelector(`.cart-content__product[data-id='${id}']`)
        .closest(".cart-content__item");

      deleteProducts(cartProduct);
      deleteBtn.closest(".order-modal__product").remove();
    }
  });
});
