
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
      $('#bank').text(game.bank);
      $('#feedCount').text(game.feed);
      console.log(`Bought 10 feed for $7. $${game.bank} left.`);
    } else {
      console.log(`Only $${game.bank}. Not enough money.`);
    }
  }
  chickenClock() {
    const doomsdayClock = setInterval(chickenTimer, 1000);
    function chickenTimer() {
      // if there is one living chicken
      if (anyLivingChickens()) {
        // loop through and update all the chickens hunger meters
        for(let i = 0; i < game.animals.length; i++) {
          if(game.animals[i].hunger > 0 && game.animals[i].alive) {
            game.animals[i].hunger -= 1;
            console.log(`Chicken Clock- chicken ${i}--\n ${game.animals[i].hunger}.`);
            // output the chicken's stats
            $(`#${i}`).nextAll().eq(3).attr(`value`, game.animals[i].hunger);
            $('#bank').text(game.bank);
            //$('#feedCount').text(game.feed);
          } else {
            game.animals[i].alive = false;
            $(`#${i}`).parent().addClass('dead');
            console.log(`Your chicken ${i} is dead.`);
          }
        }
      }
      console.log(`interval still going`);
    }
    function anyLivingChickens() {
      if (game.bank >= 100) {
        clearInterval(doomsdayClock);
        game.stillPlaying = false;
        alert('You Win!');
        return false;
      } else {
        for (var i = 0; i < game.animals.length; i++) {
          if (game.animals[i].alive) {
            return true;
          }
        }
        clearInterval(doomsdayClock);
        game.stillPlaying = false;
        alert('You Lose');
        return false;
      }
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
      game.animals[game.selectedAnimal].hunger = 20;
      game.animals[game.selectedAnimal].readyToProduceOffspringCounter += 1;
      game.feed -= 1;
      console.log(`Fed animal. ${game.feed} left.`);
      // update total feed left
      $('#feedCount').text(game.feed);
      // update selectedAnimal's progress toward producing an produceing an offspring
      console.log('before');
      $(`#${game.selectedAnimal}`).nextAll().eq(1).attr(`value`, game.animals[game.selectedAnimal].readyToProduceOffspringCounter);
      console.log('after');
      if (game.animals[game.selectedAnimal].readyToProduceOffspringCounter >= 9) {
        game.animals[game.selectedAnimal].produceOffspring();
      }
    } else {
      console.log(`You do not have any feed left. Please buy more.`);
    }
  }
  // this function will determine if animal has been fed enough to produce offspring
  produceOffspring() {
    if (game.animals[game.selectedAnimal].readyToProduceOffspringCounter >= 9) {
      game.animals[game.selectedAnimal].readyToProduceOffspringCounter = 0;
      // if above condition is met, crhungere another instance of same animal
      console.log('log 4- animal-farm--\ncreated a new animal');
      //crhungere a new chicken in the game.animals array
      game.animals.push(new Chicken(20, 0, true));
      // remove all event listeners from chicken class so we don't get duplicates
      $('.chicken').unbind();
      //add a new chicken to html
      $('.animalPen').append(`
        <div class="chicken" value="${game.animals.length - 1}">
        <p>chicken</p>
        <span id="${game.animals.length - 1}"></span>
        <label for="meter">Egg</label>
        <meter value="" min="0" max="9"></meter>
        <label for="meter">Death</label>
        <meter value="" min="0" max="20"></meter>
        </div>`);
        // make the new chicken clickable
        $('.chicken').bind('click', frontEnd);
      //
      $(`#${game.selectedAnimal}`).nextAll().eq(1).attr(`value`, 0);
      }
    }

  }
  // chickens
  class Chicken extends Animal {
    // crhungere a chicken that is an Animal
    constructor(hunger, counter, alive) {
      super(hunger, counter, alive);
      // this.deathClock = game.chickenClock();
    }

  }





  //front end
  var game = new Game(new Chicken(20, 10, true));
  game.chickenClock();

  function frontEnd() {
    // remove all selected class
    $('.chicken').removeClass('selected');
    // add a class to show which chicken is selected
    $(this).addClass('selected');
    // set which animal is the selected animal
    game.selectedAnimal = $(this).attr('value');
    // is the selected chicken still alive
    console.log(`chicken ${game.selectedAnimal}`);
    if (game.animals[game.selectedAnimal].alive === true) {
      // feed the selected chicken -- even though this statement is false it is still letting our UI feed the chicken
      $('#feed').off().click(function () {
        if (game.animals[game.selectedAnimal].alive) {
          game.animals[game.selectedAnimal].feedAnimal();
        } else {
          console.log(`chicken ${game.selectedAnimal} is dead and no longer requires sustenance`);
        }
      });
      // console.log(`I fed ${game.selectedAnimal}`);
      $('#sell').off().click(function () {
        if (game.animals[game.selectedAnimal].alive) {
          game.animals[game.selectedAnimal].sellAnimal();
          $('.selected').addClass('hidden');
          $('.chicken').removeClass('selected');
        } else {
          console.log(`chicken ${game.selectedAnimal} is dead. No one wants to buy your disgusting dead chicken.`);
        }
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




  // chickenClock() {
    //   const doomsdayClock = setInterval(chickenTimer, 1000);
    //   function chickenTimer() {
      //     if (game.animals[0].hunger > 0 && (game.animals[0].alive)) {
        //       game.animals[0].hunger -= 1;
        //       console.log(`Chicken Clock ${game.animals[0].hunger}.`);
        //       $('#0').text(game.animals[0].hunger);
        //     } else {
          //       clearInterval(doomsdayClock)
          //       game.animals[0].alive = false;
          //       console.log(`Your chicken is dead.`);
          //     }
          //   }
          // }

          //   chickenClock() {
            //     console.log(`in chicken clock`);
            //     const doomsdayClock = setInterval(chickenTimer, 1000);
            //     function chickenTimer() {
              //       if (this.hunger > 0 && (this.alive)) {
                //         this.hunger -= 1;
                //         console.log(`Chicken Clock ${this.hunger}.`);
                //         $('#0').text(this.hunger);
                //       } else {
                  //         clearInterval(doomsdayClock)
                  //         game.animals[0].alive = false;
                  //         console.log(`Your chicken is dead.`);
                  //       }
                  //     }
                  //   }
                  // }
