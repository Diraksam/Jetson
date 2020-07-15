// Background credit: https://speckyboy.com/css-background-effects
var colors = new Array(
  [18, 44, 111],
  [33, 111, 11],
  [122, 99, 33],
  [45, 175, 230],
  [255, 0, 255],
  [255, 128, 0]
);

var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = 0.0015;

function updateGradient() {
  if ($ === undefined) return;

  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];

  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

  $("#gradient")
    .css({
      background:
        "-webkit-gradient(linear, left top, right top, from(" +
        color1 +
        "), to(" +
        color2 +
        "))"
    })
    .css({
      background:
        "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
    });

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] =
      (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
    colorIndices[3] =
      (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
  }
}
setInterval(updateGradient, 1);

/*Start of the menu sidebar*/
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
} 

function authenticate_login(){
  var u_name = document.getElementsByName("username")[0].value;
  var u_password = document.getElementsByName("password")[0].value;

  event.preventDefault();

  /*Check for username input*/
  if(u_name == ""){
    alert("Please Enter a Username");
    u_name.focus();
    return false;
  }
  if(u_name.length < 4){
    alert('Please make sure your username is between 4 and 14 characters');
    u_name.focus(); 
    return false;
  }
  /*Check for password input*/
  if(u_password == ""){
    alert("Please Enter a Password");
    u_passowrd.focus();
    return false;
  }
  if(u_password.length < 5){
    alert("Please Make Sure Password is atleast 5 characters");
    u_password.focus();
    return false;
  }
  localStorage.setItem("USERID", u_name);
  console.log(localStorage.getItem("USERID"));
  /*Clear inputs*/
  document.getElementById('form_login').reset();
  
  /*Function in firebase.js to validate the user input from firebase database*/
  validateUser(u_name, u_password);

  return true;
}
/*Opens up the user_table /admin page*/
function open_admin_page(){
  //window.location.assign("jetson_admin.html");
  window.location.assign('jetson_admin.html');
}
