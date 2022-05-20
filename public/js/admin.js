function setup() {
  // $(".container").hide();
  $.ajax({
    url: "/getUsers",
    type: "GET",
    success: (users) => {
      console.log({ users });
      let parity = "even";
      users.forEach((user) => {
        let addDate = user.added.slice(0, 10);
        let addTime = user.added.slice(11, 19);
        let userRow = `
        <div id="userRow-${user.id}" class="user-row ${parity}-row">
          <div class="user-id-cell">
            <p class="user-id">${user.id}</p>
          </div>
          <div class="user-name-email">
            <p class="user-name">${user.username}</p>
            <p class="user-email">${user.email}</p>
          </div>
           <div class="user-added">
            <p class="user-added-date">${addDate}</p>
            <p class="user-added-time">${addTime}</p>
          </div>
           <div class="user-manage">
            <button class="delete-button" type="button" onclick=deleteUser(${user.id})>❌</button>
          </div>
        </div>
        `;
        $("#users-container").append(userRow);
        parity = parity == "even" ? "odd" : "even";
      });
    },
  });
}

async function deleteUser(id) {
  console.log(`Delete user ${id}`);
  await $.ajax({
    url: `/deleteUser/${id}`,
    type: "GET",
    success: (res) => {
      console.log({ res });
      $(`#userRow-${id}`).remove();
    },
  });
}

$(document).ready(setup);
