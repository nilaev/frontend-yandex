let index = 0;
const count = 8;

function dislike() {
  const animation = 'bad-badge';
  document.getElementById('pig-' + index).style.display = 'none';
  document.getElementById(animation).style.display = 'block';

  swipe(animation);
}

function star() {
  const animation = 'good-badge';
  document.getElementById('pig-' + index).style.display = 'none';
  document.getElementById(animation).style.display = 'block';

  swipe(animation);
}

function like() {
  const animation = 'hot-badge';
  document.getElementById('pig-' + index).style.display = 'none';
  document.getElementById(animation).style.display = 'block';

  swipe(animation);
}

function swipe(animation) {
  setTimeout(() => {
    document.getElementById('pig-' +
      (index + 1) % count).style.display = 'block';
    index = (index + 1) % count;

    document.getElementById(animation).style.display = 'none';
  }, 500);

}

document.getElementById('pig-0').style.display = 'block';
