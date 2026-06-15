const APPKEY = "vissexp-paleuro";
const JASON2 = "http://www.vis-express.com/jason2.php";

document.addEventListener("DOMContentLoaded", () => {
  const paleuro = JSON.parse(localStorage.getItem(APPKEY)) || {};
  const numsal = document.getElementById("numsal");
  if (paleuro?.numsal !== "") {
    numsal.value = paleuro.numsal;
  }
  const url = new URLSearchParams(document.URL);
  const urlSecret = url.get("s");
  if (urlSecret) {
    const secret = document.getElementById("secret");
    secret.value = urlSecret;
  }
});

document.querySelector("#paleuro").addEventListener("submit", async (e) => {
  e.preventDefault();

  // submit
  const data = [
    "date",
    "tpsid",
    "palettes",
    "comment",
    "secret",
    "numsal"
  ].reduce((all, field) => {
    const value = e.target.querySelector("#" + field).value;
    all[field] = value;
    return all;
  }, {});
  const postData = new URLSearchParams({ prg: "paleuro", ...data }).toString();
  const response = await fetch(JASON2, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: postData,
  });
  const respData = await response.json();
  console.log(respData)
  // store numsal
  const numsal = document.getElementById("numsal")?.value;
  if (numsal)
    localStorage.setItem(APPKEY, JSON.stringify({ numsal }));
});