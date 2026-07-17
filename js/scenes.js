function showIntroScene(scene) {
    setBackground("bg-intro");
    const title = createElement("h1", "Hi, Keke! 💜");
    const message = createElement("p", "I have a little surprise for you.");
    const button = createElement("button", "Show me!");
    title.classList.add("scene-title");
    message.classList.add("scene-message");
    button.classList.add("primary-button");
    button.addEventListener("click", () => {
        // changeScene(showEnvelopeScene);
        changeScene(showTooEarlyScene);
    });
    scene.append(title, message, button);
}

function showTooEarlyScene(scene) {
    setBackground("bg-too-early");
    // 1. creo gli elementi
    const title = createElement("h1", "Oops 😬");
    const message = createElement("p", "");
    const openButton = createElement("button", "Open me ✨");
    const goBackButton = createElement("button", "Go back 🔙");
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    buttonsContainer.append(openButton, goBackButton);
    const today = new Date();
    // Data per sbloccare il regalo: 17 luglio 2026 00:00:01, JavaScript inizia a contare da 0 i mesi
    const unlockDate = new Date(2026, 6, 17, 0, 0, 1);
    const isUnlocked = today >= unlockDate;
    let clickAttempts = 0;
    const earlyMessages = [
        "Hey! You're too early 😤",
        "I'm not ready yet... 😢",
        "Can you wait a little more? 🥺",
        "Please be patient 💜",
        "Seriously? 🙄",
        "C'monnn, waiiiiitttt!",
        "Just a little more, pleeease."
    ];
    if (isUnlocked) {
        changeScene(showBirthdayDayUnlockedScene);
        return;
    }
    title.classList.add("hidden");

    // 2. imposto classi/event listener
    // Per ora nascosto
    goBackButton.classList.add("hidden");
    openButton.addEventListener("click", () => {
        title.classList.remove("hidden");
        const messageIndex = clickAttempts % earlyMessages.length;
        message.textContent = earlyMessages[messageIndex];    
        clickAttempts++;    
        if (clickAttempts > earlyMessages.length) {
            goBackButton.classList.remove("hidden");
        }
    });
    goBackButton.addEventListener("click", () => {
        changeScene(showIntroScene);
    });
    scene.append(title, message, buttonsContainer);
}

function showBirthdayDayUnlockedScene(scene) {
    setBackground("bg-bday-unlocked");
    createBokeh();
    // 1. creo gli elementi
    const title = createElement("h1", "Happy Birthday!!! 🥳");
    const message = createElement("p", "I've been waiting for you... 💜");
    const letsGoButton = createElement("button", "Let's go! ✨");
    // 2. imposto classi/event listener
    letsGoButton.addEventListener("click", () => {
        changeScene(showCakeScene);
    });
    scene.append(title, message, letsGoButton);
}

// nuova funzione di supporto
function createCandle(position) {
    const candle = document.createElement("div");
    candle.classList.add("candle");
    
    candle.style.left = position + "%";
    
    const candleImage = document.createElement("img");
    candleImage.src = "assets/images/candle1.png";
    
    const flameImage = document.createElement("img");
    flameImage.src = "assets/images/flame1.png";
    flameImage.classList.add("flame");
    
    candle.append(candleImage, flameImage);
    
    return {
        element: candle,
        flame: flameImage
    };
}

// nuova funzione di supporto
function relightRandomCandle(candles) {
    const unlitCandles = candles.filter(
        candle => candle.flame.style.display === "none"
    );

    const randomIndex = Math.floor(Math.random() * unlitCandles.length);
    const candle = unlitCandles[randomIndex];

    candle.flame.style.display = "block";
}

