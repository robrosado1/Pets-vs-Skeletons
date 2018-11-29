
document.addEventListener("DOMContentLoaded", () => {
    window.requestAnimationFrame(step);
    document.addEventListener("keydown", keyDownHandler);

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let skeleton = new Image();
    let cat = new Image();


    function init() {
      window.requestAnimationFrame(step);
    }
  }
);
