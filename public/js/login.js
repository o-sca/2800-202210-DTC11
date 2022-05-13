function setup() {
  $("#loginForm").submit(function (element) {
    // element.preventDefault();
    $.ajax({
      url: "/auth",
      type: "POST",
      data: {
        username: $("#username").val(),
        password: $("#password").val(),
      },
      success: (success) => {
        if (success) {
          //direct
        } else {
          $("#errorMessage").text("Username or password is incorrect.");
        }
      },
    });
  });
}
$(document).ready(setup);
