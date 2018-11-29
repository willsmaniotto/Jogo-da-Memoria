/*
 * Create a list that holds all of your cards
 */
 const box = document.querySelector('.deck');
 var cards = document.querySelectorAll(".card");
 console.log(cards);
 var openCards = [];
 var countCards = 0;


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


// Shuffle function from http://stackoverflow.com/a/2450976
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

//Bloqueia o par aberto corretamente
function block(card1, card2){
	//Atualiza a classe das duas cartas
	card1.className="card match";
	card2.className="card match";
	//Remove os eventos de navegador do par de cartas
	card1.removeEventListener('click', clickDetected);
	card2.removeEventListener('click', clickDetected);
}

//Esconde o par aberto incorretamente


//Cria lista de cartas abertas
function cardOpen(card){
	//Verifica se já existe uma carta aberta
	if (openCards[countCards]===undefined){
		//Se não, salva a primeira carta aberta
		openCards[countCards]=card;
	} else {
		//Incrementa quantidade de cartas abertas
		countCards++;
		//Se sim, salva a segunda carta
		openCards[countCards]=card;
		//Se as imagens das duas cartas forem iguais
		if (openCards[countCards-1].firstElementChild.className === openCards[countCards].firstElementChild.className){
			//Bloqueia o par aberto corretamente
			block(openCards[countCards-1], openCards[countCards]);
			//Incrementa o índice da lista de cartas
			countCards++;
		} else {
			//Se não forem, esconde novamente as cartas após 1s
			setTimeout(function hide(){
				//Atualiza a classe das duas cartas
				openCards[countCards-1].className="card";
				openCards[countCards].className="card";
				//Remove o par aberto da lista de cartas abertas
				openCards[countCards-1]=undefined;
				openCards[countCards]=undefined;
				//Decrementa o índice da lista de cartas
				countCards--;
			}, 1000);			
		}
	}
}

function clickDetected(event){
	// Indica se deve ou não verificar as cartas abertas
	var check=0;
	//Chama função para exibir a carta clicada
	showSymbol(event.target);
	//Cria lista de cartas abertas
	cardOpen(event.target);
}

//Adiciona eventos de cliques as cartas do jogo
function click(){
	//Percorre todas as cartas
	for (var i=0; i<cards.length; i++){
		//Adiciona evento de click a todas as cartas
		cards[i].addEventListener('click', clickDetected);
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
