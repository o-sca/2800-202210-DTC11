function openHamburgerMenu() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  // Search modal Functionality
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("openModal");
  var span = document.getElementsByClassName("close")[0];
  btn.onclick = function () {
    modal.style.display = "block";
  }
  span.onclick = function () {
    modal.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  //Filter modal Functionality
  var modal2 = document.getElementById("myModal2");
  var btn2 = document.getElementById("openModal2");
  var span2 = document.getElementsByClassName("close2")[0];
  btn2.onclick = function () {
    modal2.style.display = "block";
  }
  span2.onclick = function () {
    modal2.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target == modal2) {
      modal2.style.display = "none";
    }
  }