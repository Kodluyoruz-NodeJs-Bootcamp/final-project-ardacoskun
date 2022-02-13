//For like and delete like colors
var likeBtn = document.querySelector("#likeBtn");

function like() {
  if (likeBtn.style.color == "gray") {
    likeBtn.style.color = "red";
  } else if ((likeBtn.style.color = "red")) {
    likeBtn.style.color = "gray";
  }
}

//For Read More and Read Less functions
let noOfChar = 290;
let pharagraphs = document.querySelectorAll(".pharagraphs");

pharagraphs.forEach((pharagraph) => {
  if (pharagraph.textContent.length < noOfChar) {
    pharagraph.nextElementSibling.style.display = "none";
  } else {
    let displayText = pharagraph.textContent.slice(0, noOfChar);
    let moreText = pharagraph.textContent.slice(noOfChar);
    pharagraph.innerHTML = `${displayText}<span class="dots">...</span><span class="hide more">${moreText}</span>`;
  }
});

function readMore(btn) {
  let post = btn.parentElement;
  post.querySelector(".dots").classList.toggle("hide");
  post.querySelector(".more").classList.toggle("hide");
  let textbox = btn.textContent.trim();
  textbox == "Read More"
    ? (btn.textContent = "Read Less")
    : (btn.textContent = "Read More");
}

//For disable button post while fields are empty
function isEmpty() {
  let movieName = document.getElementById("movieName").value;
  let movieDescription = document.getElementById("movieDescription").value;
  let movieTag = document.getElementById("movieTag").value;

  console.log("moviiiiii", movieName);

  if (movieName !== "" && movieDescription !== "" && movieTag !== "")
    document.getElementById("postBtn").removeAttribute("disabled");
}

function showPreview(event) {
  if (event.target.files.length > 0) {
    var src = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("file-ip-1-preview");
    preview.src = src;
    preview.style.display = "block";
  }
}

function commentIsEmpty() {
  let commentBox = document.getElementById("commentBox").value;

  if (commentBox !== "")
    document.getElementById("submitBtn").removeAttribute("disabled");
}
