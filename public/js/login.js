function attemptLogin() {
  $.ajax({
    url: "/loginAttempt",
    type: "POST",
    data: {
      username: $("#username").val(),
      password: $("#password").val(),
    },
    success: (loginAttemptResult) => {
      if (loginAttemptResult) {
        alert("Username or password incorrect.");
      }
    },
  });
}

function setup() {
  $("input[type=submit]").click(attemptLogin);
}

$(document).ready(setup);