function showCakeScene(scene) {
    setBackground("bg-cake");
    const title = createElement("h1", "Make a wish! ✨");
    const loading = createElement("p", "Preparing your cake...");
    scene.append(title, loading);

    setTimeout(() => {
        const candlesHint = createElement("p", "Blow out AALLLLL the candles!");
        candlesHint.classList.add("hidden");
        const cakeContainer = document.createElement("div");
        cakeContainer.classList.add("cake-container");
        cakeContainer.classList.add("hidden");

        const cake = document.createElement("img");
        cake.src = "assets/images/cake-full2.png";
        cake.classList.add("cake");

        cakeContainer.append(cake);
        
        const meltedCake = document.createElement("img");
        meltedCake.src = "assets/images/cake-melted3.png";
        meltedCake.classList.add("melted-cake");

        meltedCake.onload = () => {
            console.log("ready");
        };
        
        scene.append(candlesHint, meltedCake);

        const candlePositions = [30, 40, 50, 60, 70];
        const candles = [];

        candlePositions.forEach(position => {
            const candle = createCandle(position);
            candles.push(candle);
            cakeContainer.append(candle.element);
        });

        cake.onload = () => {
            loading.remove();
            candlesHint.classList.remove("hidden");
            candlesHint.classList.add("show");
            cakeContainer.classList.remove("hidden");
        };

        let candlesLeft = 5;
        let prankCount = 0;
        const maxPranks = 5;

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
                            cakeContainer.classList.add("cake-wobble");
                            cakeContainer.addEventListener("animationend", () => {
                                meltedCake.classList.add("show");
                                setTimeout(() => {
                                    title.classList.add("hide");
                                    cakeContainer.classList.add("hide");
                                }, 3750);
                                setTimeout(() => {
                                    meltedCake.classList.add("fall");
                                    setTimeout(() => {
                                        meltedCake.remove();
                                        cakeContainer.remove();
                                        changeScene(showEnvelopeScene);
                                    }, 1875);
                                }, 1250);
                            }, { once: true });
                        }, 250);
                    }
                }
            });
        });

        scene.append(cakeContainer);
    }, 250);
}

