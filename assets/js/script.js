$(document).ready(function () {
  var current_fs, next_fs, previous_fs;

  // No BACK button on first screen
  if ($(".show").hasClass("first-screen")) {
    $(".prev").css({ display: "none" });
  }

  // Next button
  $(".next-button").click(function () {
    current_fs = $(this).parent().parent();
    next_fs = $(this).parent().parent().next();

    // Check for required fields in the current fieldset
    var allValid = true; // Flag to track validity

    current_fs.find("[required]").each(function () {
      if ($(this).val() === "") {
        allValid = false; // If any required field is empty
        $(this).addClass("is-invalid"); // Optionally add an error class for styling
      } else {
        $(this).removeClass("is-invalid"); // Remove error class if filled
      }
    });

    // If all required fields are valid, proceed to the next fieldset
    if (allValid) {
      $(".prev").css({ display: "block" });

      $(current_fs).removeClass("show");
      $(next_fs).addClass("show");

      $("#progressbar li").eq($(".card2").index(next_fs)).addClass("active");

      current_fs.animate(
        {},
        {
          step: function () {
            current_fs.css({
              display: "none",
              position: "relative",
            });

            next_fs.css({
              display: "block",
            });
          },
        },
      );
    } else {
      // Optionally, show an alert or message indicating that fields are required
      alert("Please fill in all required fields.");
    }
  });

  // Previous button
  $(".prev").click(function () {
    current_fs = $(".show");
    previous_fs = $(".show").prev();

    $(current_fs).removeClass("show");
    $(previous_fs).addClass("show");

    $(".prev").css({ display: "block" });

    if ($(".show").hasClass("first-screen")) {
      $(".prev").css({ display: "none" });
    }

    $("#progressbar li").eq($(".card2").index(current_fs)).removeClass("active");

    current_fs.animate(
      {},
      {
        step: function () {
          current_fs.css({
            display: "none",
            position: "relative",
          });

          previous_fs.css({
            display: "block",
          });
        },
      },
    );
  });
});

function copyText() {
  // Get the text from the span
  var textToCopy = document.getElementById("vipCode").innerText;

  // Create a temporary input to copy the text
  var tempInput = document.createElement("input");
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);

  // Select the text inside the input
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text to the clipboard
  document.execCommand("copy");

  // Remove the temporary input
  document.body.removeChild(tempInput);

  // Show a confirmation message (optional)
  var copyMessage = document.getElementById("copyMessage");
  copyMessage.style.display = "block";
  setTimeout(() => {
    copyMessage.style.display = "none";
  }, 2000); // Message disappears after 2 seconds
}

function copyText2() {
  // Get the text from the span
  var textToCopy = document.getElementById("vipCode2").innerText;

  // Create a temporary input to copy the text
  var tempInput = document.createElement("input");
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);

  // Select the text inside the input
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text to the clipboard
  document.execCommand("copy");

  // Remove the temporary input
  document.body.removeChild(tempInput);

  // Show a confirmation message (optional)
  var copyMessage = document.getElementById("copyMessage2");
  copyMessage.style.display = "block";
  setTimeout(() => {
    copyMessage.style.display = "none";
  }, 2000); // Message disappears after 2 seconds
}

// Function to generate a random code in the format ABC-123
function generateRandomCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Available letters
  const digits = "0123456789"; // Available digits
  let letterPart = "";
  let digitPart = "";

  // Generate 3 random letters
  for (let i = 0; i < 3; i++) {
    const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    letterPart += randomLetter;
  }

  // Generate 3 random digits
  for (let i = 0; i < 3; i++) {
    const randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));
    digitPart += randomDigit;
  }

  // Combine the letter and digit parts with a dash
  return letterPart + "-" + digitPart;
}

// Get the span element and insert the generated code
document.getElementById("randomCode").textContent = generateRandomCode();
