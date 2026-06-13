document.addEventListener("DOMContentLoaded", () => {
  const paleuro = JSON.parse(localStorage.getItem("paleuro")) || {};
  const numsal = document.getElementById("numsal");
  if (paleuro?.numsal !== "") {
    numsal.value = paleuro.numsal;
  }
});

document.querySelector("#paleuro").addEventListener("submit", (e) => {
  e.preventDefault();

  // submit
  

  // store numsal
  const numsal = document.getElementById("numsal")?.value;
  if (numsal)
    localStorage.setItem("paleuro", JSON.stringify({ numsal }));
});