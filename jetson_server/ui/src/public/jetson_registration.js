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
var gradientSpeed = 0.002;

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


/*Start of registration of users
 * If the register button is clicked, we will process
 * the data and convert it into a JSON format
 * Then we will store it in a file system
 */
function registration(){
  /*Grab the data from the input*/
  var u_name = document.getElementsByName("username")[0].value;
  var u_email = document.getElementsByName("email")[0].value;
  var u_password = document.getElementsByName("password")[0].value;
  var u_password2 = document.getElementsByName("password2")[0].value;
  var email_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var password_format = /^[0-9a-z]+$/;
  var u_status = "Pending";
  
  var user = {};
  /*Prevent default event*/
  event.preventDefault();
  
  /*Empty Username*/
  if(u_name == ""){
    alert("Please enter a username.");
    u_name.focus();
    return false;
  }
  /*TODO: Need to check if username already exists or not*/

  /*Make username a range 3-14*/
  if(u_name.length > 15 || u_name.length < 4){
      alert("Please make sure username length is between 4 and 14");
      u_name.focus();
      return false;
  }
  /*Empty Email*/
  if(u_email == ""){
    alert("Please enter an email");
    u_email.focus();
    return false;
  }
  /*Email should include @*/
  if(!u_email.match(email_format)){
    alert("Please enter a valid email address.");
    u_email.focus();
    return false; 
  }
  /*Empty Password*/
  if(u_password==""){
    alert("Please enter a valid password");
    u_password.focus();
    return false;
  }
  if(u_password.length < 5){
    alert("Please have atleast 5 characters for yoru password");
  }
  
  /*Password is not alphanumeric*/
  if(!u_password.match(password_format) ){
    alert("Please make sure your password is alphanumeric only");
    u_password.focus();
    return false;
  }
  /*pasword 2 is empty*/
  if(u_password2==""){
    alert("Please confirm your password.");
    u_password2.focus();
    return false;   
  }
  /*Passwords do not match*/
  if(u_password != u_password2){
    alert("The password you typed has not matched.");
    u_password2.focus();
    return false;
  }
  
  /*Creating JSON Object*/
  var json_object = (createJSON(u_name, u_email, u_password, u_status));
  
  /*Reset the form after it is complete and finished*/
  document.getElementById('form_header').reset(); 

  /*Function call to firebase.js -> creating a new User*/	
  /*Need to check if username/email already taken*/
  writeUser(u_name, u_email, u_password, u_status);
  
  alert("Registration Complete");
  return true;
}

/*Helper function to create json object*/
function createJSON(name, email, password, u_status){
  /*
      "User":{
          "username" : name,
           "email" : email,
           "password" : password,
           "status" : status
      }
   */
    var temp = {
           "username" : name,
           "email" : email,
           "password" : password,
           "status" : u_status
    };
  return temp;  
}

