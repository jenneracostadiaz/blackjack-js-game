/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamends (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
  puntosComputadora = 0;

//Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const divCartasJugador = document.querySelector('#jugardor-cartas');
const puntosHTML = document.querySelectorAll('small');

//Esta Funcion crear una nueva baraja
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  //   console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

crearDeck();

//Esta función permite tomar una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw 'No hay cartas en el deck';
  }

  const carta = deck.pop();
  return carta;
};

//Valor de la Carta
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
};

//Eventos
btnPedir.addEventListener('click', () => {
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;
  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add('carta');
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn('SLo siento mucho, perdite');
    btnPedir.disabled = true;
  } else if (puntosJugador === 21) {
    console.warn('21, genial!');
  }
});
