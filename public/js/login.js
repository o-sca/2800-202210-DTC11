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

function guestLogin() {
  $.ajax({
    url: "/loginAttempt",
    type: "POST",
    data: {
      username: "guest",
      password: "123",
    },
    success: (loginAttemptResult) => {
      if (loginAttemptResult) {
        alert("login failed");
      }
    },
  });
}

function setup() {
  $("input[type=submit]").click(attemptLogin);
  $("guestbutton").click(guestLogin);
}

$(document).ready(setup);
