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
	const state = {
		mousedown: false,
	};

	canvas.addEventListener("mousedown", handleWritingStart);
	canvas.addEventListener("mousemove", handleWritingInProgress);
	canvas.addEventListener("mouseup", handleDrawingEnd);
	canvas.addEventListener("mouseout", handleDrawingEnd);

	canvas.addEventListener("touchstart", handleWritingStart);
	canvas.addEventListener("touchmove", handleWritingInProgress);
	canvas.addEventListener("touchend", handleDrawingEnd);

	function handleWritingStart(event) {
		event.preventDefault();

		const mousePos = getMosuePositionOnCanvas(event);
		ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
		ctx.beginPath();
		ctx.moveTo(mousePos.x, mousePos.y);

		ctx.fill();

		state.mousedown = true;
	}

	function handleWritingInProgress(event) {
		event.preventDefault();

		if (state.mousedown) {
			const mousePos = getMosuePositionOnCanvas(event);
			if (rainbowColor === true) {
				hue++;
				if (hue >= 360) {
					hue = 0;
				}
			}
			ctx.lineTo(mousePos.x, mousePos.y);

			ctx.stroke();
		}
	}

	function handleDrawingEnd(event) {
		event.preventDefault();

		if (state.mousedown) {
			ctx.stroke();
		}

		state.mousedown = false;
	}

	function getMosuePositionOnCanvas(event) {
		const clientX = event.clientX || event.touches[0].clientX;
		const clientY = event.clientY || event.touches[0].clientY;
		const { offsetLeft, offsetTop } = event.target;
		const canvasX = clientX - offsetLeft;
		const canvasY = clientY - offsetTop;

		return { x: canvasX, y: canvasY };
	}

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
canvas.addEventListener("pointermove", draw, true);
canvas.addEventListener("pointerup", () => (isDrawing = false));
canvas.addEventListener("pointerdown", () => (isDrawing = false));

rainbow.addEventListener("click", () => {
	rainbowColor = !rainbowColor ? true : false;
	rainbow.classList.toggle("rainbow--toggled");
});
