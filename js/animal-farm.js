class Game {
  constructor(start) {
    this.animals = [start];
    // if still playing = false you lose
    this.stillPlaying = true;
    this.bank = 0;
    this.feed = 10;
    this.selectedAnimal = 0;
  }
  buyFeed() {
    if (game.bank >= 7) {
      game.bank -= 7;
      game.feed += 10;
      console.log(`Bought 10 feed for $7. $${game.bank} left.`);
    } else {
      console.log(`Only $${game.bank}. Not enough money.`);
    }
  }
}

class Animal {
  constructor(hunger, counter, alive) {
    this.hunger = hunger;
    this.readyToProduceOffspringCounter = counter;
    // when kill is true, the animal is alive
    this.alive = alive;
  }
  // call this function to kill the animal
  sellAnimal() {
    game.animals[game.selectedAnimal].alive = false;
    game.bank += 10;
    console.log(`I sold chicken ${game.selectedAnimal}`);
  }
  // call this function to feed the animal
  feedAnimal() {
    if (game.feed > 0) {
      console.log(game.selectedAnimal);
      game.animals[game.selectedAnimal].hunger += 10;
      game.animals[game.selectedAnimal].readyToProduceOffspringCounter += 1;
      game.feed -= 1;
      console.log(`Fed animal. ${game.feed} left.`);
    } else {
      console.log(`You do not have any feed left. Please buy more.`);
    }
  }
  // this function will determine if animal has been fed enough to produce offspring
  produceOffspring() {
    if (this.readyToProduceOffspringCounter >= 9) {
      console.log('log 3- animal-farm--\nanimal counter set to 0');
      this.readyToProduceOffspringCounter = 0;
      // if above condition is met, crhungere another instance of same animal
      console.log('log 4- animal-farm--\ncreated a new animal');
      //crhungere a new chicken in the game.animals array
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
    // crhungere a chicken that is an Animal
    constructor(hunger, counter, alive) {
      super(hunger, counter, alive);

    }
  }

function something() {
  let chickenClock = setInterval(chickenTimer, 1000);
  function chickenTimer() {
    if (game.animals[0].hunger > 0 && (game.animals[0].alive)) {
      game.animals[0].hunger -= 1;
      console.log(`Chicken Clock ${game.animals[0].hunger}.`);
      console.log(game.animals[0]);
    } else {
      clearInterval(chickenClock)
      console.log(`Your chicken is dead.`);
    }
  }
}

  //front end
  var game = new Game(new Chicken(10, 10, true));


  function frontEnd() {
    // remove all selected class
    $('.chicken').removeClass('selected');
    // add a class to show which chicken is selected
    $(this).addClass('selected');
    console.log(`Bock ${$(this).attr('value')}`);
    console.log(game.animals[$(this).attr('value')]);
    game.selectedAnimal = $(this).attr('value');
    console.log(game.selectedAnimal);
    // is the selected chicken still alive
    console.log(game.animals[game.selectedAnimal].alive);
    if (game.animals[game.selectedAnimal].alive === true) {
      // feed the selected chicken -- even though this statement is false it is still letting our UI feed the chicken
      $('#feed').off().click(game.animals[game.selectedAnimal].feedAnimal);
        // console.log(`I fed ${game.selectedAnimal}`);

      $('#sell').off().click(function () {
        game.animals[game.selectedAnimal].sellAnimal();
        $('.selected').addClass('hidden');
        $('.chicken').removeClass('selected');
      })

    } else {
      console.log(`chicken ${game.selectedAnimal} is dead.`);
    };
  }




  $(document).ready(function () {
    $('.chicken').off().click(frontEnd);
    $('#buy').off().click(game.buyFeed);
    //console.log($(this).attr('value'));


    //$('#feed').click(feedAnimal());

  })
