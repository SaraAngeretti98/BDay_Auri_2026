// INTRO: HI AURI E TASTO CON GRADIENTE AZZURRO E GIALLINO
function showIntroScene(scene) {
    scene.classList.add("scene-intro");
    setBackground("bg-intro");
    createBokeh();

    const title = createElement("h1", "Hello, Auri! 🤍");
    const message = createElement("p", "I got a little something for my favourite sweet, sweet angel.");
    const button = createElement("button", "Show me!");

    title.classList.add("scene-title");
    message.classList.add("scene-message");
    button.classList.add("primary-button");

    button.addEventListener("click", () => {
        changeScene(showGoOnScene);
    });

    scene.append(title, message, button);
}

// SCENA "TOO EARLY O BIRTHDAY?": TASTO GO ON E FIOCCHI DI NEVE
// funzione di supporto per la verifica della data
function getBirthdayStatus() {
    // const now = new Date();
    const now = testBirthdayDate;
    
    const californiaDate = new Intl.DateTimeFormat("en-US", {
        timeZone: birthdayTimezone,
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }).formatToParts(now);
    
    const year = Number(
        californiaDate.find(part => part.type === "year").value
    );
    
    const month = Number(
        californiaDate.find(part => part.type === "month").value
    );
    
    const day = Number(
        californiaDate.find(part => part.type === "day").value
    );
    
    if (year === birthdayYear && month === birthdayMonth + 1 && day === birthdayDay) {
        return "birthday";
    }

    if (year > birthdayYear ||
        (year === birthdayYear && month > birthdayMonth + 1) ||
        (year === birthdayYear && month === birthdayMonth + 1 && day > birthdayDay)) {
        return "after";
    }

    return "before";
}

// funzioni di supporto per il countdown
function getBirthdayTimestamp() {
    const target = new Date(
        Date.UTC(
            birthdayYear,
            birthdayMonth,
            birthdayDay,
            0,
            0,
            0
        )
    );
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: birthdayTimezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    });
    const parts = formatter.formatToParts(target);
    const getPart = (type) => Number(parts.find(part => part.type === type).value);
    const localTarget = {
        year: getPart("year"),
        month: getPart("month"),
        day: getPart("day"),
        hour: getPart("hour"),
        minute: getPart("minute"),
        second: getPart("second")
    };
    const offsetTarget = Date.UTC(
        localTarget.year,
        localTarget.month - 1,
        localTarget.day,
        localTarget.hour,
        localTarget.minute,
        localTarget.second
    );
    const offset = offsetTarget - target.getTime();
    return target.getTime() - offset;
}

function getBirthdayCountdown() {
    const difference = getBirthdayTimestamp() - Date.now();
    if (difference <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0
        };
    }
    const totalMinutes = Math.floor(difference / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;
    return {days, hours, minutes};
}

function showGoOnScene(scene) {
    scene.classList.add("scene-go-on");
    setBackground("bg-go-on");
    
    const snowContainer = createElement("div");
    snowContainer.classList.add("snow-container");
    
    for (let i = 0; i < 169; i++) {
        const snowflake = createElement("span", "❄");
        snowflake.classList.add("snowflake");
        
        const position = (i / 169) * 100 + (Math.random() * 2 - 1);
        snowflake.style.left = `${position}%`;
        snowflake.style.animationDelay = `${Math.random() * -30}s`;
        
        const size = 0.5 + Math.random() * 0.5;
        snowflake.style.fontSize = `${size}rem`;
        
        const duration = 15 + Math.random() * 35;
        snowflake.style.animationDuration = `${duration}s`;
        
        snowflake.style.opacity = `${0.4 + Math.random() * 0.5}`;
        snowflake.style.filter = `blur(${Math.random() * 1.2}px)`;
        
        snowContainer.append(snowflake);
    }
    
    const button = createElement("button", "Go on!");
    button.classList.add("primary-button");
    
    button.addEventListener("click", () => {
        // const birthdayStatus = getBirthdayStatus();
        // if (birthdayStatus === "birthday" || birthdayStatus === "after") {
        //     changeScene(showOnTimeScene);
        // } else {
        //     changeScene(showTooEarlyScene);
        // }
        
        // testing
        changeScene(showSnowglobeScene);
    });
    
    const snowFrameContainer = createElement("div");
    snowFrameContainer.classList.add("snow-frame-container");

    const snowFrameTop = createElement("img");
    snowFrameTop.src = "assets/images/snow-frame-top.png";
    snowFrameTop.classList.add("snow-frame-top");

    const snowFrameBottom = createElement("img");
    snowFrameBottom.src = "assets/images/snow-frame-bottom.png";
    snowFrameBottom.classList.add("snow-frame-bottom");

    snowFrameContainer.append(snowFrameTop, snowFrameBottom);
    
    scene.append(snowContainer, button, snowFrameContainer);
}

