// footer and navbar
function loadCommonElements() {
  $("#navbarPlaceholder").load("../common/nav.html");
  $("#footerPlaceholder").load("../common/footer.html");
}
loadCommonElements();

function setup() {
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
