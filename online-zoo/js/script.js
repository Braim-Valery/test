/* /// Modal 

const modalTrigger = document.querySelector('.testimonials__desc-button'),
coverElem = document.getElementById('cover'),
formElem = document.getElementById('modal'),
sendButton = document.getElementById('send'),
nameField = document.getElementById('name'),
emailField = document.getElementById('email'),
textField = document.getElementById('input-review');

const validate = () => {
if (
     nameField.validity.valid &&
     emailField.validity.valid &&
     textField.validity.valid
) {
     sendButton.classList.remove('invalid');
} else {
     sendButton.classList.add('invalid');
}
} 


modalTrigger.addEventListener ('click', () => {
  document.body.classList.add('notScrollable');
  coverElem.classList.remove('hidden');
  formElem.classList.remove('hidden');
});

coverElem.addEventListener('click', () => {
     document.body.classList.remove('notScrollable');
     coverElem.classList.add('hidden');
     formElem.classList.add('hidden');
}); 

sendButton.addEventListener('click', () => {
     if (sendButton.classList.contains('invalid')) return;
     document.body.classList.remove('notScrollable');
     coverElem.classList.add('hidden');
     formElem.classList.add('hidden');
});

nameField.addEventListener('input', () => {
     validate();
});

emailField.addEventListener('input', () => {
     validate();
});

textField.addEventListener('input', () => {
     validate();
});  */


/// Map

const geographyAnimalMarkers = document.querySelectorAll('.zoogeography__map-icon')
const animalCard = document.getElementById('anim-card')

let animals;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    animals = JSON.parse(this.responseText);
    ChangeCard('eagle');
  }
};
xhttp.open("GET", "http://127.0.0.1:5500/js/animals.json", true);
xhttp.send();


function ChangeCard(a){
  const animal = animals[a];
  const image = animal.image;
  const name = animal.name;
  const descr = animal.description;
  const imageNode = animalCard.querySelector('.zoogeography__images');
  const nameNode = animalCard.querySelector('.zoogeography__subtitle-h3');
  const descrNode = animalCard.querySelector('.zoogeography__text');
  imageNode.src = `assets/images/${image}`;
  imageNode.alt = `${name}`;
  nameNode.innerText = name;
  descrNode.innerText = descr;
}

geographyAnimalMarkers.forEach(animal => {
  animal.addEventListener('click', () => {
    geographyAnimalMarkers.forEach(a => a.classList.remove('active'));
    animal.classList.add('active');
    animalCard.classList.remove('active');
    animalCard.dataset.animal = animal.dataset.animal;
  });
})
animalCard.addEventListener('transitionend', (e) => {
  if(e.propertyName !== 'transform' || e.target.id !== 'anim-card') return
  if(!animalCard.classList.contains('active')){
    ChangeCard(animalCard.dataset.animal)
    animalCard.classList.add('active')
  }
})
