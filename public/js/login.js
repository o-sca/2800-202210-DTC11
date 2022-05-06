function attemptLogin() {
  let username = $("#username").val();
  let password = $("#password").val();
  $.ajax({
    url: "/loginAttempt",
    type: "POST",
    data: {
      username: username,
      password: password,
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
