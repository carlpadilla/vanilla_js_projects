const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

//save movie index
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // array of selected seats
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatCount = selectedSeats.length;

  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;
}

// movie select event listener
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event listener
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});
