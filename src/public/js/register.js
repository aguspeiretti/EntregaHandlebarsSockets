const form = document.getElementById("registerForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  const response = await fetch("/api/sessions/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "content-type": "application/json",
    },
  });
  const resposeData = await response.json();
  if (resposeData.status === "succes") {
    window.location.replace("/login");
  }
});
