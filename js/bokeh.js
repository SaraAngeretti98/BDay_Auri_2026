function createBokeh() {
    const container = document.getElementById("bokeh-container");
    container.classList.add("active");
    container.replaceChildren();
    const numberOfDots = 57;
    const purples = [
        "rgba(210, 170, 255, 0.45)",
        "rgba(190, 150, 240, 0.35)",
        "rgba(230, 200, 255, 0.55)",
        "rgba(175, 130, 230, 0.30)",
        "rgba(220, 190, 255, 0.40)"
    ];

    for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement("span");
        dot.classList.add("bokeh-dot");
        // posizione
        dot.style.left = Math.random() * 100 + "%";
        dot.style.top = Math.random() * 100 + "%";
        // dimensione
        const size = Math.random() * 35 + 15;
        dot.style.width = size + "px";
        dot.style.height = size + "px";
        // colore
        dot.style.backgroundColor =
            purples[Math.floor(Math.random() * purples.length)];
        // profondità diversa
        dot.style.filter = `blur(${Math.random() * 2 + 1}px)`;
        // animazione non sincronizzata
        dot.style.animationDelay =
            Math.random() * 5 + "s";
        dot.style.animationDuration =
            Math.random() * 5 + 6 + "s";
        container.appendChild(dot);
    }
}

function removeBokeh() {
    const container = document.getElementById("bokeh-container");
    container.classList.remove("active");
    container.replaceChildren();
}