// funzione di supporto per creazione calendari per scena "Too Early"
function createCalendar(timezone, label) {
    const wrapper = createElement("div");
    wrapper.classList.add("calendar-wrapper");
    
    const labelElement = createElement("div", label);
    labelElement.classList.add("calendar-label");
    
    const calendar = createElement("div");
    calendar.classList.add("calendar");
    
    const calendarTop = createElement("div");
    calendarTop.classList.add("calendar-top");
    
    const paper = createElement("div");
    paper.classList.add("calendar-paper");
    
    const monthElement = createElement("div");
    monthElement.classList.add("calendar-month");
    
    const dayElement = createElement("div");
    dayElement.classList.add("calendar-day");
    
    const now = new Date();
    
    const monthFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        month: "long"
    });
    
    const dayFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        day: "numeric"
    });
    
    monthElement.textContent = monthFormatter.format(now).toUpperCase();
    dayElement.textContent = dayFormatter.format(now);
    
    paper.append(monthElement, dayElement);
    calendar.append(calendarTop, paper);
    wrapper.append(labelElement, calendar);
    
    return wrapper;
}

// SCENA TOO EARLY: TASTO GO ON E FRASI E SNOW ANGELING BUNNY
function showTooEarlyScene(scene) {
    scene.classList.add("scene-too-early");
    setBackground("bg-too-early");
    
    const textsContainer = createElement("div");
    textsContainer.classList.add("texts-container");

    const title = createElement("h1", "You're here too early! 🥺");
    title.classList.add("scene-title");

    const bgSnowAngel = createElement("img");
    bgSnowAngel.src = "assets/images/bg-snow-angel3.png";
    bgSnowAngel.classList.add("snow-angel-bg");

    const bunnySnowAngel1 = createElement("img");
    bunnySnowAngel1.src = "assets/images/bunny-snow-angel1b.png";
    bunnySnowAngel1.classList.add("snow-angel-bunny-one");

    const bunnySnowAngel2 = createElement("img");
    bunnySnowAngel2.src = "assets/images/bunny-snow-angel2b.png";
    bunnySnowAngel2.classList.add("snow-angel-bunny-two", "is-hidden");

    const countdown = getBirthdayCountdown();
    const countdownText = createElement(
        "p",
        `${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes
        'til your Californian birthday...`
    );
    
    countdownText.classList.add("countdown-text");

    const message = createElement("p", earlyMessages[0]);
    message.classList.add("scene-message");

    const button = createElement("button", "Go on!");
    button.classList.add("primary-button");

    textsContainer.append(countdownText, title, message, button);

    const calendarsContainer = createElement("div");
    calendarsContainer.classList.add("calendars-container");

    const myCalendar = createCalendar("Europe/Rome", "WITH ME");
    const aaronCalendar = createCalendar("America/Los_Angeles", "WITH AARON");

    calendarsContainer.append(myCalendar, aaronCalendar);

    scene.append(calendarsContainer, textsContainer, bgSnowAngel, bunnySnowAngel1, bunnySnowAngel2);

    // contatore click + logica click
    let clickCount = 0;

    button.addEventListener("click", () => {
        clickCount++;
    
        message.textContent = earlyMessages[clickCount % earlyMessages.length];
    
        bunnySnowAngel1.classList.toggle("is-hidden");
        bunnySnowAngel2.classList.toggle("is-hidden");
    });
}

