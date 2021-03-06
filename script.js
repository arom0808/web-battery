let cardCount = 0;

function addCardStart() {
    document.getElementsByClassName("add-button")[0].remove();
    document.getElementsByTagName("main")[0].innerHTML +=
        "<div class=\"card-input\">\n" +
        "        <p>Photo Url: <input class=\"card-photo-input\" type=\"text\"></p>\n" +
        "        <p>Description: <textarea class=\"card-description-input\"></textarea></p>\n" +
        "        <button class=\"add-card-button\" onclick=\"addCardFinish()\">add</button>\n" +
        "</div>\n"
}

function addCardFinish() {
    document.getElementsByTagName("main")[0].innerHTML +=
        "<div class=\"card\" id=\"card" + cardCount.toString() + "\">\n" +
        "        <img class=\"card-photo\" src=\"" + document.getElementsByClassName("card-photo-input")[0].value + "\" alt=\"human photo\">\n" +
        "        <p class=\"card-description\">" + document.getElementsByClassName("card-description-input")[0].value + "</p>" +
        "        <div class=\"card-tool-buttons\">\n" +
        "            <button class=\"tool-button\" onclick=\"deleteCard(" + cardCount.toString() + ")\"><img class=\"tool-button-img\" src=\"img/delete.png\"></button>\n" +
        "            <button class=\"tool-button\" onclick=\"editCard(" + cardCount.toString() + ")\"><img class=\"tool-button-img\" src=\"img/edit.png\"></button>\n" +
        "            <button class=\"tool-button\" onclick=\"moveCardUp(" + cardCount.toString() + ")\"><img class=\"tool-button-img\" src=\"img/top-button.png\"></button>\n" +
        "            <button class=\"tool-button\" onclick=\"moveCardDown(" + cardCount.toString() + ")\"><img class=\"tool-button-img\" src=\"img/bottom-button.png\"></button>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "<button class=\"add-button\" onclick=\"addCardStart()\"><img class=\"add-button-img\" src=\"img/add.png\"></button>";
    document.getElementsByClassName("card-input")[0].remove();
    ++cardCount;
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

function editCard(cardId) {
    let curCard = document.getElementById("card" + cardId.toString());
    let cardPhoto = curCard.getElementsByClassName("card-photo")[0].getAttribute("src");
    let cardDescription = curCard.getElementsByClassName("card-description")[0].innerText;
    curCard.setAttribute("class", "card-input");
    curCard.setAttribute("id", "card-input" + cardId.toString());
    curCard.innerHTML =
        "   <p>Photo Url: <input class=\"card-photo-input\" type=\"text\"></p>\n" +
        "   <p>Description: <textarea class=\"card-description-input\"></textarea></p>\n" +
        "   <button class=\"add-card-button\" onclick=\"editCardFinish(" + cardId.toString() + ")\">complete</button>\n";
    curCard.getElementsByClassName("card-photo-input")[0].value = cardPhoto;
    curCard.getElementsByClassName("card-description-input")[0].value = cardDescription;
}

function editCardFinish(cardId) {
    let curCard = document.getElementById("card-input" + cardId.toString());
    let cardPhoto = curCard.getElementsByClassName("card-photo-input")[0].value;
    let cardDescription = curCard.getElementsByClassName("card-description-input")[0].value;
    curCard.setAttribute("class", "card");
    curCard.setAttribute("id", "card" + cardId.toString());
    curCard.innerHTML =
        "    <img class=\"card-photo\" src=\"" + cardPhoto + "\" alt=\"human photo\">\n" +
        "    <p class=\"card-description\">" + cardDescription + "</p>" +
        "    <div class=\"card-tool-buttons\">\n" +
        "        <button class=\"tool-button\" onclick=\"deleteCard(" + cardId.toString() + ")\"><img class=\"tool-button-img\" src=\"img/delete.png\"></button>\n" +
        "        <button class=\"tool-button\" onclick=\"editCard(" + cardId.toString() + ")\"><img class=\"tool-button-img\" src=\"img/edit.png\"></button>\n" +
        "        <button class=\"tool-button\" onclick=\"moveCardUp(" + cardId.toString() + ")\"><img class=\"tool-button-img\" src=\"img/top-button.png\"></button>\n" +
        "        <button class=\"tool-button\" onclick=\"moveCardDown(" + cardId.toString() + ")\"><img class=\"tool-button-img\" src=\"img/bottom-button.png\"></button>\n" +
        "    </div>\n";
}

function moveCardUp(cardId) {
    if (cardId === 0)
        return;
    let firstCard = document.getElementById("card" + (cardId - 1).toString());
    let secondCard = document.getElementById("card" + cardId.toString());
    if (firstCard === null) {
        firstCard = document.getElementById("card-input" + (cardId - 1).toString());
        firstCard.setAttribute("class", "card");
        firstCard.setAttribute("id", "card" + (cardId - 1).toString());
        secondCard.setAttribute("class", "card-input");
        secondCard.setAttribute("id", "card-input" + cardId.toString());
        let photoUrl = firstCard.getElementsByClassName("card-photo-input")[0].value;
        let description = firstCard.getElementsByClassName("card-description-input")[0].value;
        firstCard.getElementsByClassName("add-card-button")[0].setAttribute("onclick", "editCardFinish(" + cardId.toString() + ")");
        let firstHTMl = firstCard.innerHTML;
        firstCard.innerHTML = secondCard.innerHTML;
        secondCard.innerHTML = firstHTMl;
        secondCard.getElementsByClassName("card-photo-input")[0].value = photoUrl;
        secondCard.getElementsByClassName("card-description-input")[0].value = description;
        Array.prototype.forEach.call(firstCard.getElementsByClassName("tool-button"),
            function (curButton) {
                let onClickFunc = curButton.getAttribute("onclick");
                curButton.setAttribute("onclick", onClickFunc.substring(0, onClickFunc.indexOf('(') + 1) + (cardId - 1).toString() + onClickFunc.substring(onClickFunc.indexOf(')'), onClickFunc.length));
            });
        return;
    }
    let firstHTMl = firstCard.innerHTML;
    firstCard.innerHTML = secondCard.innerHTML;
    secondCard.innerHTML = firstHTMl;
    Array.prototype.forEach.call(firstCard.getElementsByClassName("tool-button"),
        function (curButton) {
            let onClickFunc = curButton.getAttribute("onclick");
            curButton.setAttribute("onclick", onClickFunc.substring(0, onClickFunc.indexOf('(') + 1) + (cardId - 1).toString() + onClickFunc.substring(onClickFunc.indexOf(')'), onClickFunc.length));
        });
    Array.prototype.forEach.call(secondCard.getElementsByClassName("tool-button"),
        function (curButton) {
            let onClickFunc = curButton.getAttribute("onclick");
            curButton.setAttribute("onclick", onClickFunc.substring(0, onClickFunc.indexOf('(') + 1) + (cardId).toString() + onClickFunc.substring(onClickFunc.indexOf(')'), onClickFunc.length));
        });
}

function moveCardDown(cardId) {
    if (cardId === cardCount - 1)
        return;
    let firstCard = document.getElementById("card" + (cardId).toString());
    let secondCard = document.getElementById("card" + (cardId + 1).toString());
    if (secondCard === null) {
        secondCard = document.getElementById("card-input" + (cardId + 1).toString());
        secondCard.setAttribute("class", "card");
        secondCard.setAttribute("id", "card" + (cardId + 1).toString());
        firstCard.setAttribute("class", "card-input");
        firstCard.setAttribute("id", "card-input" + cardId.toString());
        let photoUrl = secondCard.getElementsByClassName("card-photo-input")[0].value;
        let description = secondCard.getElementsByClassName("card-description-input")[0].value;
        secondCard.getElementsByClassName("add-card-button")[0].setAttribute("onclick", "editCardFinish(" + cardId.toString() + ")");
        secondCard.getElementsByClassName("card-photo-input")[0].value = photoUrl;
        secondCard.getElementsByClassName("card-description-input")[0].value = description;
        Array.prototype.forEach.call(firstCard.getElementsByClassName("tool-button"),
            function (curButton) {
                let onClickFunc = curButton.getAttribute("onclick");
                curButton.setAttribute("onclick", onClickFunc.substring(0, onClickFunc.indexOf('(') + 1) + (cardId + 1).toString() + onClickFunc.substring(onClickFunc.indexOf(')'), onClickFunc.length));
            });
        let firstHTMl = firstCard.innerHTML;
        firstCard.innerHTML = secondCard.innerHTML;
        secondCard.innerHTML = firstHTMl;
        return;
    }
    let firstHTMl = firstCard.innerHTML;
    firstCard.innerHTML = secondCard.innerHTML;
    secondCard.innerHTML = firstHTMl;
    Array.prototype.forEach.call(firstCard.getElementsByClassName("tool-button"),
        function (curButton) {
            let onClickFunc = curButton.getAttribute("onclick");
            curButton.setAttribute("onclick", onClickFunc.substring(0, onClickFunc.indexOf('(') + 1) + (cardId).toString() + onClickFunc.substring(onClickFunc.indexOf(')'), onClickFunc.length));
        });
    Array.prototype.forEach.call(secondCard.getElementsByClassName("tool-button"),
        function (curButton) {
            let onClickFunc = curButton.getAttribute("onclick");
            curButton.setAttribute("onclick", onClickFunc.substring(0, onClickFunc.indexOf('(') + 1) + (cardId + 1).toString() + onClickFunc.substring(onClickFunc.indexOf(')'), onClickFunc.length));
        });
}