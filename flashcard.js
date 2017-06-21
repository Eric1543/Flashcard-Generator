// Import fs, inquirer and 2 class constructors
var fs = require('fs');
var inquirer = require('inquirer');
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');

// Nesting - How many cards would you like to create
//     Inquirer changes global variable
// 
// Prompt for type of card to create
var cardsToMake = 1;

inquirer.prompt([
{
  name: 'numCards',
  message: 'How many study cards would you like to make?'
}
  ]).then(function(response){
    cardsToMake = response.numCards;
    console.log(cardsToMake);
    createCards();
  });

function createCards(){
  if(cardsToMake != 0){
    inquirer.prompt([
    {
      type: 'list',
      choices: ['Basic Card', 'Cloze Card'],
      name: 'cardType',
      message: 'What type of card would you like to create?'
    }
    ]).then(function(answers){
        // Basic card creation of question and answer
        if(answers.cardType=='Basic Card'){
          console.log('You chose basic card.');
          inquirer.prompt([
          {
              name: 'front',
              message: 'Enter a study question please.'
          },
          {
              name: 'back',
              message: 'Now enter the answer.'
          }
            ]).then(function(nextAnswers){
              var card = new BasicCard(nextAnswers.front, nextAnswers.back);
              console.log(card);
              var cardJ = JSON.stringify(card);
              fs.appendFile('cards.txt', '\r\n' + cardJ, function(err){
                if(err){
                  console.log(err);
                }
              });
              cardsToMake--;
              createCards();
              // if(cardsToMake==0){
              //   playCards();
              // }
          });

        }
        else if(answers.cardType=='Cloze Card'){
          // Cloze card creation of sentence and part to remove
          console.log('You chose cloze card.');
          inquirer.prompt([
          {
            name: 'full',
            message: 'Enter a full study sentence please.'
          },
          {
            name: 'cloze',
            message: 'Now enter the cloze study portion.'
          }
            ]).then(function(clozeAnswers){
                var card = new ClozeCard(clozeAnswers.full, clozeAnswers.cloze);
                console.log(card);
                var cardJ = JSON.stringify(card);
                fs.appendFile('cards.txt', '\r\n' + cardJ, function(err){
                  if(err){
                  console.log(err);
                  }
                });
                cardsToMake--;
                createCards();
                // if(cardsToMake==0){
                //   playCards();
                // }
            });
        }
    });
  }
} // End of createCards Function

// Console.log data from cards created
// function playCards(){
//   fs.readFile('cards.json', 'utf-8', function(err, data){
//     if(err){
//       console.log(err);
//     }
//     else{
//       // for(var i in data){
//         console.log(data);
//       // }
//     }
//   })

// }