// SCENA RIGHT ON TIME: SE GIORNO == BDAY, "IT'S YOUR BDAY!", ALTRIMENTI SUCCESSIVAMENTE "HEY, YOU'RE BACK!"
function showOnTimeScene(scene) {
    scene.classList.add("scene-on-time");
    setBackground("bg-on-time");
    
    const calendarsContainer = createElement("div");
    calendarsContainer.classList.add("calendars-container");

    const myCalendar = createCalendar("Europe/Rome", "WITH ME");
    const aaronCalendar = createCalendar("America/Los_Angeles", "WITH AARON");

    calendarsContainer.append(myCalendar, aaronCalendar);

    // titolo
    const title = createElement("h1");
    const birthdayStatus = getBirthdayStatus();
    if (birthdayStatus === "birthday") {
        title.textContent = "Hey! It's your birthday!! 😍🥳🎁";
    } else {
        title.textContent = "Hey! You're back!! 🥰🥰✨";
    }
    title.classList.add("scene-title");

    const whiteCloudsContainer = createElement("div");
    whiteCloudsContainer.classList.add("white-clouds-container");

    const whiteCloud1 = createElement("img");
    whiteCloud1.src = "assets/images/cloud-white1.png";
    whiteCloud1.classList.add("white-cloud1");

    const whiteCloud2 = createElement("img");
    whiteCloud2.src = "assets/images/cloud-white1.png";
    whiteCloud2.classList.add("white-cloud2");

    whiteCloudsContainer.append(title, whiteCloud1, whiteCloud2);

    const bunnyWaving1 = createElement("img");
    bunnyWaving1.src = "assets/images/bunny-waving1b.png";
    bunnyWaving1.classList.add("waving-bunny-one");

    const bunnyWaving2 = createElement("img");
    bunnyWaving2.src = "assets/images/bunny-waving2b.png";
    bunnyWaving2.classList.add("waving-bunny-two", "is-hidden");

    const bunnyWavingText = createElement("img");
    bunnyWavingText.src = "assets/images/bunny-waving-hi-text1c.png";
    bunnyWavingText.classList.add("waving-bunny-text");
    
    const button = createElement("button", "Let's go!");
    button.classList.add("primary-button");
    
    button.addEventListener("click", () => {
        changeScene(showBalloonsScene);
    });
    
    // animazione bunny
    const waveInterval = setInterval(() => {
        bunnyWaving1.classList.toggle("is-hidden");
        bunnyWaving2.classList.toggle("is-hidden");
    }, 375);
    
    const bunnyAndButtonContainer = createElement("div");
    bunnyAndButtonContainer.classList.add("bunny-and-button-container");

    bunnyAndButtonContainer.append(bunnyWaving1, bunnyWaving2, bunnyWavingText, button);

    scene.append(calendarsContainer, whiteCloudsContainer, bunnyAndButtonContainer);
}

// SCENA "BALLOONS": CORNICE, MASCHERA, TORTA
// funzione di supporto per la creazione della maschera per i palloncini
function createBalloonGrid(mask) {
    const columns = 6;
    const rows = 9;
    const points = [];
    const gridWidth = 100;
    const gridHeight = 100;
    for (let row = 0; row < rows; row++) {
        const isOffsetRow = row % 2 !== 0;
        for (let column = 0; column < columns; column++) {
            let x = (column / (columns - 1)) * gridWidth;
            const y = (row / (rows - 1)) * gridHeight;
            if (isOffsetRow) {
                x += (gridWidth / (columns - 1)) / 2;
            }
            points.push({ x, y });
        }
    }
    return points;
}

// funzione di supporto per la creazione dei palloncini
function createBalloons(mask, points, onComplete) {
    let poppedBalloons = 0;
    const activeBalloons = new Set();
    const shuffledPoints = [...points];
    shuffledPoints.sort(() => Math.random() - 0.5);
    shuffledPoints.forEach((point, index) => {
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * balloonImages.length);
            const balloon = createElement("img");
            balloon.src = balloonImages[randomIndex];
            balloon.classList.add("balloon");
            balloon.style.left = `${point.x}%`;
            balloon.style.top = `${point.y}%`;
            activeBalloons.add(balloon);
            balloon.addEventListener("click", () => {
                poppedBalloons++;                      
                balloon.remove(); 
                activeBalloons.delete(balloon);
                if (poppedBalloons === 9) {
                    activeBalloons.forEach(balloon => {
                        balloon.classList.add("balloon-fade-out");
                    });
                    setTimeout(() => {
                        onComplete();
                    }, 750);
                }           
            });
            mask.append(balloon);
        }, 1250 + index * 125);
    });
}

