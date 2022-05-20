function setup() {
  $("#newAccountForm").submit(function (element) {
    element.preventDefault();
    // let formData = JSON.stringify($(this).serializeArray());
    $.ajax({
      url: "/register",
      type: "POST",
      data: {
        username: $("#username").val(),
        email: $("#email").val(),
        password: $("#password").val(),
      },
      success: (success) => {
        console.log(success);
        if (!success) $("#errorMessage").text("Username is already taken.");
      },
    });
  });
}




$(document).ready(setup);
