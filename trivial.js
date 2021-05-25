// En base a la api Open Trivia (https://opentdb.com/api_config.php), vamos a desarrollar un trivial con la siguiente url 'https://opentdb.com/api.php?amount=10'. Esta api nos devolverá una serie de preguntas con sus respuestas, tanto erroneas como correctas.

// La idea es hacer un juego en el que el usuario introduzca en un input las caracteristicas del Trivial y que al darle al 'Start Game' le salgan las preguntas de la api para que pueda comenzar el juego. Una vez las responda todas, le mostraremos al usuario el resultado.

// Ten en cuenta que hay dos tipos de preguntas. Aquellas con 3 respuestas erroneas y 1 correcta y aquellas con respuesta verdadero / falso.

let numQuest;
let category;
let difficulty;
let type;

startButton$$ = document.body.querySelector('[data-function="start-game"]');
startButton$$.addEventListener("click", (event) => {
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

    console.log(numQuest, category, difficulty, type);
});

const baseUrl = "https://opentdb.com/api.php?";
const numQuestUrl = `amount=${numQuest}`;
const categUrl = `&${category}`;
const diffUrl = `&${difficulty}`;
const typeUrl = `&${type}`;