function showBalloonsScene(scene) {
    scene.classList.add("scene-balloons");
    setBackground("bg-balloons");
    
    const title = createElement("h1", "Pop the balloons!");
    title.classList.add("scene-title", "is-hidden-with-fade");
    
    const frameMaskBalloonsContainer = createElement("div");
    frameMaskBalloonsContainer.classList.add("frame-and-mask-and-balloons-container");

    const balloonMask = createElement("div");
    balloonMask.classList.add("balloon-mask");
    
    const frameBack = createElement("div");
    frameBack.classList.add("frame-back", "bg-cake");
    
    const frameFront = createElement("img");
    frameFront.src = "assets/images/frame1c.png";
    frameFront.classList.add("frame-front");
    
    const birthdayStatus = getBirthdayStatus();

    if (birthdayStatus === "birthday") {
        // la torta
        const cake = createElement("img");
        cake.src = "assets/images/cake.png";
        cake.classList.add("cake-balloon-scene", "is-hidden-with-fade");
        
        frameMaskBalloonsContainer.append(frameBack, frameFront, balloonMask, cake);
        
        const balloonGrid = createBalloonGrid(balloonMask);
        
        setTimeout(() => {
            title.classList.remove("is-hidden-with-fade");
            cake.classList.remove("is-hidden-with-fade");
        }, 1250 + (balloonGrid.length - 1) * 125 + 250);
        
        createBalloons(balloonMask, balloonGrid, () => {
            title.textContent = "Good job!";
            setTimeout(() => {
                title.classList.add("is-hidden-with-fade");
                frameFront.classList.add("is-hidden-with-fade");
                cake.classList.add("cake-zoom");
                frameBack.classList.add("cake-bg-zoom");

                setTimeout(() => {
                    changeScene(showCakeScene);
                }, 1250);
            }, 1250);
        });    
    } else {
        // lo snowglobe
        const snowglobe = createElement("img");
        snowglobe.src = "assets/images/snowglobe.png";
        snowglobe.classList.add("snowglobe-balloon-scene", "is-hidden-with-fade");
        
        frameMaskBalloonsContainer.append(frameBack, frameFront, balloonMask, snowglobe);
        
        const balloonGrid = createBalloonGrid(balloonMask);
        
        setTimeout(() => {
            title.classList.remove("is-hidden-with-fade");
            snowglobe.classList.remove("is-hidden-with-fade");
        }, 1250 + (balloonGrid.length - 1) * 125 + 250);
        
        createBalloons(balloonMask, balloonGrid, () => {
            title.textContent = "Good job!";
            setTimeout(() => {
                title.classList.add("is-hidden-with-fade");
                frameFront.classList.add("is-hidden-with-fade");
                snowglobe.classList.add("snowglobe-zoom");
                frameBack.classList.add("snowglobe-bg-zoom");
    
                setTimeout(() => {
                    changeScene(showSnowglobeScene);
                }, 1250);
            }, 1250);
        });
    
    }
    
    scene.append(frameMaskBalloonsContainer, title);
}

// SCENA CAKE: SE GIORNO == BDAY, TORTA CON LE CANDELINE, ALTRIMENTI SUCCESSIVAMENTE DIRETTAMENTE LO SNOWGLOBE
// funzione di supporto per la creazione delle candeline
function createCandle(position) {
    const candleContainer = createElement("div");
    candleContainer.classList.add("single-candle-container");
    
    candleContainer.style.left = `${position}%`;
    
    const candle = createElement("img");
    candle.src = "assets/images/candle.png";
    candle.classList.add("candle");
    
    const flame = createElement("img");
    flame.src = "assets/images/flame.png";
    flame.classList.add("flame");
    
    candleContainer.append(candle, flame);
    
    return {
        element: candleContainer,
        flame: flame
    };
}

