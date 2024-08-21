document.getElementById("resizeBtn").addEventListener("click", resizeImage);

function resizeImage() {
  const fileInput = document.getElementById("uploadImage").files[0];
  const widthInput = document.getElementById("width").value;
  const heightInput = document.getElementById("height").value;
  const textInput = document.getElementById("textInput").value;
  const canvas = document.getElementById("canvas");
  const downloadLink = document.getElementById("downloadLink");

  // Check if image and dimensions are provided
  if (!fileInput || !widthInput || !heightInput) {
    alert("Please select an image, enter dimensions, and optional text.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = function () {
      // Set canvas width and height to match input values
      canvas.width = widthInput;
      canvas.height = heightInput;

      const ctx = canvas.getContext("2d");

      // Draw resized image on canvas
      ctx.drawImage(img, 0, 0, widthInput, heightInput);

      // Add text to the image (if provided)
      if (textInput) {
        ctx.font = "bold 50px Arial";
        ctx.fillStyle = "teal"; // Set text color to white
        ctx.textAlign = "center";

        ctx.fillText(textInput, canvas.width / 2, canvas.height - 30); // Text position 30px from the bottom
      }

      // Show the canvas (if hidden)
      canvas.style.display = "block";

      // Convert the canvas content to a downloadable image
      canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.style.display = "inline-block"; // Show the download link
      }, "image/png");
    };
  };
  reader.readAsDataURL(fileInput);
}
