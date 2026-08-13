function createBokeh() {
    const container = document.getElementById("bokeh-container");
    container.classList.add("active");
    container.replaceChildren();

    const numberOfDots = 69;

    const icyColors = [
        "rgba(255, 255, 255, 0.60)",
        "rgba(220, 238, 248, 0.50)",
        "rgba(205, 229, 242, 0.40)",
        "rgba(235, 246, 250, 0.55)",
        "rgba(195, 222, 238, 0.35)"
    ];

    for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement("span");
        dot.classList.add("bokeh-dot");

        // posizione
        dot.style.left = Math.random() * 100 + "%";
        dot.style.top = Math.random() * 100 + "%";

        // dimensione
        const size = Math.random() * 40 + 12;
        dot.style.width = size + "px";
        dot.style.height = size + "px";

        // colore
        dot.style.backgroundColor =
            icyColors[Math.floor(Math.random() * icyColors.length)];

        // sfocatura
        dot.style.filter = `blur(${Math.random() * 3 + 1}px)`;

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