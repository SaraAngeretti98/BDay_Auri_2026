function changeScene(nextScene) {
    const scene = document.getElementById("scene");
    scene.replaceChildren();
    nextScene(scene);
}

function createElement(tag, text = "") {
    const element = document.createElement(tag);
    if (text) {
        element.textContent = text;
    }
    return element;
}