const APPKEY = "vissexp-paleuro";
const JASON2 = "https://www.vis-express.com/jason2.php";
const FIELDS = [
  "date",
  "tpsid",
  "palettes",
  "comment",
  "secret",
  "numsal"
];

document.addEventListener("DOMContentLoaded", () => {
  const paleuro = JSON.parse(localStorage.getItem(APPKEY)) || {};
  const numsal = document.getElementById("numsal");
  if (paleuro?.numsal !== "") {
    numsal.value = paleuro.numsal;
  }
  const url = new URLSearchParams(document.URL);
  const urlSecret = url.get("s");
  if (urlSecret)
    document.getElementById("secret").value = urlSecret;
});

document.querySelector("#paleuro").addEventListener("submit", async (e) => {
  e.preventDefault();

  // submit
  let postData = FIELDS.reduce((all, field) => {
    const value = e.target.querySelector("#" + field).value;
    all[field] = value;
    return all;
  }, {});
  postData = new URLSearchParams({ prg: "paleuro", ...data }).toString();
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