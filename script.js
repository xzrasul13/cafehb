function renderProducts() {
    const container = document.getElementById("products-container");
    
    const categories = [
        { key: "drinks", title: "Напитки" },
        { key: "burgers", title: "Бургеры" },
        { key: "sandwiches", title: "Сендвичи" },
        { key: "salads", title: "Салаты" },
        { key: "dishes", title: "Блюда" },
        { key: "breakfast", title: "Завтраки" }
    ];

    categories.forEach(category => {
        if (products[category.key] && products[category.key].length > 0) {
            // Создаем секцию
            const section = document.createElement("section");
            section.className = "category-section";
            section.setAttribute("data-category", category.key);
            
            const title = document.createElement("h2");
            title.className = "category-title";
            title.textContent = category.title;
            section.appendChild(title);
            
            // Создаем контейнер для карточек
            const cardsContainer = document.createElement("div");
            cardsContainer.className = "cards-container";
            
            // Добавляем карточки
            products[category.key].forEach(product => {
                const card = document.createElement("div");
                card.className = `card ${product.size === 'mini' ? 'card-mini' : ''}`;

                // Генерируем безопасный id для popover (префикс категории + заменяем пробелы)
                const safeId = (category.key + '-' + product.id).replace(/\s+/g, '-');
                
                const button = document.createElement("button");
                button.className = "popUp-btn";
                button.setAttribute("popovertarget", safeId);

                // Popup
                const popup = document.createElement("div");
                popup.className = "popUp-style";
                popup.setAttribute("popover", "");
                popup.id = safeId;

                const popupImg = document.createElement("img");
                popupImg.src = product.image;
                popupImg.alt = product.name;

                const popupH3 = document.createElement("h3");
                popupH3.innerHTML = `${product.name} <br>${product.price}c`;

                popup.appendChild(popupImg);
                popup.appendChild(popupH3);
                button.appendChild(popup);

                // Карточка
                const img = document.createElement("img");
                img.src = product.image;
                img.alt = product.name;

                const h3 = document.createElement("h3");
                h3.textContent = product.name;

                button.appendChild(img);
                button.appendChild(h3);

                card.appendChild(button);
                cardsContainer.appendChild(card);
            });
            
            section.appendChild(cardsContainer);
            container.appendChild(section);
        }
    });
}

function filterByCategory(categoryKey) {
    const sections = document.querySelectorAll(".category-section");
    sections.forEach(section => {
        if (categoryKey === "all" || section.getAttribute("data-category") === categoryKey) {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const mainNav = document.querySelector(".mainNav");

    if (burgerMenu && mainNav) {
        burgerMenu.addEventListener("click", () => {
            mainNav.classList.toggle("active");
            burgerMenu.classList.toggle("open");
        });
    }
    
    // Генерируем товары
    renderProducts();
    
    // Обработчик клика на пункты меню
    document.querySelectorAll(".mainNav a[data-category]").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const category = link.getAttribute("data-category");
            filterByCategory(category);
            
            // Закрываем мобильное меню если открыто
            mainNav.classList.remove("active");
            burgerMenu.classList.remove("open");
        });
    });
});