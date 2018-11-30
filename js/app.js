/*
 * Create a list that holds all of your cards
 */
 const box = document.querySelector('.deck');
 var cards = document.querySelectorAll(".card");
 var stars = document.querySelectorAll('.fa-star');
 var moves = document.querySelector('.moves');
 var timer = document.querySelector('.timer');
 var restart = document.querySelector('.restart');
 console.log(cards);
 var openCards = [];
 var countCards = 0;
 var countStars = 3;
 var mov = 0;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 //Remove todas as cartas do quadro
function remove(){
	//Remove todos as cartas da tela
	for (var i=0; i<cards.length; i++){
		cards[i].remove();
	}	
}

//Inicializa o jogo
function start(){
	//Se o jogador havia vencido
	if(countCards===16){
		//Remove texto da vitória
		box.removeChild(box.firstElementChild);
	} else {
		//Remove todas as cartas
		remove();
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
	//Inicializa o contador de moviemtos
	mov=0;
	moves.textContent="0";
	//inicializa estrelinhas
	countStars=3;
	for(var i=0; i<stars.length; i++){
		stars[i].className="fa fa-star";
	}
	//Inicializa contador de cartas
	countCards = 0;
	//Inicializa lista de cartas abertas
	openCards = {undefined};
	//Adiciona eventos de clique as cartas
 	click();
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

//Esconde o par de cartas viradas incorretamente
function hide(){
	//Atualiza a classe das duas cartas
	openCards[countCards-1].className="card";
	openCards[countCards].className="card";
	//Remove o par aberto da lista de cartas abertas
	openCards[countCards-1]=undefined;
	openCards[countCards]=undefined;
	//Decrementa o índice da lista de cartas
	countCards--;
}

//Atualiza placar
function boardUp(){
	//Atualiza número de movimentos	
	moves.textContent=mov;
	//Se tiver feito 17 movimentos
	if (mov===17){
		//Deixa apenas duas estrelas
		stars[2].className="fa ";
		countStars--;
	}
	//Se tiver feito 33 movimentos
	if (mov===33){
		//Deixa apenas uma estrela
		stars[1].className="fa ";
		countStars--;
	}
}


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
			//Se não forem, esconde novamente as cartas após 500ms
			setTimeout('hide()', 500);			
		}
	}
	//Atualiza placar
	boardUp();
	//Se tiver encontrado todos os pares
	if(countCards===16){
		//Remove todas as cartas
		remove();
		//Cria mensagem da vitória
		const winMessage = document.createElement('h1');
		//Centraliza texto
		winMessage.style.textAlign = "center";
		//Indica que aceita nova linha
		winMessage.style.whiteSpace = "pre";
		//Edita corpo da mensagem
		winMessage.textContent = ("Parabéns! Você Venceu!\r\nCom "+mov+" movimentos e "+countStars+" estrelas!");
		//Adiciona a mensagens ao quadro
		box.appendChild(winMessage);
	}
}

function clickDetected(event){
	// Indica se deve ou não verificar as cartas abertas
	var check=0;
	//Incrementa número de movimentos
	mov++;
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
	//Adiciona evento de clique ao botão de restart
	restart.addEventListener('click', start);
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
