window.addEventListener("load", () => {
  drawCanvas();
});

function drawCanvas() {
  var canvas = document.getElementById("canvas");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext("2d");

  ctx.fillStyle = "#605e5e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawTree(ctx);
}

function drawTree(ctx) {
  const tree = new CanvasTree(ctx, [3, 5, 7, 2, 9]);
  tree.drawTree();
}