// funzione di supporto per l'accensione delle candeline
function relightRandomCandle(candles) {
    const unlitCandles = candles.filter(
        candle => candle.flame.style.display === "none"
    );
    const randomIndex = Math.floor(Math.random() * unlitCandles.length);
    const candle = unlitCandles[randomIndex];
    candle.flame.style.display = "block";
}

function showCakeScene(scene) {
    scene.classList.add("scene-cake");
    setBackground("bg-empty");
    
    const title = createElement("h1", "Blow ALLLLLL the candles out!");
    title.classList.add("scene-title", "is-hidden-with-fade");
    
    const message = createElement("p", "Touch them to blow them out 😉👉🏼💨");
    message.classList.add("scene-message", "is-hidden-with-fade");
    
    const fakeBg = createElement("div");
    fakeBg.classList.add("fake-cake-bg", "bg-cake");
    
    const cakeAndCandlesContainer = createElement("div");
    cakeAndCandlesContainer.classList.add("cake-and-candles-container");
    
    // la torta
    const cake = createElement("img");
    cake.src = "assets/images/cake.png";
    cake.classList.add("cake-cake-scene");
    
    cakeAndCandlesContainer.append(cake);
    
    const candles = [];
    const candlePositions = [30, 38, 46, 54, 62, 70];
    
    candlePositions.forEach(position => {
        const candle = createCandle(position);
        candles.push(candle);
        cakeAndCandlesContainer.append(candle.element);
    });
    
    const explodingCakeContainer = createElement("div");
    explodingCakeContainer.classList.add("exploding-cake-container", "is-hidden-with-fade");
    
    const snow1 = createElement("img");
    snow1.src = "assets/images/snow1.png";
    snow1.classList.add("snow1-cake-scene");
    
    const snow2 = createElement("img");
    snow2.src = "assets/images/snow2.png";
    snow2.classList.add("snow2-cake-scene");
    
    const snow3 = createElement("img");
    snow3.src = "assets/images/snow3.png";
    snow3.classList.add("snow3-cake-scene");
    
    const snow4 = createElement("img");
    snow4.src = "assets/images/snow4.png";
    snow4.classList.add("snow4-cake-scene");
    
    const snow5 = createElement("img");
    snow5.src = "assets/images/snow5.png";
    snow5.classList.add("snow5-cake-scene");
    
    const snow6 = createElement("img");
    snow6.src = "assets/images/snow6.png";
    snow6.classList.add("snow6-cake-scene");
    
    explodingCakeContainer.append(snow1, snow2, snow3, snow4, snow5, snow6);
    
    const snowglobeContainer = createElement("div");
    snowglobeContainer.classList.add("snowglobe-cake-scene-container", "is-hidden-with-fade");
    
    const snowglobe = createElement("img");
    snowglobe.src = "assets/images/snowglobe.png";
    snowglobe.classList.add("snowglobe-cake-scene");
    
    const snowglobeGlass = createElement("img");
    snowglobeGlass.src = "assets/images/snowglobe-glass.png";
    snowglobeGlass.classList.add("snowglobe-cake-scene-glass");
    
    const snowglobeBase = createElement("img");
    snowglobeBase.src = "assets/images/snowglobe-base.png";
    snowglobeBase.classList.add("snowglobe-cake-scene-base");
    
    snowglobeContainer.append(snowglobe, snowglobeGlass, snowglobeBase);
    
    let candlesLeft = 6;
    let prankCount = 0;
    const maxPranks = 3;
    
    candles.forEach(candle => {
        candle.element.addEventListener("click", () => {
            if (candle.flame.style.display === "none") {
                return;
            }
            candle.flame.style.display = "none";
            candlesLeft--;
            if (candlesLeft === 0) {
                prankCount++;
                if (prankCount <= maxPranks) {
                    setTimeout(() => {
                        relightRandomCandle(candles);
                        candlesLeft = 1;
                    }, 750);
                } else {
                    setTimeout(() => {
                        title.classList.add("is-hidden-with-fade");
                        message.classList.add("is-hidden-with-fade");
                        cakeAndCandlesContainer.classList.add("cake-wobble");
                    }, 1250);
                    cakeAndCandlesContainer.addEventListener("animationend", () => {
                        // qui parte la neve
                        explodingCakeContainer.classList.remove("is-hidden-with-fade");
                        explodingCakeContainer.classList.add("exploding-cake-zoom");
                        
                        setTimeout(() => {
                            cakeAndCandlesContainer.classList.add("is-hidden");
                            snowglobeContainer.classList.remove("is-hidden-with-fade");
                            setTimeout(() => {
                                explodingCakeContainer.classList.add("snow-disappear-one-by-one");
                                cakeAndCandlesContainer.addEventListener("animationend", () => {
                                    changeScene(showSnowglobeScene);
                                }, { once: true });
                            }, 1250);
                        }, 875);
                    }, { once: true });
                }
            }
        });
    });

    cakeAndCandlesContainer.append(title, message);
    
    title.classList.remove("is-hidden-with-fade");
    message.classList.remove("is-hidden-with-fade");

    scene.append(cakeAndCandlesContainer, fakeBg, snowglobeContainer, explodingCakeContainer);
}

