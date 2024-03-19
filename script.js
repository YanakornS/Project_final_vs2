let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let listCard2 = document.querySelector(".listCard2");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

//เมื่อคลิกที่ openShopping, จะเพิ่มคลาส active ให้กับ body เพื่อแสดงตะกร้าสินค้า.
openShopping.addEventListener("click", () => {
    body.classList.add("active");
});
//เมื่อคลิกที่ closeShopping, คลาส active จะถูกลบออกจาก body เพื่อซ่อนตะกร้าสินค้า.
closeShopping.addEventListener("click", () => {
    body.classList.remove("active");
});

let products = [{
        id: 1,
        name: "หัว Marbo nic50 - องุ่น",
        image: "1.PNG",
        price: 100,
    },
    {
        id: 2,
        name: "หัว Marbo nic50 - แตงโม",
        image: "2.PNG",
        price: 100,
    },
    {
        id: 3,
        name: "หัว Marbo nic50 - องุ่นอโล",
        image: "3.PNG",
        price: 100,
    },
    {
        id: 4,
        name: "หัว Marbo - แอปเปิล",
        image: "4.PNG",
        price: 100,
    },
    {
        id: 5,
        name: "หัว Marbo - พีช",
        image: "5.PNG",
        price: 100,
    },
    {
        id: 6,
        name: "หัว Marbo - พีชสตอ",
        image: "6.PNG",
        price: 100,
    },
    {
        id: 7,
        name: "หัว Marbo - มิ้นท์",
        image: "7.PNG",
        price: 100,
    },
    {
        id: 8,
        name: "หัว Marbo - มะนาว",
        image: "8.PNG",
        price: 100,
    },
    {
        id: 9,
        name: "หัว Jues+ - แฟนต้าองุ่น",
        image: "9.PNG",
        price: 100,
    },
    {
        id: 10,
        name: "หัว Jues+ -สตอ โยเกิร์ต",
        image: "10.PNG",
        price: 100,
    },
];
let listCards = [];

//มันจะสร้าง HTML elements สำหรับแต่ละสินค้าและแสดงผลลัพธ์ในหน้าเว็บ โดยใช้ forEach loop สำหรับทุกสินค้าใน array products
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card <i class="fas fa-shopping-cart"></i></button>`; // เพิ่มไอคอนรถเข็นหลังจากปุ่ม "Add To Card"
        list.appendChild(newDiv);
    });
}
initApp();
function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = { ...products[key], quantity: 1 }; // ถ้าสินค้ายังไม่ได้ถูกเพิ่ม ให้เพิ่มสินค้านั้นและกำหนด quantity เป็น 1
  } else {
    listCards[key].quantity += 1; // ถ้าสินค้าได้ถูกเพิ่มแล้ว ให้เพิ่ม quantity
  }
  reloadCard(); // โหลดการ์ดสินค้าใหม่เพื่ออัปเดต UI
}


function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key]; //// ลบสินค้าออกถ้าจำนวนเป็น 0
  } else {
    listCards[key].totalItemPrice = quantity * products[key].price; //เป็นคำนวณนี้เป็นการอัปเดตราคาของสินค้าในตะกร้า
    listCards[key].quantity = quantity; //// อัปเดตจำนวนสินค้า
  }
  reloadCard();
}

function clearCart() {
  listCards = []; // เคลียร์รายการสินค้าทั้งหมดในตะกร้า
  reloadCard(); // โหลดการ์ดสินค้าใหม่เพื่ออัปเดต UI
}


function reloadCard() {
  // ล้างค่าของ listCard เพื่อเตรียมการแสดงสินค้าใหม่
  listCard.innerHTML = "";

  // กำหนดค่าเริ่มต้นของ count และ totalPrice เป็น 0
  let count = 0;
  let totalPrice = 0;

  // วนลูปผ่าน listCards เพื่อแสดงสินค้าที่มีอยู่ในตะกร้า
  listCards.forEach((value, key) => {
    if (value != null) {
      // เพิ่มจำนวนสินค้าในตะกร้า
      count += value.quantity;

      // คำนวณราคารวมสำหรับแต่ละสินค้า
      let totalItemPrice = value.price * value.quantity;

      // เพิ่มราคารวมของสินค้าทั้งหมด
      totalPrice += totalItemPrice;

      // สร้าง element ใหม่สำหรับแสดงสินค้า
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${totalItemPrice.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>
            `;

      // เพิ่ม element ที่สร้างเข้าไปใน listCard
      listCard.appendChild(newDiv);
    }
  });

  // แสดงราคารวมและจำนวนสินค้าทั้งหมด
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}




document.getElementById("save-pdf").addEventListener("click", function () {
  // Capture the receipt container element
  const receiptContainer = document.getElementById("listCard");

  // Use dom-to-image to convert the receipt container to an image
  domtoimage.toBlob(receiptContainer).then(function (blob) {
    // Save the image as a file using FileSaver.js
    saveAs(blob, "bill.png");
  });
});