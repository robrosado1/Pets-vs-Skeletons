# Pets-vs-Skeletons

### Background
Based on the popular tower-defense-style game 'Plants vs Zombies'. Pets are purchased with points and placed on a grid to attack incoming waves of skeleton monsters. Skeletons move across the board from the right staying in lanes that line up with pet space rows. Players start with enough points to buy one pet and gain more points idly by staying alive and also by destroying skeletons. Skeletons and pets have health points that are drained when attacked until they disappear. If skeletons reach all the way to the left side the player loses but if the player can defeat all the skeletons they win.

### MVPs
* Grid game board. Left side where user can place Pets is 3 X 4 spaces.
* Skeleton units that spawn and move and attack pets.
* Pets that can be placed on the player-owned grid and attack skeletons.
* Points system used to buy pets and determine score. 

*Also*
* *A Production README*
* *Modal for explaining the game mechanics*

### Wireframe
Everything for the game is handled within it's window(Instructions button which opens modal, Play button to start game, and Music/SFX toggle button). The title of the game will be at the top of the page with my name as creator and personal links will be at the bottom.

!!image!!

### Architecture and Technologies
This project will be made using:
* Javascript for game logic
* HTML and CSS for rendering

Aside from the entry file, there will be the following files:
* `board.js` for rendering the current state of the game: Pets and their placement, Skeletons and their positions, Player's points, etc.
* `entity.js` will be the parent class all entities like skeletons and pets will inherit from(all have health and starting position and attacks)
* `skeleton.js` will include methods specific to the skeleton entity like movement and row position
* `pet.js` will have specific methods as well like cost and attack cooldown
* `score.js` will update player's score depending on what actions have taken place(purchasing a pet or destroying a skeleton)

### Implementation Timeline
**Day 1**: Setup board class, entities class and score class. Make a grid for entities to be placed. Get base methods for entities to pass down to skeletons and pets. Render a background, the score and the grid. 

**Day 2**: Flesh out the skeleton class and the different skeleton types. Include their associated sprites for rendering. Figure out the specifics for spawning and movement and destruction

**Day 3**: Flesh out the pets class and it's different types. Include associated sprites. Figure out how to do long range attacks and destruction. 

**Day 4**: Get scoring complete and use it for purchasing pets. Should update based on skeleton destruction and pet purchasing. Figure out skeleton wave size and win/loss conditions. Modal for instructions.



