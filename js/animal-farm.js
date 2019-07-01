function Game(start) {
    this.animals = [start];
    this.stillPlaying = true;
}

class Animal {
  constructor(eat, counter, alive) {
    this.eat = eat;
    this.produceOffspringCounter = counter;
    // when kill is true, the animal is alive
    this.alive = alive;
  }
  // call this function to kill the animal
  slaughterAnimal() {
    console.log('log 1- animal-farm--\nAnimal is alive!');
    this.alive = false;
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
      game.animals.push(new Chicken(10, 0, true));
      // remove all event listeners from chicken class so we don't get duplicates
      $('.chicken').unbind();
      //add a new chicken to html
      $('.animalPen').append(`
        <div class="chicken" value="${game.animals.length - 1}">
          <p>chicken</p>
        </div>`);
        // make the new chicken clickable
        $('.chicken').bind('click', frontEnd);
    }
  }

}
// chickens
class Chicken extends Animal {
// create a chicken that is an Animal
  constructor(eat, counter, alive) {
    super(eat, counter, alive);

  }
}



//front end
var game = new Game(new Chicken(10, 10, true));


function frontEnd() {
  console.log(`Bock ${$(this).attr('value')}`);
  console.log(game.animals[$(this).attr('value')]);
  let chickenNumber = $(this).attr('value');
  console.log(chickenNumber);
  // is the selected chicken still alive
  console.log(game.animals[chickenNumber].alive);
  if (game.animals[chickenNumber].alive) {
    // feed the selected chicken -- even though this statement is false it is still letting our UI feed the chicken
    $('#feed').off().click(function () {
      console.log(`I fed ${game.animals[chickenNumber].produceOffspringCounter}`);
      game.animals[chickenNumber].feedAnimal();
    })
    $('#kill').off().click(function () {
      console.log(`I killed ${chickenNumber}`);
      game.animals[chickenNumber].slaughterAnimal();
    })

  } else {
    console.log(`chicken ${chickenNumber} is dead.`);
  };
}





$(document).ready(function () {
  $('.chicken').off().click(frontEnd);
    //console.log($(this).attr('value'));


    //$('#feed').click(feedAnimal());

})
