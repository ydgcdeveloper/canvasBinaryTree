window.addEventListener("load", () => {
  drawCanvas();
});

function drawCanvas() {
  var canvas = document.getElementById("canvas");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext("2d");

  
  drawTree(ctx);
}

function drawTree(ctx) {
  const tree = new CanvasTree(ctx, [3, 5, 7, 2, 9]);
  tree.drawTree();
}
