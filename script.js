// وەرگرتنی کاڵاکان لە فایربەیس
db.collection("products").onSnapshot((snapshot) => {
    let productsHtml = "";
    snapshot.forEach((doc) => {
        const product = doc.data();
        productsHtml += `
            <div class="product-card">
                <img src="${product.image || 'placeholder.jpg'}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>نرخ: $${product.price}</p>
                <p>بەش: ${product.category}</p>
                <a href="product.html?id=${doc.id}" class="btn">بینینی کاڵا</a>
            </div>
        `;
    });
    document.getElementById("products-display").innerHTML = productsHtml;
});

// سیستەمی گۆڕینی زمان (نموونە)
function switchLang(lang) {
    if(lang === 'en') {
        document.body.dir = "ltr";
        // لێرەدا دەتوانیت دەقەکان بگۆڕیت بۆ ئینگلیزی
    } else {
        document.body.dir = "rtl";
    }
}