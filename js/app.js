/*
 * Create a list that holds all of your cards
 */
 const box = document.querySelector('.deck');
 var cards = document.querySelectorAll(".card");
 var openCards = [];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function start(){
	//Remove todos as cartas da tela
	for (var i=0; i<cards.length; i++){
		cards[i].remove();
	}
	//Embaralha as carts no array
	cards=shuffle(Array.from(cards));
	//Percorre o array
	for (i=0; i<cards.length; i++){
		//Cria o elemento da carta
		var newCard = document.createElement('li');
		//Indica que todas as cartas devem aparecer escondidas
		cards[i].className="card";
		//Passa todos atributos para o elemento carta criado
		newCard=cards[i];
		//Adiciona o elemento carta ao quadro do jogo
		box.appendChild(newCard);
	}
}


// Shuffle function from http://stackoverflow.com/a/2450976x
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    console.log(array);
    return array;
}

//Apresenta a carta desvirada
function showSymbol(card){
	card.className+=" open show";
}

//Cria lista de cartas abertas
function cardOpen(card){
	//Verifica se já existe uma carta aberta
	if (openCards[0]===undefined){
		//Se não, salva a primeira carta aberta
		openCards[0]=card;
	} else {
		//Se sim, salva a segunda carta
		openCards[1]=card;
		//Indica que deve verificar se as cartas abertas são iguais
		return 1;
	}
}

//Adiciona eventos de cliques as cartas do jogo
function click(){
	//Percorre todas as cartas
	for (var i=0; i<cards.length; i++){
		//Adiciona evento de click a todas as cartas
		cards[i].addEventListener('click', function (event){
			// Indica se deve ou não verificar as cartas abertas
			var check=0;
			//Chama função para exibir a carta clicada
			showSymbol(event.target);
			//Cria lista de cartas abertas
			check = cardOpen(event.target);
			//Se deve verificar as cartas abertas
			if(check==1){

			}
		});
	}
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Inicializa o jogo embaralho e virando todas as cartas
 start();
 //Adiciona eventos de clique as cartas
 click();
