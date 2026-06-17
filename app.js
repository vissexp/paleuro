const APPKEY = "vissexp-paleuro";
const JASON2 = "https://www.vis-express.com/jason2.php";
const FIELDS = [
  "date",
  "tpsid",
  "palettes",
  "comment",
  "secret"
];
const REQ_TIMEOUT = 10 * 1000;

document.addEventListener("DOMContentLoaded", () => {
  const paleuro = JSON.parse(localStorage.getItem(APPKEY)) || {};
  if (paleuro?.numsal !== "") {
    document.getElementById("numsal").value = paleuro.numsal;
  }
  
  const url = new URLSearchParams(window.location.search);
  const urlSecret = url.get("s");
  if (urlSecret)
    document.getElementById("secret").value = urlSecret;

  const result = document.getElementById("result");
  result.style.textAlign = "center";
  
});

document.querySelector("#paleuro").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // submit
  let postData = [ ...FIELDS, "numsal" ].reduce((all, field) => {
    const value = e.target.querySelector("#" + field).value;
    all[field] = value;
    return all;
  }, {});
  postData = new URLSearchParams({ prg: "paleuro", ...postData }).toString();
  
  e.target.querySelector("#submitBtn").disabled = true;
  
  const response = await fetch(JASON2, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    signal: AbortSignal.timeout(REQ_TIMEOUT),
    body: postData,
  });
  
  // result
  const respData = await response.json();
  const result = document.getElementById("result");
  if (respData.result === "OK") {
    result.style.color = "green";
    result.style.backgroundColor = "#051b11";
    result.style.border = "1px solid #051b11";
  } else {
    result.style.color = "red";
    result.style.backgroundColor = "#2c0b0e";
    result.style.border = "1px solid #2c0b0e";
  }
  result.innerHTML = respData.message;
  
  setTimeout(() => {
    result.style.color = "";
    result.style.backgroundColor = "";
    result.style.border = "";
    result.innerHTML = "";
    e.target.querySelector("#submitBtn").disabled = false;
    FIELDS.forEach(field => e.target.querySelector("#" + field).value = "");
  }, 5000);

  // store numsal
  const numsal = document.getElementById("numsal")?.value;
  if (numsal)
    localStorage.setItem(APPKEY, JSON.stringify({ numsal }));
});