function showEnvelopeScene(scene) {
    setBackground("bg-envelope");
    const title = createElement("h1", "Happy birthday, Keke! 💜");
    const loading = createElement("p", "Just a little second...");
    scene.append(title, loading);

    setTimeout(() => {
        const envelopeContainer = document.createElement("div");
        envelopeContainer.classList.add("envelope-container");

        // BUSTA
        const envelopeBack = document.createElement("img");
        envelopeBack.src = "assets/images/envelope-back.png";
        envelopeBack.classList.add("envelope-back");

        const paper = document.createElement("img");
        paper.src = "assets/images/letter-paper-empty.png";
        paper.classList.add("envelope-paper");
        
        const letterText = document.createElement("div");
        letterText.classList.add("letter-text");

        letterText.innerHTML = `
            <p>Dear Keke,</p>
            <p>happy birthdayyy! 💜</p>
            <p>Lately I've been thinking a lot about us, and about how strange and beautiful it is that some people don't simply enter your life, they slowly weave themselves into it until you can't quite remember what it looked like before them. You became part of my life so gradually that I almost didn't notice it happening. And then one day I did.</p>
            <p>I realized that so many pieces of who I am now carry little traces of you. The way I stop to admire the sky as if it were painted just for us. The excitement over tiny things, like a ladybug landing on my arm. The way certain songs seem to settle perfectly somewhere in my chest. The way I pay more attention to beauty, to softness, to wonder. You are quietly there in all of those moments. I think that's why you feel so familiar to me. Why being with you has always felt so easy.</p>
            <p>For the longest time, I thought home was a place. Four walls, a city, somewhere you could point at on a map. Then I met you. And somehow, despite all the kilometres between us, despite living hundreds of miles apart and seeing each other far less than we deserve, you became one of my homes.</p>
            <p>I think one of my favourite things about us is that we've somehow become co-brain over the years. One shared safe space, our treasured possession. We've built stories together, encouraged each other through writing slumps and life slumps alike, celebrated every little victory, carried each other through difficult moments, listened to each other's worries, and witnessed versions of one another that very few people get to see. Thank you, for treating all the little pieces of me, both real and fictional, with so much care.</p>
            <p>You know, it's incredibly special, having someone who understands both your heart and your imagination. I think it becomes increasingly rare to find someone willing to step into your little worlds, to care about your stories, your characters, your dreams with the same tenderness you do. Somehow, we found that in each other: someone who knows your stories almost as well as they know you, someone who can look at a random picture, a song lyric, a sunset, and immediately think "This is such a Keke thing," or "Sara would love this."</p>
            <p>I used to think that after all these years I knew you completely. But somehow, every year, I discover something new. Another little detail to cherish. Another layer to admire. Another reason to be grateful that our paths somehow crossed. Being your friend feels a little bit like rereading a favourite book. You know it by heart. You know the characters, the scenes, the lines that made you laugh and the ones that made you cry. And still, every time you open it again, you find something new hidden between the pages.</p>
            <p>There is something so beautiful about watching someone become more and more themselves with every passing year. And I feel incredibly lucky that I get to witness that in you. Twenty-nine feels like standing in a doorway. Not because you are leaving something behind, but because you are carrying every version of yourself with you into whatever comes next. The girl you once were. The woman you are today. The person you are still becoming. And I hope you step into this new year knowing how deeply loved you are. How appreciated you are. How many lives you have touched simply by being yourself. And I hope this next chapter is filled with beautiful things, because no one deserves them more than you do. Thank you for being my friend, my co-writer, my co-brain, my safe place, and one of the most precious people in my life.</p>
            <p>Happy 29th birthday, my dear Keke. May this year be gentle with you, kind to you, and full of little moments that make you stop and think: "I'm happy I get to be here."</p>
            <p>With all my love,</p>
            <p class="signature">Sara 💜</p>
        `;

        const letter = document.createElement("div");
        letter.classList.add("letter");

        const letterWindow = document.createElement("div");
        letterWindow.classList.add("letter-window");

        letterWindow.append(letterText);

        letter.append(paper, letterWindow);

        const envelopeFront = document.createElement("img");
        envelopeFront.src = "assets/images/envelope-front.png";
        envelopeFront.classList.add("envelope-front");

        const envelopeFlap = document.createElement("img");
        envelopeFlap.src = "assets/images/envelope-flap.png";
        envelopeFlap.classList.add("envelope-flap");

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

        envelopeContainer.append(envelopeBack, letter, envelopeFront, envelopeFlap, sealContainer);

        loading.remove();
        const scrollHint = createElement("p", "Scroll from the top to read more! 💜");
        scrollHint.classList.add("hidden");
        scene.append(scrollHint, envelopeContainer);

        // animazioni
        let piecesLeft = 4;

        // nuova funzione di supporto
        function dropSealPieces() {
            const pieces = [
                sealTop,
                sealRight,
                sealBottom,
                sealLeft
            ];
            let index = 0;
            setTimeout(() => {
                function next() {
                    if (index >= pieces.length) return;
                    const piece = pieces[index];
                    piece.classList.add("fall");
                    piece.addEventListener("animationend", () => {
                        index++;
                        if (index >= pieces.length) {
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

        // nuova funzione di supporto
        function openEnvelope() {
            envelopeFlap.classList.add("close-flap-anim");
            setTimeout(() => {
                envelopeBack.classList.add("show");
                setTimeout(() => {
                    letter.classList.add("rise");
                    letter.addEventListener("animationend", () => {
                        envelopeFront.classList.add("fade-out");
                        envelopeFlap.classList.add("fade-out");
                        envelopeBack.classList.add("fade-out");
                        setTimeout(() => {
                            letterText.classList.add("show");
                            sealContainer.remove();
                            setTimeout(() => {
                                scrollHint.classList.remove("hidden");
                                scrollHint.classList.add("show");
                            }, 1250);
                        }, 1250);
                    }, { once: true });
                }, 1250);
            }, 750);
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
    }, 1875);
}

// funzione di supporto per gli sfondi
function setBackground(background) {
    document.body.classList.remove(
        "bg-intro",
        "bg-too-early",
        "bg-bday-unlocked",
        "bg-cake",
        "bg-envelope"
    );
    removeBokeh();
    document.body.classList.add(background);
}