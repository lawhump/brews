var prev = document.querySelector('.controls .prev');
var next = document.querySelector('.controls .next');
var counter = 0;
var max     = 20;

var slider = document.querySelector('.images .brews');
var brews;

var descriptions = document.querySelector('.descriptions');
var brewNames    = descriptions.querySelector('.name');
var taste        = descriptions.querySelector('.taste');
var complements  = descriptions.querySelector('.complements');
var description  = descriptions.querySelector('.description');


function getBrews(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      callback(xmlHttp.responseText);
    }
  }
  xmlHttp.open('GET', url, true); // true for asynchronous
  xmlHttp.send(null);
}

function initBrews(json) {
  function initBrewNames() {
    for (var i=0; i<=max; i++) {
      brewNames.innerHTML += "<li><h1>" + brews[i].name + "</h1></li>";
    }
  }

  brews = JSON.parse(json);
  max = brews.length - 1;

  initBrewNames();
}

function showNextBrew() {
  function elemForwards() {
    function incrementCounter() {
      if (counter == max) {
        counter = 0;
      }
      else {
        counter++;
      }
    }

    slider.classList.remove('show-brew-' + counter);
    brewNames.classList.remove('show-brew-' + counter);
    incrementCounter();
    slider.classList.add('show-brew-' + counter);
    brewNames.classList.add('show-brew-' + counter);
  }

  elemForwards();
  showInfo();
}

function showPrevBrew() {
  function elemBackwards() {
    function decrementCounter() {
      if (counter == 0) {
        counter = max;
      }
      else {
        counter--;
      }
    }

    slider.classList.remove('show-brew-' + counter);
    brewNames.classList.remove('show-brew-' + counter);
    decrementCounter();
    slider.classList.add('show-brew-' + counter);
    brewNames.classList.add('show-brew-' + counter);
  }

  elemBackwards();
  showInfo();
}

function showInfo() {
  function changeBackground() {
    document.querySelector('body').style.backgroundColor = brews[counter].bgColor;
  }

  function changeText() {
    // brewName.classList.add('fadeOut');
    taste.classList.add('fadeOut');
    complements.classList.add('fadeOut');
    description.classList.add('fadeOut');


    window.setTimeout(function() {
      // brewName.innerText = brews[counter]["name"];
      taste.innerText = brews[counter].taste;
      complements.innerText = brews[counter].complements;
      description.innerText = brews[counter].description;

      taste.classList.remove('fadeOut');
      complements.classList.remove('fadeOut');
      description.classList.remove('fadeOut');
    }, 300);
  }

  changeBackground();
  changeText();
}

(function() {
  getBrews('brews.json', initBrews);
})();

prev.addEventListener('click', showPrevBrew);

next.addEventListener('click', showNextBrew);
