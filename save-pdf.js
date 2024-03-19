async function printPDF(cart, name, phoneNumber) {
  const { PDFDocument, rgb } = PDFLib;

  const doc = await PDFDocument.create();
  const page = doc.addPage();

  let yOffset = page.getHeight() - 90;

  page.drawText("Product Details:", {
    x: 50,
    y: yOffset,
    size: 14,
    bold: true,
  });

  yOffset -= 20;

  let totalItemsPrice = 0;

  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.price * item.quantity;
    totalItemsPrice += itemTotalPrice;

    page.drawText(
      `- ${item.name} (${item.quantity} x $${item.price.toFixed(2)})`,
      {
        x: 70,
        y: yOffset,
        size: 12,
      }
    );
    page.drawText(`$${itemTotalPrice.toFixed(2)}`, {
      x: page.getWidth() - 100,
      y: yOffset,
      size: 12,
      alignment: "right",
    });

    yOffset -= 15;
  }

  page.drawText("Total Price:", {
    x: 50,
    y: yOffset,
    size: 14,
  });
  page.drawText(`$${totalItemsPrice.toFixed(2)}`, {
    x: page.getWidth() - 100,
    y: yOffset,
    size: 14,
    bold: true,
    alignment: "right",
  });

  page.drawText(`Name: ${name}`, {
    x: 50,
    y: yOffset - 40,
    size: 12,
  });

  page.drawText(`Phone Number: ${phoneNumber}`, {
    x: 50,
    y: yOffset - 60,
    size: 12,
  });

  const pdfBytes = await doc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "shopping_receipt.pdf";
  link.click();

  // Clear the listCard and update UI
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  for (const key in cart) {
    const value = cart[key];
    if (value != null) {
      count += value.quantity;
      let totalItemPrice = value.price * value.quantity;
      totalPrice += totalItemPrice;

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
      listCard.appendChild(newDiv);
    }
  }

  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}
