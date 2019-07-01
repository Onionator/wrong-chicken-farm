function Game(start) {
    this.animals = [start];
    this.stillPlaying = true;
}

class Animal {
  constructor(eat, counter, dead) {
    this.eat = eat;
    this.produceOffspringCounter = counter;
    // when kill is true, the animal is dead
    this.dead = dead;
  }
  // call this function to kill the animal
  slaughterAnimal() {
    console.log('log 1- animal-farm--\nAnimal is dead!');
    this.dead = true;
  }
  // call this function to feed the animal
  feedAnimal() {
    console.log('log 2- animal-farm--\nfed animal');
    this.eat += 10;
    this.produceOffspringCounter += 1;
  }
  // this function will determine if animal has been fed enough to produce offspring
  produceOffspring() {
    if (this.produceOffspringCounter >= 9) {
      console.log('log 3- animal-farm--\nanimal counter set to 0');
      this.produceOffspringCounter = 0;
      // if above condition is met, create another instance of same animal
      console.log('log 4- animal-farm--\ncreated a new animal');
      //create a new chicken in the game.animals array
      game.animals.push(new Chicken(10, 0, false));
      // remove all event listeners from animalPen class so we don't get duplicates
      $('.animalPen').unbind();
      //add a new chicken to html
      $('body').append(`
        <div class="animalPen" value="${game.animals.length - 1}">
          <p>chicken</p>
        </div>`);
        // make the new chicken clickable
        $('.animalPen').bind('click', frontEnd);
    }
  }

}
// chickens
class Chicken extends Animal {
// create a chicken that is an Animal
  constructor(eat, counter, dead) {
    super(eat, counter, dead);

  }
}



var game = new Game(new Chicken(10, 10, false));


function frontEnd() {
  console.log('Bock');
  // if (!game.animals[this.value].dead) {
  //   console.log('bock');
  // }
}
//front end

$(document).ready(function () {
  $('.animalPen').click(frontEnd)
})
