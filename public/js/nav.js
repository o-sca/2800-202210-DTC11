function openHamburgerMenu() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  // Search modal Functionality
  var modal = document.getElementById("modal-search");
  var btn = document.getElementById("openSearchModal");
  var span = document.getElementsByClassName("searchClose")[0];
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
  var modal2 = document.getElementById("filterModal");
  var btn2 = document.getElementById("openfilterModal");
  var span2 = document.getElementsByClassName("closefilterModal")[0];
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