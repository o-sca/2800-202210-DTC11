function setup() {
  $(".container").hide();
  $.ajax({
    url: "/getUsers",
    type: "GET",
    success: (users) => {
      console.log(users);
      users.forEach((user) => {
        let userRow = `
        <tr>
          <td class="user-id">${user.id}</td>
          <td class="user-username">${user.username}</td>
          <td class="user-email">${user.email}</td>
          <td class="user-added">${user.added}</td>
          <td class="user-manage">
            <button type="button">?</button>
          </td>
        </tr>
        `;
        console.log(userRow);
        $("#users-table-body").append(userRow);
      });
    },
  });
}

$(document).ready(setup);
