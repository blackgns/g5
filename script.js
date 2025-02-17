body {
    margin: 0;
    overflow: hidden;
    background-color: black;
}

.container {
    position: relative;
    width: 100vw;
    height: 100vh;
}

.image {
    position: absolute;
    width: 100px; /* Размер изображений */
    height: auto;
    opacity: 0.8;
    cursor: grab;
    transition: transform 0.2s;
}

.image:active {
    cursor: grabbing;
    transform: scale(1.1);
}