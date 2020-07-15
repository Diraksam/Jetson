# Web Portal Authentication 

I set up the main UI for the WebPage. It's in its early stages of development. Will need to consider going over
which pages are actually necessary. It has a gradient background which might change later depending on how busy
it looks. I am also thinking about doing something with the left over space on the right side as well.

## Things to do:

### Pages
  - [X] SignUp
    - [ ] ~~Send JSON Object to FileSystem~~
    - [X] Hooked up to server 
    - [X] Made JSON Object with Input
    - [X] Validate input types in registration form
     
      
  - [X] Admin Portal 
    - [X] Come up with UI
    - [X] Hook up to server
    - [ ] ~~Parse file System to getUsers in JSON~~
    - [X] Change status for each user
    
  - [X] Jetbot Tracker
    - [X] Figure out UI
  - [X] Jetbot Web Controller
    - [X] - Figure out UI
  - [ ] Jetbot Move Poller
    - [X] ~~- Figure out UI ~~
  
  - [ ] About -- simple short explanation
    - [ ] - Figure out UI
  - [ ] Forgot Password? -- send an email link to reset password - need backend connected
    - [ ] - Figure out UI

### Backend
  - [X] Login Protocol
  - [X] Verification Protocol
  - [ ] Admin Functionalites
  - [X] Database Schema - Storage Protocols ~~OR File System~~
  - [X] Handling requests 


### UI Static Look:
<img width="1675" alt="Screen Shot 2020-01-28 at 6 56 57 PM" src="https://user-images.githubusercontent.com/46547102/73325500-99269880-4203-11ea-893c-83691434d14c.png">

###### Don't Worry the gradient changes

### UI after click:
<img width="1680" alt="Screen Shot 2020-01-28 at 6 57 03 PM" src="https://user-images.githubusercontent.com/46547102/73325501-9cba1f80-4203-11ea-8719-6c9a02938e6a.png">
=======
# Web Portal Authentication 

I set up the main UI for the WebPage. It's in its early stages of development. Will need to consider going over
which pages are actually necessary. It has a gradient background which might change later depending on how busy
it looks. I am also thinking about doing something with the left over space on the right side as well.

> Please do not git push --force into the repo.

## Things to do:

### Pages
  - [X] SignUp
    - [X] Send JSON Object to Firebase Database
    - [X] Hooked up to server 
    - [X] Made JSON Object with Input
    - [X] Validate input types in registration form
       
  - [X] Admin Portal 
    - [X] Come up with UI
    - [X] Hook up to server
    - [X] Parse Database 
      - [X] getUsers()
      - [X] updateUserStatus()
    
  - [X] Jetbot Tracker
    - [X] Figure out UI
  - [X] Jetbot Web Controller
    - [X] - Figure out UI
  - [ ] Jetbot Move Poller
    - [ ] ~~- Figure out UI ~~

### Backend:
  - [X] Database Hooked Up
  - [X] Database Schema - Storage Protocols OR File System
  - [X] Registration Protocol
  - [X] Login Verification Protocol
    - [X] Authenticate through firebase
  - [ ] Admin Functionalites
  
### Extra:
- [ ] About Page
    - [ ] - Figure out UI

### Firebase:
- [ ] Check if the user/email has already been created - if so alert user
- [ ] Find a way to send an email to registered User that wants to reset password
  - [ ] Figure out UI for Forgot password page. 

### UI Static Look:
<img width="1675" alt="Screen Shot 2020-01-28 at 6 56 57 PM" src="https://user-images.githubusercontent.com/46547102/73325500-99269880-4203-11ea-893c-83691434d14c.png">

###### Don't Worry the gradient changes

### UI after click:
<img width="1680" alt="Screen Shot 2020-01-28 at 6 57 03 PM" src="https://user-images.githubusercontent.com/46547102/73325501-9cba1f80-4203-11ea-8719-6c9a02938e6a.png">

