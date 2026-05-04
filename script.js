let cart = [];

const buttons = document.querySelectorAll(".add");
const cartDiv = document.querySelector("#cart");
const totalText = document.querySelector("#total");
const payBtn = document.querySelector("#pay");
const clearBtn = document.querySelector("#clear");
const filter = document.querySelector("#filter");
const products = document.querySelectorAll(".product");

// добавление
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const product = btn.parentElement;

        const name = product.querySelector("p").textContent;
        const price = Number(product.dataset.price);

        cart.push({ name, price });

        renderCart();
    });
});

// отрисовка корзины
const renderCart = () => {
    cartDiv.innerHTML = "";

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.textContent = item.name + " - " + item.price;

        const remove = document.createElement("button");
        remove.textContent = "X";

        remove.addEventListener("click", () => {
            cart.splice(index, 1);
            renderCart();
        });

        div.appendChild(remove);
        cartDiv.appendChild(div);
    });

    updateTotal();
};

// сумма
const updateTotal = () => {
    let total = 0;
    cart.forEach(item => total += item.price);
    totalText.textContent = "Итого: " + total;
};

// оплата
payBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Покупка прошла успешно!");
        cart = [];
        renderCart();
    }
});

// очистка
clearBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
});

// фильтр
filter.addEventListener("change", () => {
    const value = filter.value;

    products.forEach(product => {
        const category = product.dataset.category;

        if (value === "all" || category === value) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});