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
  gameClock() {
    const doomsdayClock = setInterval(gameTimer, 1000);
    function gameTimer() {
      if (isThereALivingAnimal()) {
        for(let i = 0; i < game.animals.length; i++) {
          if(game.animals[i].hunger >= 0 && game.animals[i].alive) {
            game.animals[i].hunger -= 1;
          } else {
            game.animals[i].alive = false;
          }
          updateAnimalsDisplayedStats(i);
          dyingAnimal(i);
        }
      } else if (game.bank >= 100) {
        alert(`You Win!`)
      } else {
        alert(`You Lose!`);
      }
    }
    function isThereALivingAnimal() {
      if (game.bank >= 100) {
        clearInterval(doomsdayClock);
        game.stillPlaying = false;
        return false;
      } else {
        for (var i = 0; i < game.animals.length; i++) {
          if (game.animals[i].alive) {
            return true;
          }
        }
        clearInterval(doomsdayClock);
        game.stillPlaying = false;
        return false;
      }
    }
  }
}



class Animal {
  constructor(serialNumber) {
    this.hunger = 0;
    this.maxHunger = 0;
    this.readyToProduceOffspring = 0;
    this.readyToProduceOffspringAt = 0;
    this.value = 0;
    this.serialNumber = serialNumber;
    this.alive = true;
  }
  // call this function to sell the animal
  sellAnimal() {
    game.animals[game.selectedAnimal].alive = false;
    game.bank += game.animals[game.selectedAnimal].value;
  }
  // call this function to feed the animal
  feedAnimal() {
    if (game.feed > 0) {
      game.animals[game.selectedAnimal].hunger = 20;
      game.animals[game.selectedAnimal].readyToProduceOffspring += 1;
      game.feed -= 1;
    } else {
      console.log(`You do not have any feed left. Please buy more.`);
    }
  }
  // this function will determine if animal has been fed enough to produce offspring
  produceOffspring() {
    game.animals[game.selectedAnimal].readyToProduceOffspring = 0;
    let typeOfAnimal = (game.animals[game.selectedAnimal].constructor.name).toString();
    if (typeOfAnimal === 'Chicken' && game.selectedAnimal === '7') {
      game.animals.push(new Goat(game.animals.length));
      typeOfAnimal = 'Goat';
    } else if (typeOfAnimal === 'Goat') {
      game.animals.push(new Goat(game.animals.length));
    } else if (typeOfAnimal === 'Chicken') {
      game.animals.push(new Chicken(game.animals.length));
    } else {
      console.log(`log 1- animal-farm.js-- produceOffspring()---\nType of animal is ${typeOfAnimal}. This animal has not yet been defined in the produceOffspring prototype of Animal.`);
    }
    return typeOfAnimal
  }
}



// create a chicken that is an Animal
class Chicken extends Animal {
  constructor(serialNumber) {
    super(serialNumber);
    this.hunger = 20;
    this.maxHunger = 20;
    this.readyToProduceOffspring = 0;
    this.readyToProduceOffspringAt = 9;
    this.value = 10;
    this.serialNumber = serialNumber;
    this.alive = true;
  }
}
// create a Goat!
class Goat extends Animal {
  constructor(serialNumber) {
    super(serialNumber);
    this.hunger = 30;
    this.maxHunger = 30;
    this.readyToProduceOffspring = 0;
    this.readyToProduceOffspringAt = 15;
    this.serialNumber = serialNumber;
    this.value = 30;
    this.alive = true;
  }
}





//front end
// UI logic
var game = new Game(new Chicken(0));
game.gameClock();

function frontEnd() {
  $('.animal').removeClass('selected');
  $(this).addClass('selected');
  game.selectedAnimal = $(this).attr('value');

  $('#feed').off().click(function () {
    dyingAnimal(game.selectedAnimal);
    if (game.animals[game.selectedAnimal].alive) {
      game.animals[game.selectedAnimal].feedAnimal();
      updateFeedAndBank();
      updateAnimalsDisplayedStats(game.selectedAnimal);
      if (game.animals[game.selectedAnimal].readyToProduceOffspring === game.animals[game.selectedAnimal].readyToProduceOffspringAt) {
        let tempTypeOfAnimal = game.animals[game.selectedAnimal].produceOffspring();
        $(`.animal`).unbind();
        //add a new animal to html
        $('.animalPen').append(`
          <div class="animal" value="${game.animals.length - 1}">
          <p>${tempTypeOfAnimal}</p>
          <span id="${game.animals.length - 1}"></span>
          <label for="meter">Egg</label>
          <meter value="" min="0" max="${game.animals[game.animals.length -1].readyToProduceOffspringAt}"></meter>
          <label for="meter">Death</label>
          <meter value="" min="0" max="${game.animals[game.animals.length -1].maxHunger}"></meter>
          </div>`);
          $(`.animal`).bind('click', frontEnd);
          $(`#${game.selectedAnimal}`).nextAll().eq(1).attr(`value`, 0);
        }
        $(`#${game.selectedAnimal}`).nextAll().eq(1).attr(`value`, game.animals[game.selectedAnimal].readyToProduceOffspring);
      } else {
        console.log(`chicken ${game.selectedAnimal} is dead and no longer requires sustenance`);
      }
    });

    $('#buy').off().click(function () {
      game.buyFeed();
      updateFeedAndBank()
    });

    $('#sell').off().click(function () {
      if (game.animals[game.selectedAnimal].alive) {
        game.animals[game.selectedAnimal].sellAnimal();
        $('.selected').addClass('hidden');
        $('.animal').removeClass('selected');
        updateFeedAndBank()
      } else {
        console.log(`chicken ${game.selectedAnimal} is dead. No one wants to buy your disgusting dead chicken.`);
      }
    })
  }

  // if the animal is dying make it shake
  function dyingAnimal(indexOfAnimal) {
    if (game.animals[indexOfAnimal].hunger <= 5 && game.animals[indexOfAnimal].hunger > 0) {
      $(`#${indexOfAnimal}`).parent().addClass('dying');
    } else if (game.animals[indexOfAnimal].hunger === 0) {
      $(`#${indexOfAnimal}`).parent().addClass('dead');
      $(`#${indexOfAnimal}`).parent().removeClass('dying');
    } else {
      $(`#${indexOfAnimal}`).parent().removeClass('dying');
    }
  }
  // when the animals have been fed, feed has been bought and money spent, update the UI to reflect these changes
  function updateFeedAndBank() {
    $('#bank').text(game.bank);
    $('#feedCount').text(game.feed);
  }
  function updateAnimalsDisplayedStats(indexOfAnimal) {
    $(`#${indexOfAnimal}`).nextAll().eq(3).attr(`value`, game.animals[indexOfAnimal].hunger);
    updateFeedAndBank();
  }

  $(document).ready(function () {
    $('.animal').off().click(frontEnd);
  });
