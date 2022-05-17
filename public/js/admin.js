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
        <div class="user-row ${parity}-row">
          <div class="user-id-cell">
            <span class="user-id">${user.id}</span>
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
            <button type="button">❌</button>
          </div>
        </div>
        `;

        // let userRow = `
        // <tr>
        //   <td class="user-id">${user.id}</td>
        //   <td class="user-username">${user.username}</td>
        //   <td class="user-email">${user.email}</td>
        //   <td class="user-added">${user.added}</td>
        //   <td class="user-manage">
        //     <button type="button">?</button>
        //   </td>
        // </tr>
        // `;

        // console.log(userRow);
        $("#users-container").append(userRow);
        parity = parity == "even" ? "odd" : "even";
      });
    },
  });
}

$(document).ready(setup);
