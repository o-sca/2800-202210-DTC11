function setup() {
  $("#loginForm").submit(function (element) {
    element.preventDefault();
    $.ajax({
      url: "/auth",
      type: "POST",
      data: {
        username: $("#username").val(),
        password: $("#password").val(),
      },
      success: (createNewAccountResult) => {
        if (createNewAccountResult) {
          $("#errorMessage").text("Username or password is incorrect.");
        }
      },
    });
  });
}
$(document).ready(setup);
