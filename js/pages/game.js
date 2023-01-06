const words =
    ["bowl",
        "exists",
        "look",
        "region",
        "toward",
        "box",
        "experiment",
        "lost",
        "remain",
        "town",
        "boy",
        "explain",
        "lot",
        "remember",
        "train",
        "break",
        "explosives",
        "love",
        "rent",
        "training",
        "breakfast",
        "express"]

let gameState = {
    activeWord: words[0],
    step: 1
}

const input = document.getElementById("game-input")
const wordDOM = document.getElementById("word")
const cta = document.getElementById("CTA");

function renderGame() {
    const { activeWord: word, step } = gameState;

    const index = !!(step % 2) ? parseInt(step / 2) : word.length - parseInt(step / 2)

    const leftDoneCount = parseInt(step / 2)
    const rightDoneCount = parseInt((step - 1) / 2)

    const leftDone = word.slice(0, leftDoneCount);
    const leftRest = word.slice(leftDoneCount, index);
    const rightDone = word.slice(word.length - rightDoneCount, word.length);
    const rightRest = word.slice(index + 1, word.length - rightDoneCount);

    let wordHTML = '';

    if (leftDone.length) wordHTML += `<span class="game-area--word--done">${leftDone}</span>`
    if (leftRest.length) wordHTML += `<span class="game-area--word--rest">${leftRest}</span>`
    wordHTML += `<span class="game-area--word--index">${word[index]}</span>`
    if (rightRest.length) wordHTML += `<span class="game-area--word--rest">${rightRest}</span>`
    if (rightDone.length) wordHTML += `<span class="game-area--word--done">${rightDone}</span>`

    wordDOM.innerHTML = wordHTML
}

function getCurrentKey(word, step) {
    const index = !!(step % 2) ? parseInt(step / 2) : word.length - parseInt(step / 2)
    return word[index]
}

function resetWord() {
    gameState = {
        activeWord: words[parseInt(Math.random() * words.length)],
        step: 1
    }
}

function onKeyPress({data: key}) {

    const correctKey = getCurrentKey(gameState.activeWord, gameState.step)

    if (correctKey === key) gameState.step++
    if (gameState.step > gameState.activeWord.length) resetWord()

    renderGame()
}

function backToGame() {
    cta.className = "game-area--clickable-area hidden";
    wordDOM.className = "game-area--word";
    input.focus({focusVisible: true})
}

function renderCTAText() {
    cta.className = "game-area--clickable-area";
    wordDOM.className = "game-area--word hidden";
}

cta.onclick = backToGame;
input.onblur = renderCTAText;
input.oninput = onKeyPress;

(() => renderGame())();