// SCENA SNOWGLOBE CON LETTERA
// funzione di supporto per la neve della palla di neve
function createSnowflakes(mask) {
    const maskHeight = mask.offsetHeight;
    for (let i = 0; i < 169; i++) {
        const snowflake = document.createElement("img");
        snowflake.classList.add("snowflake");
        snowflake.src = snowflakeImages[Math.floor(Math.random() * snowflakeImages.length)];

        if ((Math.random() > 0.4) && (Math.random() < 0.6)) {
            snowflake.classList.add("snowflake-white");
        }
        else if ((Math.random() > 0.6) && (Math.random() < 1)) {
            snowflake.classList.add("snowflake-white");
        }

        const size = 2 + Math.random() * 4;
        snowflake.style.width = `${size}vw`;

        //posizionamento nella maschera
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * 45;
        const x = 50 + Math.cos(angle) * radius;
        snowflake.style.left = `${x}%`;
        // const y = 50 + Math.sin(angle) * radius;
        // posizione iniziale sotto la maschera
        const y = 100 + Math.random() * 20;
        snowflake.style.top = `${y}%`;
        // altezza di salita individuale con riferimento all'altezza della maschera
        const rise = maskHeight * (0.45 + Math.random() * 0.6);
        // rotazione individuale
        const rotation = (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360);
        // durata individuale
        const duration = 1.8 + Math.random() * 0.6;
        snowflake.style.setProperty("--rise", `${rise}px`);
        snowflake.style.setProperty("--rotation", `${rotation}deg`);
        snowflake.style.setProperty("--duration", `${duration}s`);

        mask.append(snowflake);
    }
}

// funzione di supporto per animare la neve della palla di neve
function shakeSnow(mask) {
    const snowflakes = mask.querySelectorAll(".snowflake");
    snowflakes.forEach(snowflake => {
        snowflake.classList.remove("is-shaking");
        void snowflake.offsetWidth;
        snowflake.classList.add("is-shaking");
    });
}

// funzione di supporto per animare la palla di neve
function wobbleSnowglobe(container) {
    container.classList.remove("snowglobe-wobble");
    void container.offsetWidth;
    container.classList.add("snowglobe-wobble");
}

