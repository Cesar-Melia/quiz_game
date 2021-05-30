// En base a la api Open Trivia (https://opentdb.com/api_config.php), vamos a desarrollar un trivial con la siguiente url 'https://opentdb.com/api.php?amount=10'. Esta api nos devolverá una serie de preguntas con sus respuestas, tanto erroneas como correctas.

// La idea es hacer un juego en el que el usuario introduzca en un input las caracteristicas del Trivial y que al darle al 'Start Game' le salgan las preguntas de la api para que pueda comenzar el juego. Una vez las responda todas, le mostraremos al usuario el resultado.

// Ten en cuenta que hay dos tipos de preguntas. Aquellas con 3 respuestas erroneas y 1 correcta y aquellas con respuesta verdadero / falso.

let numQuest;
let category;
let difficulty;
let type;
let questions = [];
let question;
let totalQuest;
let time;
let counter = 0;
let countInterval;
let questLoop;
let options = [];
let correctAnswer;
let score = 0;
let answerId;

const form$$ = document.body.querySelector("form");
const main$$ = document.body.querySelector("[data-function='main']");
const board$$ = document.body.querySelector("[data-function='board']");
const numQuest$$ = document.body.querySelector("[data-function='numQuest']");
const time$$ = document.body.querySelector("[data-function='time']");
const score$$ = document.body.querySelector("[data-function='score']");
const startButton$$ = form$$.querySelector('[data-function="start-game"]');
const buttonA$$ = main$$.querySelector("#a");
const buttonB$$ = main$$.querySelector("#b");
const buttonC$$ = main$$.querySelector("#c");
const buttonD$$ = main$$.querySelector("#d");

startButton$$.addEventListener("click", async (event) => {
    event.preventDefault();
    form$$.classList.add("hide-element");
    main$$.classList.remove("hide-element");
    const url = configureGame();
    questions = await apiRequest(url);
    askQuestion();
});

const configureGame = () => {
    numQuest = document.body
        .querySelector('[data-function="questions-number"]')
        .value.toLowerCase();
    category = document.body
        .querySelector('[data-function="questions-category"]')
        .value.toLowerCase();
    difficulty = document.body
        .querySelector('[data-function="questions-difficulty"]')
        .value.toLowerCase();
    type = document.body.querySelector('[data-function="questions-type"]').value.toLowerCase();

    numQuest = numCheck();
    category = catCheck();
    difficulty = diffCheck();
    type = typeCheck();

    return `https://opentdb.com/api.php?${numQuest}${category}${difficulty}${type}`;
};

const numCheck = () => {
    if (Number(numQuest) > 0 && Number(numQuest) <= 50) {
        totalQuest = numQuest;
        return `amount=${numQuest}`;
    } else {
        alert("Please, insert a correct number of questions.");
        return "";
    }
};

const catCheck = () => {
    if (category === "any category") {
        return "";
    }
    switch (category) {
        case "general knowledge":
            return "&category=9";
        case "film":
            return "&category=10";
        case "music":
            return "&category=11";
        case "books":
            return "&category=12";
        case "musicals & theatre":
            return "&category=13";
        case "television":
            return "&category=14";
        case "video games":
            return "&category=15";
        case "board games":
            return "&category=16";
        case "science & nature":
            return "&category=17";
        case "computers":
            return "&category=18";
        case "mathemathics":
            return "&category=19";
        case "mithology":
            return "&category=20";
        case "sports":
            return "&category=21";
        case "geography":
            return "&category=22";
        case "history":
            return "&category=23";
        case "politics":
            return "&category=24";
        case "art":
            return "&category=25";
        case "celebrities":
            return "&category=26";
        case "animals":
            return "&category=27";
        case "vehicles":
            return "&category=28";
        case "comics":
            return "&category=29";
        case "gadgets":
            return "&category=30";
        case "anime":
            return "&category=31";
        case "cartoon":
            return "&category=32";
        default:
            alert("Please, insert a correct category.");
            return "";
    }
};

const diffCheck = () => {
    if (difficulty === "any difficulty") {
        return "";
    } else if (difficulty === "easy") {
        return "&difficulty=easy";
    } else if (difficulty === "medium") {
        return "&difficulty=medium";
    } else if (difficulty === "hard") {
        return "&difficulty=hard";
    } else {
        alert("Please, insert a correct difficulty.");
        return "";
    }
};

const typeCheck = () => {
    if (type === "any type") {
        return "";
    } else if (type === "multiple choice") {
        return "&type=multiple";
    } else if (type === "true or false") {
        return "&type=boolean";
    } else {
        alert("Please, insert a correct type.");
        return "";
    }
};

const apiRequest = async (url) => {
    try {
        const res = await fetch(url);
        const resData = await res.json();
        return resData.results;
    } catch (err) {
        console.error("Error: Conexion to API has failed", err);
        alert("Error: Conexion to API has failed");
    }
};

const askQuestion = () => {
    if (totalQuest > counter) {
        if (countInterval !== undefined) {
            clearInterval(countInterval);
        }
        time = 10;
        countInterval = setInterval(timer, 1000);
        numQuest$$.textContent = `Question: ${counter + 1} / ${totalQuest}`;
        const quest = questions[counter];
        printQuestion(quest);
        counter++;
    } else {
        clearInterval(countInterval);
        clearInterval(questLoop);
        finishGame();
    }
};

