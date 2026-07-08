document.getElementById("add-product-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("p-name").value;
    const price = parseFloat(document.getElementById("p-price").value);
    const category = document.getElementById("p-category").value;
    const affiliateUrl = document.getElementById("p-affiliate").value;
    
    // حیسابکردنی کۆمسیۆن (بۆ نموونە 10%)
    const commission = price * 0.10;
    const sellerEarnings = price - commission;

    db.collection("products").add({
        name: name,
        price: price,
        category: category,
        affiliateUrl: affiliateUrl,
        commission: commission,
        sellerEarnings: sellerEarnings,
        status: "pending" // پێویستی بە ڕەزامەندی ئەدمینە
    }).then(() => {
        alert("کاڵاکە بە سەرکەوتوویی زیادکرا و چاوەڕێی ڕەزامەندییە!");
        document.getElementById("add-product-form").reset();
    });
});