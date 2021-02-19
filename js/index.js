const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const button = document.querySelector("#clearBtn");
const width = document.querySelector("#width");
const rainbow = document.querySelector(".btn__rainbow");
const wrapper = document.querySelector(".wrapper");
const colorPicker = document.querySelector(".colorPicker");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 25;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
let rainbowColor = false;

const clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	// true for mobile device
	wrapper.innerHTML = `<h1>Sorry, this site is currently not available on mobile devices.</h1>`;
} else {
	// false for not mobile device
	function draw(e) {
		if (!isDrawing) return; //only run when drawing
		ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
		ctx.beginPath();
		// Start from :
		ctx.moveTo(lastX, lastY);
		// Go to:
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke();
		[lastX, lastY] = [e.offsetX, e.offsetY];

		if (rainbowColor === true) {
			hue++;
			if (hue >= 360) {
				hue = 0;
			}
		}
	}
}

width.addEventListener("onchange", () => console.log("yes"));
colorPicker.addEventListener("input", () => (colorPicker.style.color = `hsl(${hue}, 100%, 50%)`));
button.addEventListener("click", clear);

rainbow.addEventListener("click", () => {
	rainbowColor = !rainbowColor ? true : false;
	rainbow.classList.toggle("rainbow--toggled");
});

// mouse listeners
canvas.addEventListener("mousedown", (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

function download() {
	var download = document.getElementById("download");
	var image = document
		.getElementById("draw")
		.toDataURL("image/png")
		.replace("image/png", "image/octet-stream");
	download.setAttribute("href", image);
}