const printQuestion = (quest) => {
    resetButons();
    question = quest;

    board$$.textContent = "";
    const div$$ = document.createElement("div");
    div$$.classList.add("b-board__card");

    const category$$ = document.createElement("h3");
    category$$.classList.add("b-board__category");
    category$$.textContent = quest.category;

    const quest$$ = document.createElement("h3");
    quest$$.classList.add("b-board__quest");
    quest$$.innerHTML = quest.question;

    const options$$ = document.createElement("h3");
    options$$.classList.add("b-board__options");

    if (quest.type === "boolean") {
        generateoptions(quest);
        buttonC$$.classList.add("hide-element");
        buttonD$$.classList.add("hide-element");
        options$$.innerHTML = "<div data-function='optionA' class='b-board__option'>A:  True</div>";
        options$$.innerHTML +=
            "<div data-function='optionB' class='b-board__option'>B:  False</div>";
    } else {
        generateoptions(quest);
        options$$.innerHTML =
            "<div data-function='optionA' class='b-board__option'>A :  " + options[0] + "</div>";
        options$$.innerHTML +=
            "<div data-function='optionB' class='b-board__option'>B :  " + options[1] + "</div>";
        options$$.innerHTML +=
            "<div data-function='optionC' class='b-board__option'>C :  " + options[2] + "</div>";
        options$$.innerHTML +=
            "<div data-function='optionD' class='b-board__option'>D :  " + options[3] + "</div>";
    }

    div$$.appendChild(category$$);
    div$$.appendChild(quest$$);

    board$$.appendChild(div$$);
    board$$.appendChild(options$$);
};

const timer = () => {
    time$$.textContent = "Time: " + time;
    time--;
    if (time === -1) {
        askQuestion();
    }
};

const finishGame = () => {
    alert("Game finished \nYour score is: " + score);
};

const resetButons = () => {
    buttonA$$.classList.remove();
    buttonB$$.classList.remove();
    buttonC$$.classList.remove("hide-element");
    buttonD$$.classList.remove("hide-element");
};

const generateoptions = (quest) => {
    options = [];
    for (const answer of quest.incorrect_answers) {
        options.push(answer);
    }

    options.push(quest.correct_answer);

    if (quest.type === "multiple") {
        options.sort(() => 0.5 - Math.random());

        correctAnswer = options.find((option) => {
            return option.includes(quest.correct_answer);
        });
        correctAnswer = options.indexOf(correctAnswer);

        switch (correctAnswer) {
            case 0:
                correctAnswer = "a";
                break;
            case 1:
                correctAnswer = "b";
                break;
            case 2:
                correctAnswer = "c";
                break;
            case 3:
                correctAnswer = "d";
                break;
        }
    } else {
        if (quest.correct_answer === "True") {
            correctAnswer = "a";
        } else {
            correctAnswer = "b";
        }
    }
};

const checkCorrect = (quest, eventId) => {
    if (quest.type === "boolean") {
        if (quest.correct_answer === "True" && eventId === "a") {
            scoreUpdate();
            paintCorrect();
            setTimeout(nextQuestion, 1500);
        } else if (quest.correct_answer === "False" && eventId === "b") {
            scoreUpdate();
            paintCorrect();
            setTimeout(nextQuestion, 1500);
        } else {
            paintIncorrect(eventId);
            paintCorrect();
            setTimeout(nextQuestion, 1500);
        }
    } else if (quest.type === "multiple") {
        if (correctAnswer === eventId) {
            scoreUpdate();
            paintCorrect();
            setTimeout(nextQuestion, 1500);
        } else {
            paintIncorrect(eventId);
            paintCorrect();
            setTimeout(nextQuestion, 1500);
        }
    }
};

const scoreUpdate = () => {
    score++;
    score$$.textContent = "Score : " + score;
};

const nextQuestion = () => {
    answerId = undefined;
    clearInterval(countInterval);
    clearInterval(questLoop);
    askQuestion();
};

const paintCorrect = () => {
    const correct$$ = board$$.querySelector(
        "[data-function='option" + correctAnswer.toUpperCase() + "']"
    );
    correct$$.classList.add("b-board__option--correct");
};

const paintIncorrect = (eventId) => {
    const incorrect$$ = board$$.querySelector(
        "[data-function='option" + eventId.toUpperCase() + "']"
    );

    incorrect$$.classList.add("b-board__option--incorrect");
};

buttonA$$.addEventListener("click", (event) => {
    answerId = event.target.getAttribute("id");
    checkCorrect(question, answerId);
});
buttonB$$.addEventListener("click", (event) => {
    answerId = event.target.getAttribute("id");
    checkCorrect(question, answerId);
});
buttonC$$.addEventListener("click", (event) => {
    answerId = event.target.getAttribute("id");
    checkCorrect(question, answerId);
});
buttonD$$.addEventListener("click", (event) => {
    answerId = event.target.getAttribute("id");
    checkCorrect(question, answerId);
});
