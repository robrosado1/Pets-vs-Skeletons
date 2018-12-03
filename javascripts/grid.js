function toArray(posString) {
  let stringArray = posString.split(",");
  return stringArray.map(numStr => Number(numStr));
}

class Grid {
  constructor(game) {
    this.game = game;

    const main = document.getElementById("main");
    const div = document.createElement("div");
    div.id = "grid-container";
    main.appendChild(div);
    this.grid = document.createElement("table");
    this.grid.id = "grid";
    div.appendChild(this.grid);

    this.build();
  }

  build() {
    for (let i = 0; i < 5; i++) {
      let row = this.grid.appendChild(document.createElement("tr"));
      for (let j = 0; j < 9; j++) {
        let cell = row.appendChild(document.createElement("td"));
        const posArr = [j, i];
        const posStr = posArr.join();
        if (j > 2) {
          cell.className = "out-of-bounds";
        } else {
          cell.className = "placeable";
        }

        cell.addEventListener("click", e => {

          this.game.addPets(posArr, posStr);
          console.log(posArr);
        });
      }
    }
  }
}
