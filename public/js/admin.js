function setup() {
  $.ajax({
    url: "/userUsers",
    type: "GET",
    success: (res) => {
      console.log(res);
    },
  });
}

$(document).ready(setup);
