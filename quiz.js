// En base a la api Open Trivia (https://opentdb.com/api_config.php), vamos a desarrollar un trivial con la siguiente url 'https://opentdb.com/api.php?amount=10'. Esta api nos devolverá una serie de preguntas con sus respuestas, tanto erroneas como correctas.

// La idea es hacer un juego en el que el usuario introduzca en un input las caracteristicas del Trivial y que al darle al 'Start Game' le salgan las preguntas de la api para que pueda comenzar el juego. Una vez las responda todas, le mostraremos al usuario el resultado.

// Ten en cuenta que hay dos tipos de preguntas. Aquellas con 3 respuestas erroneas y 1 correcta y aquellas con respuesta verdadero / falso.

let numQuest;
let category;
let difficulty;
let type;
let questions = [];
const form$$ = document.body.querySelector("form");
const startButton$$ = form$$.querySelector('[data-function="start-game"]');
startButton$$.addEventListener("click", async (event) => {
    event.preventDefault();
    form$$.classList.add("hide-element");
    const url = configureGame();
    await apiRequest(url);

    console.log(questions);
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
        questions = resData.results;
    } catch (err) {
        console.error("Error: Conexion to API has failed", err);
        alert("Error: Conexion to API has failed");
    }
};

const printQuestions = () => {
    for (quest of questions) {
    }
};
