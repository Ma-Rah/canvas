// Variables section
const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const clearBtn = document.querySelector("#clearBtn");
const downloadBtn = document.querySelector("#downloadBtn");
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

// functions section
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	// true for mobile device
	// wrapper.innerHTML = `<h1>Sorry, this site is currently not available on mobile devices.</h1>`;
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

const clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

function download() {
	const download = document.getElementById("download");
	const image = document
		.getElementById("draw")
		.toDataURL("image/png")
		.replace("image/png", "image/octet-stream");
	download.setAttribute("href", image);
}

// event listeners section
canvas.addEventListener("mousedown", (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

colorPicker.addEventListener("input", () => (colorPicker.style.color = `hsl(${hue}, 100%, 50%)`));
clearBtn.addEventListener("click", clear);
downloadBtn.addEventListener("click", download);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

// canvas.addEventListener("touchstart", draw);
// canvas.addEventListener("touchmove", () => (isDrawing = false));
// canvas.addEventListener("touchend", () => (isDrawing = false));

rainbow.addEventListener("click", () => {
	rainbowColor = !rainbowColor ? true : false;
	rainbow.classList.toggle("rainbow--toggled");
});

// Set up touch events for mobile, etc
canvas.addEventListener(
	"touchstart",
	function (e) {
		mousePos = getTouchPos(canvas, e);
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY,
		});
		canvas.dispatchEvent(mouseEvent);
	},
	false
);
canvas.addEventListener(
	"touchend",
	function (e) {
		var mouseEvent = new MouseEvent("mouseup", {});
		canvas.dispatchEvent(mouseEvent);
	},
	false
);
canvas.addEventListener(
	"touchmove",
	function (e) {
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY,
		});
		canvas.dispatchEvent(mouseEvent);
	},
	false
);

// Prevent scrolling when touching the canvas
document.body.addEventListener(
	"touchstart",
	function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	},
	false
);
document.body.addEventListener(
	"touchend",
	function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	},
	false
);
document.body.addEventListener(
	"touchmove",
	function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	},
	false
);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
	var rect = canvasDom.getBoundingClientRect();
	return {
		x: touchEvent.touches[0].clientX - rect.left,
		y: touchEvent.touches[0].clientY - rect.top,
	};
}

// Draw to the canvas
function renderCanvas() {
	if (drawing) {
		ctx.moveTo(lastPos.x, lastPos.y);
		ctx.lineTo(mousePos.x, mousePos.y);
		ctx.stroke();
		lastPos = mousePos;
	}
}
