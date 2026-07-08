// داتای نموونەیی بۆ کاڵاکان
let products = [
    { id: 1, name: "مۆبایلی ئایفۆن", price: 999, img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500" },
    { id: 2, name: "کاتژمێری زیرەک", price: 199, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" }
];

let currentLang = 'ku';
let currentAuthTab = 'login';
let editId = null;

// فەرهەنگی زمانەکان بۆ وەرگێڕان
const translations = {
    ku: {
        heroTitle: "بەخێربێن بۆ کۆگای بێنار",
        heroDesc: "باشترین و باوەڕپێکراوترین کاڵاکان لێرە بەدەست بهێنە",
        adminTitle: "زیادکردنی کاڵای نوێ",
        adminTitleEdit: "دەستکاریکردنی کاڵا",
        prodName: "ناوی کاڵا",
        prodPrice: "نرخ ($)",
        prodImg: "لینکی وێنەی کاڵا",
        addBtn: "زیادکردن",
        saveBtn: "پاشەکەوتکردن",
        productsTitle: "کاڵاکانی ئێستا",
        edit: "ئیدیت",
        delete: "سڕینەوە",
        login: "چوونەژوورەوە",
        register: "خۆتۆمارکردن",
        email: "ئیمەیڵ",
        pass: "وشەی نهێنی"
    },
    en: {
        heroTitle: "Welcome to Benar Shop",
        heroDesc: "Get the best and most reliable products here",
        adminTitle: "Add New Product",
        adminTitleEdit: "Edit Product",
        prodName: "Product Name",
        prodPrice: "Price ($)",
        prodImg: "Product Image Link",
        addBtn: "Add Product",
        saveBtn: "Save Changes",
        productsTitle: "Current Products",
        edit: "Edit",
        delete: "Delete",
        login: "Login",
        register: "Register",
        email: "Email",
        pass: "Password"
    }
};

// نیشاندانی کاڵاکان لەسەر شاشە
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-price">$${product.price}</div>
                <div class="card-actions">
                    <button class="edit-btn" onclick="editProduct(${product.id})">${translations[currentLang].edit}</button>
                    <button class="delete-btn" onclick="deleteProduct(${product.id})">${translations[currentLang].delete}</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// زیادکردن یان نوێکردنەوەی کاڵا
function addOrUpdateProduct() {
    const nameInput = document.getElementById('prod-name').value;
    const priceInput = document.getElementById('prod-price').value;
    const imgInput = document.getElementById('prod-img').value || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500";

    if (!nameInput || !priceInput) return alert("تکایە خانەکان پڕبکەرەوە");

    if (editId) {
        // ئەگەر لە دۆخی دەستکاریکردن بێت
        products = products.map(p => p.id === editId ? { ...p, name: nameInput, price: Number(priceInput), img: imgInput } : p);
        editId = null;
        document.getElementById('add-btn').innerText = translations[currentLang].addBtn;
        document.getElementById('admin-title').innerText = translations[currentLang].adminTitle;
    } else {
        // زیادکردنی نوێ
        const newProduct = {
            id: Date.now(),
            name: nameInput,
            price: Number(priceInput),
            img: imgInput
        };
        products.push(newProduct);
    }

    // پاککردنەوەی فۆرمەکە
    document.getElementById('prod-name').value = '';
    document.getElementById('prod-price').value = '';
    document.getElementById('prod-img').value = '';

    renderProducts();
}

// سڕینەوەی کاڵا
function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    renderProducts();
}

// ئامادەکاری بۆ دەستکاریکردن
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('prod-name').value = product.name;
    document.getElementById('prod-price').value = product.price;
    document.getElementById('prod-img').value = product.img;

    editId = id;
    document.getElementById('add-btn').innerText = translations[currentLang].saveBtn;
    document.getElementById('admin-title').innerText = translations[currentLang].adminTitleEdit;
}

// گۆڕینی زمان
function toggleLanguage() {
    currentLang = currentLang === 'ku' ? 'en' : 'ku';
    
    // گۆڕینی ئاڕاستەی پەڕە
    document.documentElement.dir = currentLang === 'ku' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;

    // نوێکردنەوەی نوسینەکان
    document.getElementById('lang-btn').innerText = currentLang === 'ku' ? 'English' : 'کوردی';
    document.getElementById('hero-title').innerText = translations[currentLang].heroTitle;
    document.getElementById('hero-desc').innerText = translations[currentLang].heroDesc;
    document.getElementById('admin-title').innerText = editId ? translations[currentLang].adminTitleEdit : translations[currentLang].adminTitle;
    document.getElementById('products-title').innerText = translations[currentLang].productsTitle;
    document.getElementById('add-btn').innerText = editId ? translations[currentLang].saveBtn : translations[currentLang].addBtn;

    // فۆرمی کاڵاكان
    document.getElementById('prod-name').placeholder = translations[currentLang].prodName;
    document.getElementById('prod-price').placeholder = translations[currentLang].prodPrice;
    document.getElementById('prod-img').placeholder = translations[currentLang].prodImg;

    renderProducts();
}

// بەڕێوەبردنی بەشی لۆگین و مۆداڵ
function openAuthModal() { document.getElementById('auth-modal').style.display = 'flex'; }
function closeAuthModal() { document.getElementById('auth-modal').style.display = 'none'; }

function switchAuthTab(tab) {
    currentAuthTab = tab;
    document.getElementById('tab-login').className = tab === 'login' ? 'active' : '';
    document.getElementById('tab-register').className = tab === 'register' ? 'active' : '';
    document.getElementById('auth-submit-btn').innerText = tab === 'login' ? translations[currentLang].login : translations[currentLang].register;
}

function handleAuth(e) {
    e.preventDefault();
    alert(currentAuthTab === 'login' ? "سەرکەوتووانە چوویتە ژوورەوە!" : "خۆتۆمارکردن سەرکەوتوو بوو!");
    closeAuthModal();
}

// یەکەم دەستپێکردنی سایتەکە
renderProducts();