### UI Registration Form:
<img width="1213" alt="Screen Shot 2020-02-02 at 5 17 34 PM" src="https://user-images.githubusercontent.com/46547102/73619371-f6df2a00-45e1-11ea-92d2-5a1b7f4252ea.png">

### UI Registration Click-nav:
<img width="1211" alt="Screen Shot 2020-02-02 at 5 17 42 PM" src="https://user-images.githubusercontent.com/46547102/73619398-09596380-45e2-11ea-8b90-90f1ec7b1fec.png">


##### The Registration Form has validation Checks built within: 
- Username Length Between 4 and 14
- Password Length > 5
- Valid email string such as string@string.string
- Any Input Not Null
- Password is Alphanumeric

### Registration Form:
<img width="317" alt="Screen Shot 2020-02-02 at 5 18 02 PM" src="https://user-images.githubusercontent.com/46547102/73619414-1ece8d80-45e2-11ea-8471-7b8ff1f0fd54.png">


### Registering a New User:
<img width="1207" alt="Screen Shot 2020-02-02 at 5 31 16 PM" src="https://user-images.githubusercontent.com/46547102/73619422-2c841300-45e2-11ea-8032-ce26c997d64a.png">

### Checking Firebase to See if User Registration Updated:
<img width="443" alt="Screen Shot 2020-02-02 at 5 31 34 PM" src="https://user-images.githubusercontent.com/46547102/73619432-33ab2100-45e2-11ea-8941-bbe33bed364e.png">

### Logging in
use admin, admin
<img width="1320" alt="Screen Shot 2020-02-08 at 11 21 07 AM" src="https://user-images.githubusercontent.com/46547102/74091274-836a6c00-4a6a-11ea-8ef8-07a7fd6bb221.png">

### login approved
<img width="1219" alt="Screen Shot 2020-02-08 at 11 21 13 AM" src="https://user-images.githubusercontent.com/46547102/74091280-9a10c300-4a6a-11ea-8f38-1d1fb44bf5fc.png">

### Upon login, getUsers active admin Portal
<img width="1297" alt="Screen Shot 2020-02-08 at 11 21 19 AM" src="https://user-images.githubusercontent.com/46547102/74091287-a563ee80-4a6a-11ea-95fe-50fb0f339147.png">

### UserStatus update verification
<img width="474" alt="Screen Shot 2020-02-08 at 11 21 30 AM" src="https://user-images.githubusercontent.com/46547102/74091304-dba16e00-4a6a-11ea-8f22-17188f8db60a.png">

### We are voiding test2 user
<img width="953" alt="Screen Shot 2020-02-08 at 11 21 45 AM" src="https://user-images.githubusercontent.com/46547102/74091311-ed831100-4a6a-11ea-8832-d619559b27c4.png">

### verification in RTDB
<img width="456" alt="Screen Shot 2020-02-08 at 11 21 50 AM" src="https://user-images.githubusercontent.com/46547102/74091329-13a8b100-4a6b-11ea-8880-ee114340af18.png">

### Controller UI
<img width="1200" alt="Screen Shot Jetson Controller" src="https://user-images.githubusercontent.com/25269175/74599718-86052c80-503b-11ea-8dff-52cf00235fd6.JPG">

### Controller Dropdown Menu
<img width="736" alt="jetdropdown" src="https://user-images.githubusercontent.com/25269175/74599775-64587500-503c-11ea-9152-b2d734a0cf3d.PNG">

### Controller Move submission confirmation
<img width="1080" alt="controllerConfirm" src="https://user-images.githubusercontent.com/25269175/74600464-01b8a680-5047-11ea-8e4c-38f1f56288a4.PNG">

### Move uploaded to PendingMoveDB
<img width="456" alt="PendingMoveDB" src="https://user-images.githubusercontent.com/25269175/74599749-f613b280-503b-11ea-929f-c00dffed98f5.JPG">

### Jetson Tracker of completed Moves
<img width="1080" alt="jetsontrack" src="https://user-images.githubusercontent.com/25269175/74600542-0cc00680-5048-11ea-977f-7f8adf68ce17.PNG">

