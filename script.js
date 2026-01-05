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
  const qrBox = document.getElementById("qrBox");

  // 1️⃣ لو Canvas
  const canvas = qrBox.querySelector("canvas");
  if (canvas) {
    canvas.toBlob(blob => saveBlob(blob));
    return;
  }

  // 2️⃣ لو IMG
  const img = qrBox.querySelector("img");
  if (img) {
    fetch(img.src)
      .then(res => res.blob())
      .then(blob => saveBlob(blob));
    return;
  }

  // 3️⃣ لو SVG (دي مشكلة الموبايل الحقيقية)
  const svg = qrBox.querySelector("svg");
  if (svg) {
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");
    const img = new Image();

    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    img.onload = function () {
      ctx.drawImage(img, 0, 0, 300, 300);
      URL.revokeObjectURL(url);
      canvas.toBlob(blob => saveBlob(blob));
    };

    img.src = url;
    return;
  }

  alert("لم يتم العثور على QR");
}

function saveBlob(blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "qr-code.png";
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}




