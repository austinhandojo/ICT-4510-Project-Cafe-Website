// Austin Handojo
// ICT 4510
// June 4 2023
// Thi JS is for the admin page which includes the login logout function as well as adding new items. Other functions to control the buttons and inputs.
var submission;
var apiKey = "";
var sessionToken = "";

function authenticate() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    document.getElementById("formid").style.display = "none";

  fetch("https://ict4510.herokuapp.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        document.getElementById("myModal").style.display = "block";
        return response.json();
      } else {
        document.getElementById("myModalfailed").style.display = "block";
        throw new Error("Login failed");
      }
    })
    .then((user) => {
      sessionStorage.setItem("user", JSON.stringify(user));
      submission= "Welcome "+user.user.first_name+" !";
      apiKey = user.user.api_key;
      sessionToken = user.user.token;
      console.log(apiKey+" "+sessionToken);
      document.getElementById("text").innerHTML = submission
      document.getElementById("menu-item-form").style.display = "block";
      document.getElementById("logoutbutton").style.display = "block";
      document.getElementById("login-title").style.display = "none";
      document.getElementById("addform-title").style.display = "block";

    })
    .catch((error) => {
      console.error(error);
    });
}

function loginfailed(){
  document.getElementById("myModalfailed").style.display = "none";
  location.reload();
}

function closeModal(){
    document.getElementById("myModal").style.display = "none";
    document.getElementById("addtrue").style.display = "none";
    document.getElementById("addfalse").style.display = "none";
}

// Get the form element
var form = document.getElementById("menu-item-form");

// Add an event listener for the form submission
function addItem() {
  // Get the form data
  var item = document.getElementById("item").value;
  var description = document.getElementById("description").value;
  var price = document.getElementById("price").value;

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Set up the POST request
  xhr.open("POST", "https://ict4510.herokuapp.com/api/menus?api_key=" + apiKey, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("x-access-token", sessionToken);

  // Handle the response
  xhr.onload = function() {
    if (xhr.status === 201) {
      console.log("Menu item added successfully!");
      document.getElementById("addtrue").style.display = "block";
      document.getElementById("menu-item-form").reset();
      // You can perform any additional actions here after a successful request

    } else {
      console.error("Request failed. Status: " + xhr.status);
      document.getElementById("addfalse").style.display = "block";

    }
  };

  // Create the request payload
  var payload = {
    item: item,
    description: description,
    price: price
  };

  // Send the POST request with the payload
  xhr.send(JSON.stringify(payload));
};

function logout() {
  sessionStorage.removeItem("user");
  document.getElementById("formid").style.display = "block";
  document.getElementById("menu-item-form").style.display = "none";
  document.getElementById("logoutbutton").style.display = "none";
  document.getElementById("login-title").style.display = "block";
  document.getElementById("addform-title").style.display = "none";


}
