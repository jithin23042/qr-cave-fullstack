async function generate() {
  const url = document.getElementById("url").value;

  const res = await fetch("/api/qr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  const data = await res.json();
  document.getElementById("result").innerHTML =
    `<img src="${data.qrImage}" />`;
}