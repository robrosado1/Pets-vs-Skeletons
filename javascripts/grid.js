function Grid() {
  const grid = document.createElement("table");
  grid.className = "grid";
  for (let i = 0; i < 5; i++) {
    let row = grid.appendChild(document.createElement("tr"));
    for (let j = 0; j < 9; j++) {
      let cell = row.appendChild(document.createElement("td"));
      cell.innerHTML = i + 1;
      cell.addEventListener("click", () => {
        console.log(cell.value);
      });
    }
  }
  return grid;
}
