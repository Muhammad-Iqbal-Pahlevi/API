// var question = document.getElementById("question");
// var answer = document.getElementById("answer");

// var ApiUrl = "https://widipe.com/openai";

// async function sendRequest() {
//   try {
//     const url = `${ApiUrl}?text=${question.value}`;

//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Request failed with status ${response.status}`);
//     }

//     const data = await response.json();
//     answer.innerHTML = data.result;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

var question = document.getElementById("question");
var answer = document.getElementById("answer");
var loadingSpinner = document.getElementById("loadingSpinner");
var submitButton = document.getElementById("submitButton");

var ApiUrl = "https://widipe.com/openai";

async function sendRequest() {
  loadingSpinner.classList.remove("hidden"); // Tampilkan loading spinner
  submitButton.disabled = true; // Disable tombol saat loading

  try {
    const url = `${ApiUrl}?text=${question.value}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    var htmlContent = renderApiResult(data.result);
    answer.innerHTML = htmlContent;
    console.log(data);
    answer.innerHTML = data.result;
  } catch (error) {
    console.log(error);
    answer.innerHTML = "An error occurred. Please try again.";
  } finally {
    loadingSpinner.classList.add("hidden"); // Sembunyikan loading spinner
    submitButton.disabled = false; // Aktifkan kembali tombol
  }
}

function renderApiResult(result) {
  // Pisahkan teks berdasarkan blok kode dan teks lainnya
  var formattedHtml = result
    .replace(/```html([^`]+)```/g, "<pre><code>$1</code></pre>") // Mengubah blok kode menjadi <pre><code>
    .replace(/### (.+)/g, "<h3>$1</h3>") // Mengubah heading menjadi <h3>
    .replace(/\n/g, "<br>")
    .replace(/\- (.+)/g, "<li>$1</li>") // Mengganti bullet point dengan <li>
    .replace(/(\n\n)/g, "</p><p>") // Memisahkan paragraf
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Tambahkan wrapper <p> di awal dan akhir
  return `<p>${formattedHtml}</p>`;
}
