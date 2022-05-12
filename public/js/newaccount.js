function createNewAccount() {
  $.ajax({
    url: "/register",
    type: "POST",
    data: {
      username: $("#username").val(),
      email: $("#email").val(),
      password: $("#password").val(),
    },
    success: (createNewAccountResult) => {
      // if (createNewAccountResult) {
      //   alert("Username or password incorrect.");
      // }
      console.log(createNewAccountResult)
    },
  });
}

function setup() {
  $("input[type=submit]").click(createNewAccount);
}

$(document).ready(setup);