//<div id="userTable"></div> Place this in html
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

window.onload = getUsers();

function JSONToHTMLTable(jsonData, elementToBind) {
    console.log(jsonData);
    //This Code gets all columns for header   and stored in array col
    var col = [];
    for (var i = 0; i < jsonData.length; i++) {
        for (var key in jsonData[i]) {
            if (key == "Password") {
              continue;
            }
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    if(jsonData.length > 0 && elementToBind == 'userTables') {
      col.push('Change Status')
    }

    //This Code creates HTML table
    var table = document.createElement("table");

    //This Code getsrows for header creader above.
    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    //This Code adds data to table as rows
    for (var i = 0; i < jsonData.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
          if(j == col.length - 1 && elementToBind == "userTables") {
            var tabCell = tr.insertCell(-1);
            if(jsonData[i][col[2]] == 'Pending' || jsonData[i][col[2]] == 'Voided') {
              tabCell.innerHTML = "<button class=\'users' type=\'button' onclick=\'updateStatus(this)'>Verify</button>";
            } if(jsonData[i][col[2]] == 'Verified') {
              tabCell.innerHTML = "<button class=\'users' type=\'button' onclick=\'updateStatus(this)'>Void</button>";
            }  
          } else{ 

            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsonData[i][col[j]];
            
          }
        }
    }

    //This Code gets the all columns for header
    var divContainer = document.getElementById(elementToBind);
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function showUsers() {
  document.getElementById("control").classList.remove("active");
  document.getElementById("track").classList.remove("active");
  document.getElementById("users").classList.add("active");
  document.getElementById("userTables").style.display = "inline-block";
  document.getElementById("jetsonControl").style.display = "none";
  document.getElementById("jetsonTrack").style.display = "none";
}

function showControl() {
  document.getElementById("users").classList.remove("active");
  document.getElementById("track").classList.remove("active");
  document.getElementById("control").classList.add("active");
  document.getElementById("userTables").style.display = "none";
  document.getElementById("jetsonControl").style.display = "inline-block";
  document.getElementById("jetsonTrack").style.display = "none";
  controlSetup();
}

function showTrack() {
  document.getElementById("control").classList.remove("active");
  document.getElementById("users").classList.remove("active");
  document.getElementById("track").classList.add("active");
  document.getElementById("userTables").style.display = "none";
  document.getElementById("jetsonControl").style.display = "none";
  document.getElementById("jetsonTrack").style.display = "inline-block";
  getMoves("Moves");
}
