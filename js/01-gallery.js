import { galleryItems } from './gallery-items.js';
// Change code below this line

// 1.Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// 2.Реалізація делегування на div.gallery і отримання url великого зображення.
// 3.Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// 4.Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// 5.Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.

const galleryContainer = document.querySelector(".gallery");
const itemsMarkup = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", itemsMarkup);

galleryContainer.addEventListener("click", onGalleryItemClick);

function createGalleryItemsMarkup(galleryItems) {
    return galleryItems
    .map(({preview, original, description}) => {
        return `
        <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

function onGalleryItemClick(event) {
    event.preventDefault();
    
    if (event.target.nodeName !== "IMG") {
        return;
    }
    const galleryLink = event.target.dataset.source;
    
    const instance = basicLightbox.create(`<img src="${galleryLink}">`);
    instance.show();

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") instance.close();
    });
}
