const miModulo = (() => {
  'use strict';
  let deck = [];
  const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K'];

  // let puntosJugador = 0,
  //   puntosComputadora = 0;
  let puntosJugadores = [];

  //Referencias HTML
  const btnPedir = document.querySelector('#btnPedir'),
    btnDetener = document.querySelector('#btnDetener'),
    btnNuevo = document.querySelector('#btnNuevo');

  const divCartasJugadores = document.querySelectorAll('.divCartas'),
    puntosHTML = document.querySelectorAll('small');

  //Esta función inicializa el jeugo
  const inicializarJuego = ( numJugadores = 2 ) => {
    deck = crearDeck();

    puntosJugadores = [];
    for(let i = 0; i< numJugadores; i++){
      puntosJugadores.push(0)
    }

    puntosHTML.forEach( elem => elem.innerText = 0 )
    divCartasJugadores.forEach( elem => elem.innerHTML = '' )
    
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  }

  //Esta Funcion crear una nueva baraja
  const crearDeck = () => {
    deck = [];
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
    
    return _.shuffle(deck);
  };

  //Esta función permite tomar una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw 'No hay cartas en el deck';
    }

    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
  };

  //Turno: 0 = primer jugador y el último es la computadora
  const acumularPuntos = ( carta, turno ) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno) =>{
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append(imgCarta);
  }

  const determinarGanador = () => {
    const  [puntosMinimos, puntosComputadora] = puntosJugadores;
    setTimeout(() => {
      if (puntosComputadora == puntosMinimos) {
        alert('Empate!');
      } else if (puntosMinimos > 21) {
        alert('Computadora Gana');
      } else if (puntosComputadora > 21) {
        alert('Jugador Gana');
      } else {
        alert('Computadora Gana');
      }
    }, 100);
  }

  //Turno de computador
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);
      
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
    
  };

  //Eventos
  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);
    
    if (puntosJugador > 21) {
      console.warn('Lo siento mucho, perdite');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      console.warn('21, genial!');
    }
  });

  btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevo.addEventListener('click', () => {
    
    inicializarJuego();
    
  });

  return {
    nuevoJuego: inicializarJuego
  }
})()

