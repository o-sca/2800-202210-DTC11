function loadCommonElements() {
  $("#navbarPlaceholder").load("../common/nav.html");
  $("#footerPlaceholder").load("../common/footer.html");
}

function setup() {
  loadCommonElements();
  $.ajax({
    url: "/userStatus",
    type: "GET",
    success: (res) => {
      const { isLoggedIn, isAdmin } = res;
      $("#log").text(isLoggedIn ? "Logout" : "Login / Sign-up");
      $("#log").attr("href", isLoggedIn ? "/logout" : "/");
      $("#admin").css("display", isAdmin ? "block" : "none");
    },
  });
}

$(document).ready(setup);
