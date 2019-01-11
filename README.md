# Pets-vs-Skeletons

### Background
Based on the popular tower-defense-style game 'Plants vs Zombies'. Cats are purchased with points and placed on a grid to attack incoming waves of skeleton monsters. Skeletons move across the board from the right staying in lanes that line up with a cat's row. Players start with enough points to buy five cats and gain more points by destroying skeletons. Skeletons and cats have health points that are drained when attacked until they disappear. If skeletons reach all the way to the left side the player loses but if the player can defeat all the skeletons they win.

### MVPs
* Grid game board. Left side where user can place Cats is 3 X 5 spaces.
* Skeleton units that spawn and move and attack cats.
* Cats that can be placed on the player-owned grid and attack enemies.
* Points system used to buy cats and determine score.

*Also*
* *A Production README*
* *Modal for explaining the game mechanics*

### Wireframe
The title of the game will be at the top of the page with my name as creator and personal links will be at the bottom.

[wireframe]: https://github.com/robrosado1/Pets-vs-Skeletons/blob/master/wireframe.png
![wireframe]

### Architecture and Technologies
This project was made using:
* Javascript for game logic
* HTML and CSS for rendering
* Prototypal Inheritance
* Javascript Canvas

Aside from the entry file, there will be the following files:
* `board.js` for rendering the current state of the game: Cats and their placement, Skeletons and their positions, Player's points, etc.
* `grid.js` will be the interactive element of the game where a grid with valid and invalid spaces for placing cats will be determined.
* `game.js` will hold all the logic for enemy spawn rates, score calculations, collision response, game over conditions and more. This is where everything is brought together to make the game run.
* `entity.js` will be the parent class all entities like skeletons and cats will inherit from(all have health and starting position and attacks) containing methods things like for determining proximity and detecting collisions.
* `skeletons.js` & `skelly_plant.js` will include methods specific to the enemy-type entity like movement, row position, speed, and attacks.
* `cat.js` will have specific methods for rendering different actions depending on the specific situation.
* `blasts.js` & `pellets.js` will be be used for projectile entities with reference to their damage value, speed and range.

### The `Board`
The `board.js` file is the foundation on which the game is built through the `Board` class.

The Javascript Canvas is referenced from the `index.html` and the context is prepared for drawing. The `Board` class takes in a `Game` class object as an argument and is initialized to create the initial title card for the game. This is where the game can be either started or instructions accessed.

The use of sprites and Canvas is coordinated through the `requestAnimationFrame` method by which the timing for drawing all game elements is determined. By passing the `Game` as an argument to `Board`, re-renders can be triggered by the frame rate determined by `requestAnimationFrame`.

This file is also where the `initialize` and `startup` methods live. The `startup` handles the DOM manipulation for presenting the title card whereas the `initialize` method's purpose is to set up the `Board` and `Game` and `Grid` to run everything once the "play" option is selected.

### The `Grid`
In `grid.js`, a `table` DOM element is created to cover the Canvas with cells in a grid of 5 rows by 9 columns. The `Grid` is immediately built upon initialization. Each cell has its coordinate values mapped as it is built to allow for determining "valid" cells for placing `Cats`. The user interacts with the `Grid` by clicking a cell where they would like to place a `Cat`.

`cell.addEventListener("click", e => {
  this.game.addPets(posArr, posStr);
});`

This is why the `Game` is passed as an argument to `Grid`. The `Grid` needs to be able to pass its coordinate information to the `Game` for accurate placement.

### The `Game`
`game.js` sets up the initial state of the game with no Cats or Skeletons at first but a starting score.

The `Game` class has methods for adding Cats, Skeletons and Projectiles to the list of available entities but also has methods for checking proximity and collisions and game over status. However, perhaps the most important method is the `draw` method where the Canvas is cleared and all elements are redrawn by a the rate determined by `requestAnimationFrame`.

The `step` method allows for all the game logic that needs to be run between frames to determine game state such as checking for collisions, proximity, and game over status. Only after all those checks is the `draw` method called to update the visuals in response to those state changes.

