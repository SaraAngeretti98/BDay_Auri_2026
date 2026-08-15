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
        const birthdayStatus = getBirthdayStatus();
        if (birthdayStatus === "birthday" || birthdayStatus === "after") {
            changeScene(showOnTimeScene);
        } else {
            changeScene(showTooEarlyScene);
        }
    });
    
    scene.append(snowContainer, button);
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

    textsContainer.append(countdownText, title, message);

    const calendarsContainer = createElement("div");
    calendarsContainer.classList.add("calendars-container");

    const myCalendar = createCalendar("Europe/Rome", "WITH ME");
    const aaronCalendar = createCalendar("America/Los_Angeles", "WITH AARON");

    calendarsContainer.append(myCalendar, aaronCalendar);

    scene.append(calendarsContainer, textsContainer, button, bunnySnowAngel1, bunnySnowAngel2);

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

    whiteCloudsContainer.append(whiteCloud1, whiteCloud2);

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
    
    scene.append(calendarsContainer, whiteCloudsContainer, title, bunnyWaving1, bunnyWaving2, bunnyWavingText, button);
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
            const point = createElement("div");
            point.classList.add("grid-point");
            point.style.left = `${x}%`;
            point.style.top = `${y}%`;
            mask.append(point);
        }
    }
    return points;
}

function showBalloonsScene(scene) {
    scene.classList.add("scene-balloons");
    setBackground("bg-balloons");
    
    // const title = createElement("h1", "Test");
    
    const frameMaskBalloonsContainer = createElement("div");
    frameMaskBalloonsContainer.classList.add("frame-and-mask-and-balloons-container");

    const balloonMask = createElement("div");
    balloonMask.classList.add("balloon-mask");
    
    const frameBack = createElement("div");
    frameBack.classList.add("frame-back");
    
    const frameFront = createElement("img");
    frameFront.src = "assets/images/frame1c.png";
    frameFront.classList.add("frame-front");
    
    frameMaskBalloonsContainer.append(frameBack, frameFront, balloonMask);

    // const balloon1 = createElement("img");
    // balloon1.src = "assets/images/balloon1.png";
    // balloon1.classList.add("balloon");
    
    // const balloon2 = createElement("img");
    // balloon2.src = "assets/images/balloon2.png";
    // balloon2.classList.add("balloon");
    
    // const balloon3 = createElement("img");
    // balloon3.src = "assets/images/balloon3.png";
    // balloon3.classList.add("balloon");
    
    const balloonGrid = createBalloonGrid(balloonMask);

    // scene.append(balloon1, balloon2, balloon3);
    scene.append(frameMaskBalloonsContainer);
    // scene.append(title);
}






function setBackground(background) {
    document.body.classList.remove(
        "bg-intro",
        "bg-go-on",
        "bg-too-early",
        "bg-on-time",
        "bg-balloons",
        "bg-cake",
        "bg-envelope"
    );
    removeBokeh();
    document.body.classList.add(background);
}