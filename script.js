let cardCount = 0;

function onLoad() {
}

function addCardStart() {
    document.getElementsByClassName("add-button")[0].remove();
    document.getElementsByTagName("main")[0].innerHTML +=
        "<div id=\"openModal\" class=\"modal\">\n" +
        "  <div class=\"modal-dialog\">\n" +
        "    <div class=\"modal-content\">\n" +
        "      <div class=\"modal-header\">\n" +
        "        <h3 class=\"modal-title\">Add element</h3>\n" +
        "        <button class=\"close\" onclick=\"closeAddModalWindow()\">×</button>\n" +
        "      </div>\n" +
        "      <div class=\"card-input\">\n" +
        "        <p>Photo Url: <input id=\"card-photo-input\" type=\"text\"></p>\n" +
        "        <p>Description: <textarea id=\"card-description-input\"></textarea></p>\n" +
        "        <button class=\"add-card-button\" onclick=\"addCardFinish()\">add</button>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "</div>";
}


function addCardFinish() {
    document.getElementsByTagName("main")[0].innerHTML +=
        "<div class=\"card\" id=\"card" + cardCount.toString() + "\">\n" +
        "  <img class=\"card-photo\" src=\"" + document.getElementById("card-photo-input").value + "\" alt=\"human photo\">\n" +
        "  <p class=\"card-description\">" + document.getElementById("card-description-input").value + "</p>" +
        "  <div class=\"card-tool-buttons\">\n" +
        "    <button class=\"tool-button\" onclick=\"deleteCard(" + cardCount.toString() + ")\"><img class=\"tool-button-img\" src=\"img/delete.png\"></button>\n" +
        "    <button class=\"tool-button\" onclick=\"editCardStart(" + cardCount.toString() + ")\"><img class=\"tool-button-img\" src=\"img/edit.png\"></button>\n" +
        "    <button class=\"tool-button\" onclick=\"moveCardUp(" + cardCount.toString() + ")\"><img class=\"tool-button-img\" src=\"img/top-button.png\"></button>\n" +
        "    <button class=\"tool-button\" onclick=\"moveCardDown(" + cardCount.toString() + ")\"><img class=\"tool-button-img\" src=\"img/bottom-button.png\"></button>\n" +
        "  </div>\n" +
        "</div>\n";
    closeModalWindow();
    document.getElementsByTagName("main")[0].innerHTML +=
        "<button class=\"add-button\" onclick=\"addCardStart()\"><img class=\"add-button-img\" src=\"img/add.png\"></button>";
    ++cardCount;
}


function closeAddModalWindow() {
    closeModalWindow();
    document.getElementsByTagName("main")[0].innerHTML +=
        "<button class=\"add-button\" onclick=\"addCardStart()\"><img class=\"add-button-img\" src=\"img/add.png\"></button>";
}

function closeModalWindow() {
    document.getElementById("openModal").remove();
}

function deleteCard(cardId) {
    document.getElementById("card" + cardId.toString()).remove();
    for (let i = cardId + 1; i < cardCount; ++i) {
        let curCard = document.getElementById("card" + i.toString());
        Array.prototype.forEach.call(curCard.getElementsByClassName("tool-button"),
            function (curButton) {
                let onClickFunc = curButton.getAttribute("onclick");
                curButton.setAttribute("onclick", onClickFunc.substring(0, onClickFunc.indexOf('(') + 1) + (i - 1).toString() + onClickFunc.substring(onClickFunc.indexOf(')'), onClickFunc.length));
            });
        curCard.setAttribute("id", "card" + (i - 1).toString());
    }
    --cardCount;
}

function editCardStart(cardId) {
    let curCard = document.getElementById("card" + cardId.toString());
    let cardPhoto = curCard.getElementsByClassName("card-photo")[0].getAttribute("src");
    let cardDescription = curCard.getElementsByClassName("card-description")[0].innerText;
    document.getElementsByTagName("main")[0].innerHTML +=
        "<div id=\"openModal\" class=\"modal\">\n" +
        "  <div class=\"modal-dialog\">\n" +
        "    <div class=\"modal-content\">\n" +
        "      <div class=\"modal-header\">\n" +
        "        <h3 class=\"modal-title\">Edit element</h3>\n" +
        "        <button class=\"close\" onclick=\"closeModalWindow()\">×</button>\n" +
        "      </div>\n" +
        "      <div class=\"card-input\">\n" +
        "        <p>Photo Url: <input id=\"card-photo-input\" type=\"text\"></p>\n" +
        "        <p>Description: <textarea id=\"card-description-input\"></textarea></p>\n" +
        "        <button class=\"edit-card-button\" onclick=\"editCardFinish(" + cardId.toString() + ")\">edit</button>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "</div>";
    document.getElementById("card-photo-input").value = cardPhoto;
    document.getElementById("card-description-input").value = cardDescription;
}

function editCardFinish(cardId) {
    document.querySelector("div#card" + cardId.toString() + ">img.card-photo").setAttribute("src", document.querySelector("input#card-photo-input").value);
    document.querySelector("div#card" + cardId.toString() + ">p.card-description").innerHTML = document.querySelector("textarea#card-description-input").value;
    closeModalWindow();
}

function moveCardUp(cardId) {
    if (cardId === 0)
        return;
    let cards = [document.querySelector("div#card" + (cardId - 1).toString()), document.querySelector("div#card" + (cardId).toString())];
    let firstHTMl = cards[0].innerHTML;
    cards[0].innerHTML = cards[1].innerHTML;
    cards[1].innerHTML = firstHTMl;
    cards.forEach((card, index) => {
        Array.prototype.forEach.call(card.getElementsByClassName("tool-button"),
            function (curButton) {
                let onClickFunc = curButton.getAttribute("onclick");
                curButton.setAttribute("onclick", onClickFunc.substring(0, onClickFunc.indexOf('(') + 1) + (cardId - 1 + index).toString() + onClickFunc.substring(onClickFunc.indexOf(')'), onClickFunc.length));
            });
    });
}

function moveCardDown(cardId) {
    if (cardId === cardCount - 1)
        return;
    let cards = [document.querySelector("div#card" + (cardId).toString()), document.querySelector("div#card" + (cardId + 1).toString())];
    let firstHTMl = cards[0].innerHTML;
    cards[0].innerHTML = cards[1].innerHTML;
    cards[1].innerHTML = firstHTMl;
    cards.forEach((card, index) => {
        Array.prototype.forEach.call(card.getElementsByClassName("tool-button"),
            function (curButton) {
                let onClickFunc = curButton.getAttribute("onclick");
                curButton.setAttribute("onclick", onClickFunc.substring(0, onClickFunc.indexOf('(') + 1) + (cardId  + index).toString() + onClickFunc.substring(onClickFunc.indexOf(')'), onClickFunc.length));
            });
    });
}