The `score` attribute of the game is also stored in the `constructor` and is updated whenever a `Cat` is placed or

### Prototypal Inheritance
As previously stated, this game relies heavily on the practice of Prototypal Inheritance. This is accomplished through the use of a convenient `Entity` parent class found in `entity.js`.

All entities of the game regardless of origin inherit from the `Entity` class. This is true for all instances of `Cat`, `Skeleton`, `SkellyPlant` and even the projectiles `Blast` and `Pellet`. Because all of these entities are rendered as "sprites", the `Entity` class provides a `render` method that uses the Canvas context's `drawImage` method and refactors it for simpler use.

```
render(frameRow, frameCol, canvasX, canvasY) {
  ctx.drawImage(this.image, frameRow * this.width, frameCol * this.height,
    this.width, this.height, canvasX, canvasY, this.scaledWidth, this.scaledHeight);
}
```

Aside from rendering, the `Game` class relies on this `Entity` class to provide necessary state information for each entity, namely proximity and collision state for determining what two entities and either entities specific response.

```
latMatchWith(otherEntity) {
  const rowUpperBound = (Math.floor(this.y / 64) * 64);
  const rowLowerBound = rowUpperBound + 64;
  return (this.y >= rowUpperBound &&
    (this.y + (this.height / 2) <= rowLowerBound)) &&
    (otherEntity.pos[1] >= rowUpperBound &&
    (otherEntity.pos[1] + (otherEntity.height / 2) <= rowLowerBound))
}

lonMatchWith(otherEntity) {
  return this.x + (this.width * 0.6) >= otherEntity.x + (otherEntity.width / 3) &&
    this.x + (this.width * 0.3) <= otherEntity.x + (otherEntity.width * 2 / 3)
}
```

The above code snippet is the primary logic used for the one of the most important elements of this game: collisions. Because of the tower defense style of this game and the grid-based coordinate system, collision as well as proximity can be verified by checking first if two entities are in the same row with `latMatchWith(otherEntity)` and then their horizontal distance from each other using `lonMatchWith(otherEntity)`. Without this logic, there would be no way to defeat Skeletons and earn points so it was incredibly important to make sure these methods behaved appropriately.

### Cats and Skeletons and Projectiles
All the entities that actually instantiated during the game have similar `constructor` methods which pull from specific sprite maps source images and have their own specific position coordinates, health, etc. But each entity also has multiple "cycles" for rendering specific actions which is why the parent class' `render` method had to be refactored. Sprite maps like the one pictured below show different sets of animation frames that an entity can go through (ie. "attack") which are separated by row. By refactoring the `render` method, I was able to isolate those rows for rendering specific animations for specific actions.

[sprite_map]: https://github.com/robrosado1/Pets-vs-Skeletons/blob/master/images/skeleton_flying(64x64).png "sprite map"
![alt-text][sprite_map]
All "living" (or undead) entities have a "death" cycle. Upon which, they actually call the `Game` class to use its own `remove` method to delete them from the collection of entities currently present in the game. This also happens whenever an entity leaves the viewport of the canvas so processing power is not wasted on entities that will not be seen again.

For immobile entities like `Cats` and `SkellyPlants`, they have cycles like "shoot" where they motion to release `Blasts` and `Pellets`, respectively, but when they do they also trigger those entities to instantiate at their own coordinates. Similarly, `Skeletons` have a chance to spawn `SkellyPlants` upon death.

Mobile entities like `Skeletons` and the two projectiles don't only render themselves based on sprite maps but also have to have their current x-position constantly updated to move across the Canvas. This `speed` attribute is stored in their `constructor` functions.

### Game Over
When a `Skeleton` successfully breaches the `Cat`'s line of defense and reaches the left edge of the screen the game is over. The `Skeleton` class updates the `Game`'s `over` state when the position is beyond the edge. The `Game` regularly checks for this state change on every `step` and once it is valid the `endGame` method clears out all `Cats` and `Blasts` from the entity collection. The Skeletons remain and continue to spawn in the background but the overlay makes it so no further action can be taken. The game can only be restarted from this point by pressing the  "Play Again" button.
