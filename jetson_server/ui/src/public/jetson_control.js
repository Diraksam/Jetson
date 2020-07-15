var PMovesDB_REF = firebase.database().ref('PendingMoves');


/*this will submit a move based on move and duration submitted for the
 * jetbot controller to the pending moves database*/
function submitMove(dir, dur){
    var db_userId = localStorage.getItem("USERID");
    var db_init_time = Date.now().toString();
    var db_duration = dur;
    var moveId = '0';

    if(dir == 'left'){
        moveId = '1';
    }
    else if(dir == 'forward'){
        moveId = '2';
    }
    else if(dir == 'right'){
        moveId = '3';
    }
    else if(dir == 'back'){
        moveId = '4';
    }
   
    var newPMovesDB_REF = PMovesDB_REF.push();
    newPMovesDB_REF.set(
    {
        "userId": db_userId, 
    	"moveId" : moveId,
    	"direction" : dir,
        "duration" : dur,
    	"initialTime" : db_init_time
    });
}

/* Takes controller UI input to submitMoves */	     
function createMove() {
  var duration_format = /^(0|[1-9]\d*)(\.\d+)?$/;
  var element = document.getElementById("dropdown");
  var direction = element.options[element.selectedIndex].text;
  var duration = document.getElementsByName("duration")[0].value;
  if(!duration.match(duration_format)) {
    alert("Please enter a valid duration.");
    duration.focus();
  } else {
    direction = direction.toLowerCase();
    alert("Move successfully submitted.");
    submitMove(direction, duration);
    document.getElementsByName("duration")[0].value = "";
    var elementToRemove = document.getElementsByClassName("select-selected");
    elementToRemove[0].parentNode.removeChild(elementToRemove[0]);
    var divsRemove = document.getElementsByClassName("select-items");
    divsRemove[0].parentNode.removeChild(divsRemove[0]);   
    controlSetup();
  }
}

function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

/* Required for dropdown menu to work correctly/show direction when clicked */
function controlSetup() {
    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      /*for each element, create a new DIV that will act as the selected item:*/
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[0].innerHTML;
      x[i].appendChild(a);
      /*for each element, create a new DIV that will contain the option list:*/
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < selElmnt.length; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            var y, i, k, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                for (k = 0; k < y.length; k++) {
                  y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
              }
            }
            h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function(e) {
          /*when the select box is clicked, close any other select boxes,
          and open/close the current select box:*/
          e.stopPropagation();
          closeAllSelect(this);
          this.nextSibling.classList.toggle("select-hide");
          this.classList.toggle("select-arrow-active");
        });
    }
}