function showSnowglobeScene(scene) {
    scene.classList.add("scene-snowglobe");
    setBackground("bg-empty");
    
    let snowglobeClicks = 0;

    const fakeBg = createElement("div");
    fakeBg.classList.add("fake-snowglobe-bg", "bg-snowglobe");
    
    const snowglobeContainer = createElement("div");
    snowglobeContainer.classList.add("snowglobe-snowglobe-scene-container");
    
    const snowglobe = createElement("img");
    snowglobe.src = "assets/images/snowglobe.png";
    snowglobe.classList.add("snowglobe-snowglobe-scene");
    
    const snowglobeGlass = createElement("img");
    snowglobeGlass.src = "assets/images/snowglobe-glass.png";
    snowglobeGlass.classList.add("snowglobe-snowglobe-scene-glass");
    
    const snowglobeNoGlass = createElement("img");
    snowglobeNoGlass.src = "assets/images/snowglobe-no-glass.png";
    snowglobeNoGlass.classList.add("snowglobe-snowglobe-scene-no-glass");
    
    const snowglobeGlassCracked1 = createElement("img");
    snowglobeGlassCracked1.src = "assets/images/snowglobe-glass-cracked1.png";
    snowglobeGlassCracked1.classList.add("snowglobe-snowglobe-scene-glass-cracked1");
    
    const snowglobeGlassCracked2 = createElement("img");
    snowglobeGlassCracked2.src = "assets/images/snowglobe-glass-cracked2.png";
    snowglobeGlassCracked2.classList.add("snowglobe-snowglobe-scene-glass-cracked2");
    
    const snowglobeGlassBrokenFull = createElement("img");
    snowglobeGlassBrokenFull.src = "assets/images/snowglobe-glass-broken-full.png";
    snowglobeGlassBrokenFull.classList.add("snowglobe-snowglobe-scene-glass-broken-full");
    
    const snowglobeGlassBrokenLeft = createElement("img");
    snowglobeGlassBrokenLeft.src = "assets/images/snowglobe-glass-broken-left.png";
    snowglobeGlassBrokenLeft.classList.add("snowglobe-snowglobe-scene-glass-broken-left");

    const snowglobeGlassBrokenRight = createElement("img");
    snowglobeGlassBrokenRight.src = "assets/images/snowglobe-glass-broken-right.png";
    snowglobeGlassBrokenRight.classList.add("snowglobe-snowglobe-scene-glass-broken-right");
    
    const snowglobeBase = createElement("img");
    snowglobeBase.src = "assets/images/snowglobe-base.png";
    snowglobeBase.classList.add("snowglobe-snowglobe-scene-base");
    
    snowglobeContainer.append(snowglobe, snowglobeBase, snowglobeGlass, snowglobeNoGlass, snowglobeGlassCracked1, snowglobeGlassCracked2, snowglobeGlassBrokenFull, snowglobeGlassBrokenLeft, snowglobeGlassBrokenRight);
    
    const snowglobeMask = createElement("div");
    snowglobeMask.classList.add("snowglobe-mask");
    
    snowglobeContainer.append(snowglobeMask);

    scene.append(fakeBg, snowglobeContainer);
    
    createSnowflakes(snowglobeMask);

    fakeBg.classList.add("bg-snowglobe-dark");
    
    snowglobeGlassCracked1.classList.add("is-hidden");
    snowglobeGlassCracked2.classList.add("is-hidden");
    snowglobeGlassBrokenFull.classList.add("is-hidden");
    snowglobeGlassBrokenLeft.classList.add("is-hidden");
    snowglobeGlassBrokenRight.classList.add("is-hidden");

    snowglobeContainer.addEventListener("click", () => {
        snowglobeClicks++;
        
        if (snowglobeClicks < 7) {
            shakeSnow(snowglobeMask);
            wobbleSnowglobe(snowglobeContainer);
        }

        if (snowglobeClicks === 3) {
            snowglobeGlass.classList.add("is-hidden");
            snowglobeGlassCracked1.classList.remove("is-hidden");
        }

        if (snowglobeClicks === 4) {
            snowglobeGlassCracked1.classList.add("is-hidden");
            snowglobeGlassCracked2.classList.remove("is-hidden");
        }

        if (snowglobeClicks === 5) {
            snowglobeGlassCracked2.classList.add("is-hidden");
            snowglobeGlassBrokenFull.classList.remove("is-hidden");
        }

        if (snowglobeClicks === 6) {
            snowglobeGlassBrokenFull.classList.add("is-hidden");
            snowglobeGlassBrokenLeft.classList.remove("is-hidden");
            snowglobeGlassBrokenRight.classList.remove("is-hidden");
        }
    });






}







function setBackground(background) {
    document.body.classList.remove(
        "bg-intro",
        "bg-go-on",
        "bg-too-early",
        "bg-on-time",
        "bg-balloons",
        "bg-cake",
        "bg-empty"
    );
    removeBokeh();
    document.body.classList.add(background);
}