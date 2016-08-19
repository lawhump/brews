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


function indexOfNode(node) {
  var children = node.parentNode.childNodes;
  var num = 0;
  for (var i=0; i<children.length; i++) {
     if (children[i]==node) return num;
     if (children[i].nodeType==1) num++;
  }
  return -1;
}

function getBrews(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      callback(xmlHttp.responseText);
    }
  }
  xmlHttp.open('GET', url, true);
  xmlHttp.send(null);
}

function toggleActive(forward) {
  var curr = document.querySelector('.navigation .active');

  if (forward) {
    curr.classList.remove('active');
    var next = curr.parentNode.parentNode.nextSibling.nextSibling; // ????
    if (next === null) {
      next = document.querySelector('.navigation').firstChild.nextSibling;
      console.log(next);
    }
    next.querySelector('span').classList.add('active');
  }

  else {
    curr.classList.remove('active');
    var prev = curr.parentNode.parentNode.previousSibling.previousSibling; // ????
    if (prev === null) {
      prev = document.querySelector('.navigation').lastChild.previousSibling;
    }
    prev.querySelector('span').classList.add('active');
  }
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
  toggleActive(true);
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
  toggleActive(false);
}

function showInfo() {
  function changeBackground() {
    document.querySelector('body').style.backgroundColor = brews[counter].bgColor;
  }

  function changeText() {
    taste.classList.add('fadeOut');
    complements.classList.add('fadeOut');
    description.classList.add('fadeOut');


    window.setTimeout(function() {
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

document.querySelector('.navigation').addEventListener('click', function(e) {
  function backwardBy(iters) {
    for (var i=0; i<iters; i++) {
      showPrevBrew();
    }
  }

  function forwardBy(iters) {
    for (var i=0; i<iters; i++) {
      showNextBrew();
    }
  }

  function goToBrew() {
    var target = indexOfNode(e.target.parentNode);

    if (target >= counter) {
      var iterations = target - counter;
      forwardBy(iterations);
    }

    else {
      var iterations = counter - target;
      backwardBy(iterations);
    }
  }


  if(e.target && e.target.nodeName == 'A') {
    goToBrew();
  }
});
