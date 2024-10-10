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
    answer.innerHTML = data.result;
  } catch (error) {
    console.log(error);
    answer.innerHTML = "An error occurred. Please try again.";
  } finally {
    loadingSpinner.classList.add("hidden"); // Sembunyikan loading spinner
    submitButton.disabled = false; // Aktifkan kembali tombol
  }
}
