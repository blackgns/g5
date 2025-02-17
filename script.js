document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    const numImages = 10; // Количество кадров (без дублирования)
    const repoURL = "https://blackgns.github.io/g5/"; // Путь к картинкам

    const images = [];
    const usedIndexes = new Set(); // Чтобы не дублировать изображения

    while (usedIndexes.size < numImages) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * numImages) + 1; // Случайный кадр от 1 до 10
        } while (usedIndexes.has(randomIndex));

        usedIndexes.add(randomIndex);

        const img = document.createElement("img");
        img.src = `${repoURL}frame${randomIndex}.jpg`;
        img.classList.add("image");
        img.setAttribute("data-fullsize", img.src); // Добавляем атрибут для клика

        container.appendChild(img);

        // Рандомное положение
        img.style.left = Math.random() * window.innerWidth + "px";
        img.style.top = Math.random() * window.innerHeight + "px";

        images.push({
            element: img,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speedX: (Math.random() - 0.5) * 1.5, // Меньшая скорость (было 4)
            speedY: (Math.random() - 0.5) * 1.5,
            isDragging: false
        });

        // Открытие полноразмерного изображения
        img.addEventListener("click", () => {
            const fullSizeImg = document.createElement("img");
            fullSizeImg.src = img.getAttribute("data-fullsize");
            fullSizeImg.classList.add("fullsize-image");
            document.body.appendChild(fullSizeImg);

            fullSizeImg.addEventListener("click", () => {
                fullSizeImg.remove(); // Закрываем картинку при клике
            });
        });

        img.addEventListener("mousedown", (event) => startDrag(event, img));
    }

    function animate() {
        images.forEach(img => {
            if (!img.isDragging) {
                img.x += img.speedX;
                img.y += img.speedY;

                if (img.x <= 0 || img.x >= window.innerWidth - 100) img.speedX *= -1;
                if (img.y <= 0 || img.y >= window.innerHeight - 100) img.speedY *= -1;

                img.element.style.left = img.x + "px";
                img.element.style.top = img.y + "px";
            }
        });

        requestAnimationFrame(animate);
    }

    animate();

    function startDrag(event, imgElement) {
        const imgObj = images.find(img => img.element === imgElement);
        if (!imgObj) return;

        imgObj.isDragging = true;
        let offsetX = event.clientX - imgElement.offsetLeft;
        let offsetY = event.clientY - imgElement.offsetTop;

        function onMouseMove(event) {
            imgObj.x = event.clientX - offsetX;
            imgObj.y = event.clientY - offsetY;
            imgElement.style.left = imgObj.x + "px";
            imgElement.style.top = imgObj.y + "px";
        }

        function onMouseUp() {
            imgObj.isDragging = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }
});