let qr;

function generateQR() {
  const text = document.getElementById("qrText").value.trim();
  const qrBox = document.getElementById("qrBox");
  const downloadBtn = document.getElementById("downloadBtn");

  if (!text) {
    alert("اكتب نص أو لينك");
    return;
  }

  qrBox.innerHTML = "";
  qrBox.classList.remove("show");

  qr = new QRCode(qrBox, {
    text: text,
    width: 200,
    height: 200,
    colorDark: "#000",
    colorLight: "#fff"
  });

  void qrBox.offsetWidth;
  qrBox.classList.add("show");

  downloadBtn.style.display = "block";
}

function downloadQR() {
  const canvas = document.querySelector("#qrBox canvas");
  if (!canvas) return;

  canvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}


