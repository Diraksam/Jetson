var firebaseConfig = {
    apiKey: "AIzaSyBWrLYoawtCCILuqkdpaeZ6EEVTSDjujY4",
    authDomain: "jetson-ece140.firebaseapp.com",
    databaseURL: "https://jetson-ece140.firebaseio.com",
    projectId: "jetson-ece140",
    storageBucket: "jetson-ece140.appspot.com",
    messagingSenderId: "873497005613",
    appId: "1:873497005613:web:49bc99dc8ae15c5f7bb2a4",
    measurementId: "G-VKMWHM4HP5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var UserDB_REF= firebase.database().ref('Users');
 // firebase.analytics();
  var u_name = document.getElementsByName("username")[0].value;
  var u_email = document.getElementsByName("email")[0].value;
  var u_password = document.getElementsByName("password")[0].value;
  var u_password2 = document.getElementsByName("password2")[0].value;
/*Continue firebase authetnication later*/
function writeUser(u_name, u_email, u_password, u_status){
  var newUserDB_REF = UserDB_REF.push();
  newUserDB_REF.set(	
  {
    "Username" : u_name, 
    "Password" : u_password,
    "Email" : u_email,
    "Status" : u_status
  });
}
function validateUser(u_name, u_password){
  window.USERID = u_name;
  console.log(USERID);
  var newUserDB_REF = UserDB_REF.push();
  var user_db_password ="";
  var user_db_status = "";
  firebase.database().ref().child('Users').orderByChild("Username").equalTo(u_name).on("value", function(snapshot) {
    snapshot.forEach((child) => {

      /*This grabs the object of the username if it exists*/
      //console.log(child.val());
      user_db_password = child.val()["Password"];
      user_db_status = child.val()["Status"];
      //console.log("actual user password is: ", child.val()["Password"]);
      //console.log("password typed is ", u_password);
  });
    if (snapshot.exists()) {
       /*The user exists so we check the db password with input password to see if matches*/
       if(user_db_password == u_password && user_db_status == "Verified"){
         alert("Login Approved")
         window.USERID = u_name;
      	 open_admin_page();
      	 return true;
       }else{
         /*The user does not exist in the database => prompt invalid username/password*/
         if(user_db_password == u_password && user_db_status=="Pending"){
           alert("Please Verify Your Account");
         }else{
                 alert("Invalid Username/Passowrd");
           document.getElementByName('username')[0].value.focus();
         }
       }
     }
  });
  return true;
}

/** returns a list of users with their username and status. used for the admin page**/
function getUsers(){
    var userList = [];
    var user_db_user = "";
    var user_db_status = "";
    firebase.database().ref().child('Users').on('value', function(snapshot) {
      if(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          console.log(childSnapshot.val());
          user_db_user = childSnapshot.val()["Username"];
          user_db_email = childSnapshot.val()["Email"];
          user_db_status = childSnapshot.val()["Status"];
          userList.push(
              {"Username": user_db_user, "Email": user_db_email, "Status": user_db_status}
          );
        });
        JSONToHTMLTable(userList, "userTables");
      }
    });
}

/** this will update the user's status. will use when clicking verify on admin page**/
function updateStatus(el){
    var db = firebase.database();
    var updates = {};
    var userId = el.parentNode.parentNode.cells[0].innerHTML;
    db.ref().child('Users').on('value', function(snapshot) {
      if(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          if(childSnapshot.val()["Username"] == userId) {
            if(childSnapshot.val()["Status"] == 'Pending'|| childSnapshot.val()["Status"] == "Voided") {
              updates['Users/'+childSnapshot.key+'/Status'] = 'Verified';
            } else {
              updates['Users/'+childSnapshot.key+'/Status'] = 'Voided';
            }
          }
        });
      }
    });
    db.ref().update(updates);
    getUsers();
}

/** returns a list of Moves based on their status. Updates Jetson tracker as well*/
function getMoves(status){
    var moveList = [];
    firebase.database().ref().child(status).on('value', function(snapshot) {
      if(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          console.log(childSnapshot.val());
          var db_moveid = childSnapshot.val()["moveId"];
          var db_start_time = childSnapshot.val()["startTime"];
          var db_direction = childSnapshot.val()["direction"];
          var db_userId = childSnapshot.val()["userId"];
          var db_status = childSnapshot.val()["status"];
          var db_end_time = childSnapshot.val()["endTime"];
          var db_jetbot_id = childSnapshot.val()["jetbotId"];
          moveList.push(
              {"Move ID": db_moveid, "Start Time": db_start_time, "End Time": db_end_time, "Direction": db_direction, "User ID": db_userId, "Jetbot ID": db_jetbot_id, "Status": db_status}
          );
        });
        if(status == "Moves") {
          JSONToHTMLTable(moveList, "jetsonTrack");
        }
        return moveList;
      }
    });
}
