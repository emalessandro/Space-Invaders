let id = null, id2 = null, id3 = null;
let widthPage = window.innerWidth;
let imgSize = 50;
let enemySpeed = 2;
let posLeftCannon;
let sizeBorderGamePage = 4;
let marginGamePage = 40;
let widthGamePage = widthPage - imgSize - marginGamePage - sizeBorderGamePage;
let maxJumps = (400 / imgSize) - 1;
let heightJump = imgSize;
let btnStart = document.getElementById("btStart");

document.getElementById("animateCannon").style.width = widthGamePage;

let propPercent = ((widthPage - imgSize - 100) * 100) / widthPage;
document.getElementById("container").style.width = propPercent + "%;";

function btnClickState() {
    const button = document.getElementById('btStart');

    let elementClicked = false;

    button.addEventListener('click', function handleClick() {
        elementClicked = true;
    });
    return elementClicked;
}

function preMove() {
    const elem = document.getElementById("animate");
    let posLeft = 0;
    id = setInterval(frame3, 0);
    id2 = setInterval(changeImage(elem), 0);
    let state = "right";

    function frame3() {

        if (state === "right") {
            if (posLeft < widthGamePage) {
                posLeft += enemySpeed;
                elem.style.left = posLeft + "px";

            } else {
                state = "left";
            }
        }

        if (state === "left") {
            if (posLeft > 0) {
                posLeft -= enemySpeed;
                elem.style.left = posLeft + "px";
            } else {
                state = "right";
            }
        }
    }
}

function myMove() {
    document.getElementById("btReset").className = "buttonOff";
    document.getElementById("btReset").disabled = true;
    document.getElementById("btStart").className = "buttonOff";
    document.getElementById("btStart").disabled = true;
    document.getElementById("btShoot").className = "buttonShoot";
    document.getElementById("btShoot").disabled = false;

    const elem = document.getElementById("animate");
    let posLeft = 0, posTop = 0;
    id = setInterval(frame2, 0);
    id2 = setInterval(changeImage(elem), 0);
    let state = "right";
    let latestPose = "right";
    let jumps = 0;

    function frame2() {

        if (state === "right" && jumps < maxJumps) {
            if (posLeft < widthGamePage) {
                posLeft += enemySpeed;
                elem.style.left = posLeft + "px";

            } else {
                latestPose = "right";
                state = "down";
            }
        }

        if (state === "down" && jumps < maxJumps) {
            if (posTop < heightJump) {
                posTop += enemySpeed;
                elem.style.top = posTop + "px";
            } else {
                if (latestPose === "right")
                    state = "left";
                else if (latestPose === "left")
                    state = "right";
                heightJump += imgSize;
                jumps++;
            }
        }

        if (state === "left" && jumps < maxJumps) {
            if (posLeft > 0) {
                posLeft -= enemySpeed;
                elem.style.left = posLeft + "px";
            } else {
                latestPose = "left";
                state = "down";
            }
        }
        if (jumps === maxJumps) {
            if (posLeft > 0) {
                posLeft -= enemySpeed;
                elem.style.left = posLeft + "px";
            } else {
                gameOver(id, id2);
            }
        }
    }
}

function moveCannon() {
    const elem = document.getElementById("animateCannon");
    posLeftCannon = 0;
    id = setInterval(frame3, 0);
    let state = "right";

    function frame3() {

        if (state === "right") {
            if (posLeftCannon < widthGamePage) {
                posLeftCannon += enemySpeed;
                elem.style.left = posLeftCannon + "px";

            } else {
                state = "left";
            }
        }

        if (state === "left") {
            if (posLeftCannon > 0) {
                posLeftCannon -= enemySpeed;
                elem.style.left = posLeftCannon + "px";
            } else {
                state = "right";
            }
        }
    }
}

function changeImage(elem) {
    setInterval(function () {
        if (elem.src.includes("images/space%20invader.png")) {
            elem.src = "images/space invader2.png";
        } else {
            elem.src = "images/space invader.png";
        }
        console.log(elem.src);
    }, 100);
}

function reset() {
    document.getElementById("container").innerHTML = '<img src="images/space invader.png" id ="animate" alt="">';
    const elem = document.getElementById("animate");
    elem.style.left = "0px";
    elem.style.top = "0px";
    heightJump = imgSize;
    document.getElementById("btStart").className = "button";
    document.getElementById("btStart").disabled = false;
    document.getElementById("btShoot").className = "buttonOff";
    document.getElementById("btShoot").disabled = true;
    document.getElementById("btReset").className = "buttonOff";
    document.getElementById("btReset").disabled = true;
}

function gameOver() {
    clearInterval(id);
    clearInterval(id2);
    document.getElementById("container").innerHTML = '<h1 style="text-align:center; margin: auto; color:white;">GAME OVER</h1>';
    document.getElementById("btReset").className = "button";
    document.getElementById("btReset").disabled = false;
    document.getElementById("btShoot").className = "buttonOff";
    document.getElementById("btShoot").disabled = true;
}

function haiVinto() {
    clearInterval(id);
    clearInterval(id2);
    document.getElementById("container").innerHTML = '<h1  style="text-align:center; margin: auto; color:white;">HAI VINTO</h1>';
    document.getElementById("btReset").className = "button";
    document.getElementById("btReset").disabled = false;
    document.getElementById("btShoot").className = "buttonOff";
    document.getElementById("btShoot").style.marginLeft = "180px";
    document.getElementById("btShoot").disabled = true;
}

function shoot() {
    let bullet = document.createElement("img");
    bullet.src = "images/bullet.png";
    bullet.style.position = "absolute";
    bullet.style.bottom = "0px";
    bullet.style.left = posLeftCannon + "px";
    bullet.style.width = "50px";
    bullet.style.height = "50px";
    document.getElementById("container").appendChild(bullet);

    let animate = document.getElementById("animate");

    let id3 = setInterval(frame, 10);

    function frame() {
        bullet.style.bottom = (parseInt(bullet.style.bottom) + 10) + "px";

        if (touching(animate, bullet)) {
            haiVinto();
            clearInterval(id3);
        }

        if (bullet.style.bottom === "770px") {
            clearInterval(id3);
            container.removeChild(bullet);
        }
    }

    function touching(d1, d2) {
        let ox = Math.abs(d1.x - d2.x) < (d1.x < d2.x ? d2.width : d1.width);
        let oy = Math.abs(d1.y - d2.y) < (d1.y < d2.y ? d2.height : d1.height);
        return ox && oy;
    }
}
