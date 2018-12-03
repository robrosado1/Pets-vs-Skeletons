function toArray(posString) {
  let stringArray = posString.split(",");
  return stringArray.map(numStr => Number(numStr));
}

class Grid {
  constructor(game) {
    this.game = game;

    this.grid = document.createElement("table");
    const main = document.getElementById("main");
    this.grid.id = "grid";
    main.appendChild(this.grid);

    this.build();
  }

  build() {
    for (let i = 0; i < 5; i++) {
      let row = this.grid.appendChild(document.createElement("tr"));
      for (let j = 0; j < 3; j++) {
        let cell = row.appendChild(document.createElement("td"));
        const posArr = [j, i];
        const posStr = posArr.join();

        cell.addEventListener("click", e => {

          this.game.addPets(posArr, posStr);
          console.log(posArr);
        });
      }
    }
  }
}
