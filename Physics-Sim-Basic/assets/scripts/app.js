const mainCanvas = document.getElementById("simulationCanvas");
const launchButton = document.getElementById("launchButton");
const speedAdjuster = document.getElementById("speedAdjuster");
const speedReadout = document.getElementById("speedReadout");
const currentSpeedReadout = document.getElementById("currentSpeedReadout");
let mainContext = mainCanvas.getContext("2d");
let vx, vy, x, y;
const newtonG = 6.67e-11; // grav. constant in SI units
const earthMass = 5.97e24; // kilograms
const earthRadius = 6.371e6;
let mountainHeight = earthRadius * 0.165;
let timer;

launchButton.addEventListener("click", fireProjectile)
speedAdjuster.addEventListener("input", showSpeed)

function showSpeed() {
    speedReadout.innerHTML = speedAdjuster.value;
}
function fireProjectile() {
    window.clearTimeout(timer);
    x = 0;
    y = earthRadius + mountainHeight;
    vx = Number(speedAdjuster.value);
    vy = 0;
    moveProjectile();
}

function drawProjectile() {
    let metersPerPixel = earthRadius / (0.355 * mainCanvas.clientWidth);
    let pixelx = mainCanvas.clientWidth / 2 + x / metersPerPixel;
    let pixely = mainCanvas.clientHeight / 2 - y / metersPerPixel;
    mainContext.clearRect(0, 0, mainCanvas.clientHeight, mainCanvas.clientWidth);
    mainContext.beginPath();
    mainContext.arc(pixelx, pixely, 5, 0, 2 * Math.PI);
    mainContext.fillStyle = "red";
    let theGradient = mainContext.createRadialGradient(pixelx - 1, pixely - 2, 1, pixelx, pixely, 5);
    theGradient.addColorStop(0, "#ffd0d0");
    theGradient.addColorStop(1, "#ff0000");
    mainContext.fillStyle = theGradient;
    mainContext.fill();
    currentSpeedReadout.innerHTML = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
}

function moveProjectile() {
    let dt = 5; // time step in seconds
    let r = Math.sqrt(x * x + y * y);
    // if (r > earthRadius) {
    let accel = newtonG * earthMass / (r * r); // magnitude of a
    let ax = -accel * x / r;
    let ay = -accel * y / r;
    vx += ax * dt;
    vy += ay * dt;
    x += vx * dt;
    y += vy * dt;
    drawProjectile();
    timer = window.setTimeout(moveProjectile, 1000 / 60);
    //window.setTimeout(moveProjectile, 1000 / 60);
    // }
}
