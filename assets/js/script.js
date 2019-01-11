const array = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis blandit enim, id bibendum arcu. Maecenas molestie cursus nibh, non interdum velit venenatis quis. Suspendisse sit amet euismod ante, in rhoncus mauris. Sed at dolor ante.',
  'Aliquam pellentesque, justo eu lacinia auctor, tortor neque egestas nibh, sit amet tristique risus erat eget nibh. Sed ac libero tempor, porttitor libero posuere, vestibulum quam. Maecenas nec aliquam felis, vitae consequat lacus. Pellentesque porttitor vitae nisi vel tincidunt. Cras laoreet iaculis odio quis porttitor.',
  'Fusce ac ante vitae tortor finibus rutrum vitae ac massa. Suspendisse non lobortis libero, eu porta nulla. Aenean ullamcorper metus sed nulla tincidunt euismod. In et euismod neque. Nam semper ante eget augue dictum viverra. Sed eu accumsan nisl. Pellentesque viverra, nunc vel tincidunt facilisis, lectus enim pulvinar felis, sit amet tincidunt libero eros nec justo.',
  'Mauris vitae odio id nunc interdum mollis viverra vel nibh. Praesent ac diam egestas, tristique lorem nec, consequat elit. Sed ut congue ligula. Nam pretium urna vel libero placerat dignissim. Morbi sapien lorem, fermentum non justo eget, ultrices dictum nulla. Pellentesque ut nisi sit amet enim ullamcorper malesuada.',
  'Etiam tincidunt a metus ut ultrices. Nunc nisi neque, viverra ut convallis in, malesuada fermentum massa. Quisque porttitor libero sed nisl gravida, sed hendrerit massa tristique. Maecenas feugiat est quis enim hendrerit dictum. Proin eu lacus sit amet felis scelerisque commodo quis sit amet tellus.',
];

const text = document.querySelector('.text');

window.onload = () => {
  if (!localStorage.getItem('disabled')) {
    let radioItem;
    setTimeout(() => {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < array.length; i += 1) {
        radioItem = document.createElement('i');
        radioItem.classList.add('fas', 'fa-circle');
        radioItem.setAttribute('id', i + 1);
        fragment.appendChild(radioItem);
      }
      document.querySelector('.radio-wrapper').appendChild(fragment);
      document.querySelector('.fa-circle:first-child').classList.add('current');
      [text.innerHTML] = array;
      document.querySelector('.notification').classList.remove('close');
    }, 5000);
  }
};

const closer = document.querySelector('.fa-times');
function close() {
  document.querySelector('.notification').classList.add('close');
}
closer.addEventListener('click', close);

const checkbox = document.querySelector('input[type=checkbox]');
function toStorage() {
  if (checkbox.checked) {
    localStorage.setItem('disabled', true);
  } else {
    localStorage.removeItem('disabled', true);
  }
}
checkbox.addEventListener('click', toStorage);

const radioWrapper = document.querySelector('.radio-wrapper');
function navigate() {
  const { target } = event.target; 
  if (target.tagName !== 'i') return;
  const current = document.querySelector('.current');
  current.classList.remove('current');
  target.classList.add('current');
  const targetIndex = target.getAttribute('id');
  text.innerHTML = array[targetIndex - 1];
}
radioWrapper.addEventListener('click', navigate);

function move(...args) {
  const current = document.querySelector('.current');
  let currentIndex = current.getAttribute('id');
  current.classList.remove('current');
  if (args[0] === 'toRight') {
    if (+currentIndex === array.length) {
      currentIndex = 0;
    }
    document.querySelector(`.fa-circle:nth-child(${++currentIndex})`).classList.add('current');
  }
  if (args[0] === 'toLeft') {
    if (+currentIndex === 1) {
      currentIndex = array.length + 1;
    }
    document.querySelector(`.fa-circle:nth-child(${currentIndex -= 1})`).classList.add('current');
  }
  text.innerHTML = array[currentIndex - 1];
}

const leftArrow = document.querySelector('.fa-caret-left');
leftArrow.addEventListener('click', () => { move('toLeft'); });

const rightArrow = document.querySelector('.fa-caret-right');
rightArrow.addEventListener('click', () => { move('toRight'); });

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) close();
  if (e.keyCode === 39) move('toRight');
  if (e.keyCode === 37) move('toLeft');
});
