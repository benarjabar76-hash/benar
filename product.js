const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (productId) {
    db.collection("products").doc(productId).get().then((doc) => {
        if (doc.exists) {
            const p = doc.data();
            document.getElementById("product-details").innerHTML = `
                <h1>${p.name}</h1>
                <p>${p.description}</p>
                <p>نرخ: $${p.price}</p>
                <!-- بەستەری ئەفیلیەیت ئەگەر هەبێت -->
                ${p.affiliateUrl ? `<a href="${p.affiliateUrl}" target="_blank" class="btn-aff">بکڕە لە ئامازۆن/عەلی ئێکسپرێس</a>` : ''}
            `;
        }
    });
}