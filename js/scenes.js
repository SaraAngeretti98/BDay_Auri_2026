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
    const now = new Date();
    // const now = testBirthdayDate;
    
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
        const birthdayStatus = getBirthdayStatus();
        if (birthdayStatus === "birthday" || birthdayStatus === "after") {
            changeScene(showOnTimeScene);
        } else {
            changeScene(showTooEarlyScene);
        }
        
        // // testing
        // changeScene(showCakeScene);
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
        const snowglobeContainer = createElement("div");
        snowglobeContainer.classList.add("snowglobe-snowglobe-scene-container", "is-hidden-with-fade");
        
        const snowglobeGlass = createElement("img");
        snowglobeGlass.src = "assets/images/snowglobe-glass.png";
        snowglobeGlass.classList.add("snowglobe-snowglobe-scene-glass");
        
        const snowglobeNoGlass = createElement("img");
        snowglobeNoGlass.src = "assets/images/snowglobe-no-glass.png";
        snowglobeNoGlass.classList.add("snowglobe-snowglobe-scene-no-glass");
        
        const snowglobeBase = createElement("img");
        snowglobeBase.src = "assets/images/snowglobe-base.png";
        snowglobeBase.classList.add("snowglobe-snowglobe-scene-base");
        
        snowglobeContainer.append(snowglobeBase, snowglobeGlass, snowglobeNoGlass);
        
        frameMaskBalloonsContainer.append(frameBack, frameFront, balloonMask, snowglobeContainer);
        
        const balloonGrid = createBalloonGrid(balloonMask);
        
        setTimeout(() => {
            title.classList.remove("is-hidden-with-fade");
            snowglobeContainer.classList.remove("is-hidden-with-fade");
        }, 1250 + (balloonGrid.length - 1) * 125 + 250);
        
        createBalloons(balloonMask, balloonGrid, () => {
            title.textContent = "Good job!";
            setTimeout(() => {
                title.classList.add("is-hidden-with-fade");
                frameFront.classList.add("is-hidden-with-fade");
                snowglobeContainer.classList.add("snowglobe-zoom");
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
    
    // SNOWGLOBE
    const snowglobeContainer = createElement("div");
    snowglobeContainer.classList.add("snowglobe-snowglobe-scene-container", "is-hidden-with-fade");
    
    const snowglobe = createElement("img");
    snowglobe.src = "assets/images/snowglobe.png";
    snowglobe.classList.add("snowglobe-snowglobe-scene");
    
    const snowglobeGlass = createElement("img");
    snowglobeGlass.src = "assets/images/snowglobe-glass.png";
    snowglobeGlass.classList.add("snowglobe-snowglobe-scene-glass");
    
    const snowglobeNoGlass = createElement("img");
    snowglobeNoGlass.src = "assets/images/snowglobe-no-glass.png";
    snowglobeNoGlass.classList.add("snowglobe-snowglobe-scene-no-glass");
    
    const snowglobeBase = createElement("img");
    snowglobeBase.src = "assets/images/snowglobe-base.png";
    snowglobeBase.classList.add("snowglobe-snowglobe-scene-base");
    
    snowglobeContainer.append(snowglobe, snowglobeBase, snowglobeGlass, snowglobeNoGlass);
    
    // BUSTA
    const envelopeContainer = document.createElement("div");
    envelopeContainer.classList.add("envelope-container");
    
    const envelopeFrontBottom = document.createElement("img");
    envelopeFrontBottom.src = "assets/images/envelope-front-bottom.png"
    envelopeFrontBottom.classList.add("envelope-front-bottom");
    
    const envelopeFrontTopClose = document.createElement("img");
    envelopeFrontTopClose.src = "assets/images/envelope-front-top-close.png"
    envelopeFrontTopClose.classList.add("envelope-front-top-close");
    
    const envelopeFrontTopOpen = document.createElement("img");
    envelopeFrontTopOpen.src = "assets/images/envelope-front-top-open.png"
    envelopeFrontTopOpen.classList.add("envelope-front-top-open");
    
    envelopeContainer.append(envelopeFrontBottom, envelopeFrontTopClose, envelopeFrontTopOpen);
    snowglobeContainer.append(envelopeContainer);    
    
    let candlesLeft = 6;
    let prankCount = 0;
    const maxPranks = 6;
    
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
                                snow6.addEventListener("animationend", (event) => {
                                    changeScene(showSnowglobeScene);
                                }, { once: true });
                                explodingCakeContainer.classList.add("snow-disappear-one-by-one");
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
        const rise = maskHeight * (0.4 + Math.random() * 0.5);
        // rotazione individuale
        const rotation = (Math.random() > 0.5 ? 1 : -1) * (720 + Math.random() * 360);
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

    const title = createElement("h1", "Tap the snowglobe to shake it!");
    title.classList.add("scene-title", "is-hidden");
    
    const message = createElement("p", "Tap away!");
    message.classList.add("scene-message", "is-hidden");
    
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
    snowglobeGlassCracked1.classList.add("snowglobe-snowglobe-scene-glass-cracked1", "is-hidden");
    
    const snowglobeGlassCracked2 = createElement("img");
    snowglobeGlassCracked2.src = "assets/images/snowglobe-glass-cracked2.png";
    snowglobeGlassCracked2.classList.add("snowglobe-snowglobe-scene-glass-cracked2", "is-hidden");
    
    const snowglobeGlassBrokenFull = createElement("img");
    snowglobeGlassBrokenFull.src = "assets/images/snowglobe-glass-broken-full.png";
    snowglobeGlassBrokenFull.classList.add("snowglobe-snowglobe-scene-glass-broken-full", "is-hidden");
    
    const snowglobeGlassBrokenLeft = createElement("img");
    snowglobeGlassBrokenLeft.src = "assets/images/snowglobe-glass-broken-left.png";
    snowglobeGlassBrokenLeft.classList.add("snowglobe-snowglobe-scene-glass-broken-left", "is-hidden");

    const snowglobeGlassBrokenRight = createElement("img");
    snowglobeGlassBrokenRight.src = "assets/images/snowglobe-glass-broken-right.png";
    snowglobeGlassBrokenRight.classList.add("snowglobe-snowglobe-scene-glass-broken-right", "is-hidden");
    
    const snowglobeBase = createElement("img");
    snowglobeBase.src = "assets/images/snowglobe-base.png";
    snowglobeBase.classList.add("snowglobe-snowglobe-scene-base");
    
    snowglobeContainer.append(snowglobe, snowglobeBase, snowglobeGlass, snowglobeNoGlass, snowglobeGlassCracked1, snowglobeGlassCracked2, snowglobeGlassBrokenFull, snowglobeGlassBrokenLeft, snowglobeGlassBrokenRight);
    
    const snowglobeMask = createElement("div");
    snowglobeMask.classList.add("snowglobe-mask");
    
    const envelopeContainer = document.createElement("div");
    envelopeContainer.classList.add("envelope-container");
    
    // BUSTA
    const envelopeBack = document.createElement("div");
    envelopeBack.classList.add("envelope-back");
    
    const envelopeFrontBottom = document.createElement("img");
    envelopeFrontBottom.src = "assets/images/envelope-front-bottom.png"
    envelopeFrontBottom.classList.add("envelope-front-bottom");
    
    const envelopeFrontTopClose = document.createElement("img");
    envelopeFrontTopClose.src = "assets/images/envelope-front-top-close.png"
    envelopeFrontTopClose.classList.add("envelope-front-top-close");
    
    const envelopeFrontTopOpen = document.createElement("img");
    envelopeFrontTopOpen.src = "assets/images/envelope-front-top-open.png"
    envelopeFrontTopOpen.classList.add("envelope-front-top-open");
    
    const envelopeLetterBottomClose = document.createElement("img");
    envelopeLetterBottomClose.src = "assets/images/envelope-letter-bottom-open.png"
    envelopeLetterBottomClose.classList.add("envelope-letter-bottom-close");
    
    const envelopeLetterBottomOpen = document.createElement("img");
    envelopeLetterBottomOpen.src = "assets/images/envelope-letter-bottom-open.png"
    envelopeLetterBottomOpen.classList.add("envelope-letter-bottom-open");
    
    const envelopeLetterTopOpen = document.createElement("img");
    envelopeLetterTopOpen.src = "assets/images/envelope-letter-top-open.png"
    envelopeLetterTopOpen.classList.add("envelope-letter-top-open");
    
    envelopeContainer.append(envelopeFrontBottom, envelopeFrontTopClose, envelopeFrontTopOpen, envelopeLetterBottomOpen, envelopeLetterBottomClose, envelopeLetterTopOpen, envelopeBack);
    
    snowglobeContainer.append(snowglobeMask, envelopeContainer);
    
    scene.append(title, message, fakeBg, snowglobeContainer);
    
    createSnowflakes(snowglobeMask);
    
    fakeBg.classList.add("bg-snowglobe-dark");
    title.classList.remove("is-hidden");
    message.classList.remove("is-hidden");
    
    snowglobeContainer.addEventListener("click", () => {
        snowglobeClicks++;
        
        if (snowglobeClicks < 6) {
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
            title.classList.add("is-hidden-with-fade");
            message.classList.add("is-hidden-with-fade");
            snowglobeGlassCracked2.classList.add("is-hidden");
            snowglobeGlassBrokenFull.classList.remove("is-hidden");
        }

        if (snowglobeClicks === 6) {
            setTimeout(() => {
                snowglobeGlassBrokenFull.classList.add("is-hidden");
                snowglobeGlassBrokenLeft.classList.remove("is-hidden");
                snowglobeGlassBrokenRight.classList.remove("is-hidden");
            }, 875);
            wobbleSnowglobe(snowglobeContainer);
        }

        if (snowglobeClicks === 7) {
            snowglobeGlassBrokenLeft.classList.add("snowglobe-glass-fade-out");
            snowglobeGlassBrokenRight.classList.add("snowglobe-glass-fade-out");
            
            setTimeout(() => {
                snowglobeNoGlass.classList.add("snowglobe-glass-fade-out");
                snowglobeBase.classList.add("snowglobe-glass-fade-out");
                setTimeout(() => {
                    changeScene(showEnvelopeScene);
                }, 875);
            }, 1875);
        }
    });
}

// SCENA ENVELOPE CON LETTERA
function showEnvelopeScene(scene) {
    scene.classList.add("scene-letter");
    setBackground("bg-letter");

    const title = createElement("h1", "Scroll from the top to read more! 🤍");
    title.classList.add("scene-title", "is-hidden-with-fade");

    // BUSTA
    const envelopeContainer = document.createElement("div");
    envelopeContainer.classList.add("envelope-container");
    
    const envelopeBack = document.createElement("div");
    envelopeBack.classList.add("envelope-back");
    
    const envelopeFrontBottom = document.createElement("img");
    envelopeFrontBottom.src = "assets/images/envelope-front-bottom.png"
    envelopeFrontBottom.classList.add("envelope-front-bottom");
    
    const envelopeFrontTopClose = document.createElement("img");
    envelopeFrontTopClose.src = "assets/images/envelope-front-top-close.png"
    envelopeFrontTopClose.classList.add("envelope-front-top-close");
    
    const envelopeFrontTopOpen = document.createElement("img");
    envelopeFrontTopOpen.src = "assets/images/envelope-front-top-open.png"
    envelopeFrontTopOpen.classList.add("envelope-front-top-open");
    
    const letterContainer = document.createElement("div");
    letterContainer.classList.add("letter-container");

    // container per la parte scrollabile di testo
    const letterWindow = document.createElement("div");
    letterWindow.classList.add("letter-window");
    
    // parte scrollabile di testo
    const letterText = document.createElement("div");
    letterText.classList.add("letter-text");

    letterText.innerHTML = `
        <p class="date">Sept. 6, 2026</p>
        <p>Dear Auri,</p>
        <p>If you've made it this far, congratulations! And thank you for the patience. I clearly had way too much time on my hands. I know this whole thing maybe was a little ridiculous. There are probably thousands of easier ways to say "happy birthday". But somehow "happy birthday" didn't feel like enough. Not with you. You always spur me to do a little better, to learn something new, to try and surprise you in a way I never did before. So I thought, why not try with a whole mf website? And here we are.</p>
        <p>I tried sitting down, thinking what could I tell you with this letter. Because the truth is, when I try to explain what you mean to me, I always end up reaching for the same words. And somehow they never quite seem to fit. They're not enough. Not that that's a reason to stop trying.</p>
        <p>Like, one of the strangest things about loving someone as a friend? You never really get used to the fact that there is never quite enough time. Somehow, no matter how much time we spend together, I always leave feeling like we could have stayed another three hours. There is always one more thing to tell you, one more story, one more stupid thought, one more thing I want to show you. And I think that's part of what I love so much about having you in my life: somehow, there is always more. More things to share, more things to discover, more little pieces of you that I get to know. Maybe that's why, even after all this time, you still manage to keep me on my toes. Every year, I get to meet another little version of you. And somehow, every single one gives me another reason to love you.</p>
        <p>And I think that's also why you somehow manage to be part of so many little pieces of my everyday life. There are so many completely insignificant moments when my first thought is still "I have to tell Auri this." A song. A picture. Something stupid that happened. Something I know you'd find funny. Something beautiful I know you'd appreciate. I wonder if you know how often you are there, even when you're not. And then there are the moments when you actually are there, and somehow you don't even have to do anything. We can be in the gym, both trying to focus, and all it takes is one weird look from you, one of those ridiculously expressive eyebrow things you do, and suddenly I'm trying not to laugh in the middle of an exercise. Sometimes it's just pronouncing a word wrong. Or saying one word instead of another. Or looking at each other at exactly the wrong moment. And somehow that's enough. You have this way of making everything feel lighter without even trying. It doesn't matter what kind of mood I'm in, how tired I am, how shitty my day has been, or how completely off I feel. Somehow, five minutes with you are enough to turn me into an entirely different person. I don't really know how you do that. I think that's your magic.</p>
        <p>And maybe that's what I mean when I say that "happy birthday" never felt like enough. How do you wish a magical birthday to someone who somehow makes ordinary moments feel magical all the time?</p>
        <p>I hope this birthday is everything it deserves to be. I hope California gives you beautiful sunsets, warm nights, ridiculous amounts of good food, new places to discover (and hopefully you'll get to sightsee a little more this time), and the kind of memories you'll still be talking about years from now. I hope you get to spend it exactly where you want to be, with the person you want beside you, doing all the things that make you happy. And even though I won't be there to celebrate it with you this time, I hope you know that somewhere on the other side of the world, there will be someone thinking about you and smiling at the thought of you having the time of your life.</p>
        <p>And I hope this year gives you so many beautiful things that you'll always have one more thing to tell me, too.</p>
        <p>So, I guess I'll just say it after all, plain and simple.</p>
        <p>Happy birthday, my sweet Auri. I love you more than I will probably ever manage to put into a letter. Now go have the most magical birthday ever. You deserve it. And when you get back, I expect approximately 69 stories about California.</p>
        <p>With all my love,</p>
        <p class="signature">Sara 🤍</p>
    `;
    letterWindow.append(letterText);

    const envelopeLetterBottomClose = document.createElement("img");
    envelopeLetterBottomClose.src = "assets/images/envelope-letter-bottom-open.png"
    envelopeLetterBottomClose.classList.add("envelope-letter-bottom-close");
    
    const envelopeLetterBottomOpen = document.createElement("img");
    envelopeLetterBottomOpen.src = "assets/images/envelope-letter-bottom-open.png"
    envelopeLetterBottomOpen.classList.add("envelope-letter-bottom-open");
    
    const envelopeLetterTopOpen = document.createElement("img");
    envelopeLetterTopOpen.src = "assets/images/envelope-letter-top-open.png"
    envelopeLetterTopOpen.classList.add("envelope-letter-top-open");
    
    letterContainer.append(envelopeLetterBottomClose, envelopeLetterBottomOpen, envelopeLetterTopOpen, letterWindow);

    envelopeContainer.append(envelopeFrontBottom, envelopeFrontTopClose, envelopeFrontTopOpen, letterContainer, envelopeBack);

    // SIGILLO
    const sealContainer = document.createElement("div");
    sealContainer.classList.add("seal-container");

    const sealTop = document.createElement("img");
    sealTop.src = "assets/images/seal-top.png";
    sealTop.classList.add("seal-top");
    
    const sealBottom = document.createElement("img");
    sealBottom.src = "assets/images/seal-bottom.png";
    sealBottom.classList.add("seal-bottom");
    
    const sealLeft = document.createElement("img");
    sealLeft.src = "assets/images/seal-left.png";
    sealLeft.classList.add("seal-left");
    
    const sealRight = document.createElement("img");
    sealRight.src = "assets/images/seal-right.png";
    sealRight.classList.add("seal-right");
    
    sealContainer.append(sealTop, sealBottom, sealLeft, sealRight);
    
    envelopeContainer.append(sealContainer);
    
    let piecesLeft = 4;
    let sealReady = false;

    scene.append(title, envelopeContainer);

    setTimeout(() => {
        envelopeContainer.classList.add("envelope-zoom");
        envelopeContainer.addEventListener("transitionend", () => {
            sealReady = true;
        }, { once: true });
    }, 875);

    // nuova funzione di supporto per l'animazione del sigillo
    function dropSealPieces() {
        const sealPieces = [
            sealTop,
            sealRight,
            sealBottom,
            sealLeft
        ];

        let index = 0;

        setTimeout(() => {
            function next() {
                if (index >= sealPieces.length) return;
                const piece = sealPieces[index];
                piece.classList.add("fall");
                piece.addEventListener("animationend", () => {
                    index++;
                    if (index >= sealPieces.length) {
                        setTimeout(() => {
                            openEnvelope();
                        }, 50);
                        return;
                    }
                    next();
                }, { once: true });
            }
            next();
        }, 375);
    }

    // nuova funzione di supporto per aprire la busta
    function openEnvelope() {
        envelopeFrontTopClose.classList.add("increase-z");
        setTimeout(() => {
            envelopeFrontTopOpen.classList.add("decrease-z");
            setTimeout(() => {
                letterContainer.classList.add("letter-pulled-out");
                setTimeout(() => {
                    envelopeFrontBottom.classList.add("is-hidden-with-fade");
                    envelopeBack.classList.add("is-hidden-with-fade");
                    envelopeFrontTopOpen.classList.add("is-hidden-with-fade");
                    setTimeout(() => {
                        envelopeLetterBottomClose.classList.add("increase-z");
                        setTimeout(() => {
                            envelopeLetterTopOpen.classList.add("decrease-z");

                            setTimeout(() => {
                                letterText.classList.add("letter-appears");
                                setTimeout(() => {
                                    title.classList.remove("is-hidden-with-fade");
                                }, 875);
                            }, 875);
                        }, 625);
                    }, 875);
                }, 875);
            }, 1000);
        }, 1000);
    }

    sealContainer.addEventListener("click", () => {
        if (piecesLeft === 4) {
            sealTop.classList.add("detach", "detach-top");
        }
        else if (piecesLeft === 3) {
            sealBottom.classList.add("detach", "detach-bottom");
        }
        else if (piecesLeft === 2) {
            sealRight.classList.add("detach", "detach-right");
        }
        else if (piecesLeft === 1) {
            sealLeft.classList.add("detach", "detach-left");
        }
        piecesLeft--;
        if (piecesLeft === 0) {
            dropSealPieces();
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