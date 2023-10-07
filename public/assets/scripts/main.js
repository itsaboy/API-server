const main = document.getElementById("main");
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login");

let logs = [];

let user = "";
let pass = "";

const loginAttempt = async (user, pass) => {
  const req = `https://www.api-of-all-trades.net/logs?user=${user}&pass=${pass}`;
  const res = await fetch(req);
  const data = await res.json();
  logs = [];
  logs.push(...data);
  if (data === "Unauthorized") {
    return;
  } else {
    main.querySelectorAll("*").forEach((n) => n.remove());
    main.innerHTML = `
    <div class="log-container bg-gradient-to-b from-slate-950 to-slate-900">

    </div>
    `;
    const logContainer = main.querySelector(".log-container");

    for (let i = 0; i < logs.length; i++) {
      logContainer.innerHTML += `
      <div id="card${i}" class="card text-yellow-400 border-b border-yellow-400">
        <h5 class="card-title">${logs[i].time}</h5>
        <p class="card-text">Country: ${logs[i].country}</p>
        <p class="card-text">State: ${logs[i].state}</p>
        <p class="card-text">City: ${logs[i].city}</p>
      </div>
      `;
    }
  }
};

loginBtn.addEventListener("click", () => {
  user = username.value;
  pass = password.value;
  loginAttempt(user, pass);
});
