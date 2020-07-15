import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import time

from twisted.internet import task, reactor
from queue import Queue

# Fetch the service account key JSON file contents
cred = credentials.Certificate('/Users/diraksa/ECE140A/jetson_server/ui/jetson-ece140-firebase-adminsdk-nn5ot-7b8966f325.json')

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL':"https://jetson-ece140.firebaseio.com"
})

# As an admin, the app has access to read and write all data, regradless of Security Rules
userDBRef = db.reference('Users')
moveDBRef = db.reference('Moves')
pendingMovesDBRef = db.reference('PendingMoves')

#initializing variables
pending_queue = Queue()
global_timer = 1

'''
# Add a new moves under pendingMoves
new_pendMove = pendingMovesDBRef.push({
    'userId' : "Paul",
    'moveId' : "11",
    'direction' : "right",
    'duration' : '0',
    'initialTime' : "1545925769.9618232"
    })
# Add a new moves under /moves
'''
'''
new_user = moveDBRef.push({
    'moveId' : '1', # 1 = left, 2 = up, 3 = right, 4 = down or autogenerating
    'userId' : '23',
    'jetbotId' : '01',
    'initiateTime' : '1000032',
    'startTime' : '1030',
    'direction' : '1031',
    'status' : 'Pending'
})
'''


def jetson_move(direction, duration):
    """
    This function calls to move the jetbot depending on the 
    direction and duration parameters given. This will return
    The endtime that the jetbot completed the move.

    Example: direction = forward, duration = 2
             robot.forward(2) 
    Output: EndTime 

    """

    # This checks to see if the duration given is a float
    if duration > 0 and duration < 1:
       time = float(duration)
    else:
        time = int(duration)

    # Different Directions
    if direction == 'left':
        robot.left(speed=time)
    if direction == 'right':
        robot.right(speed=time)
    if direction == 'up':
        robot.forward(speed=time)
    if direction == 'down':
        robot.backward(speed=time)

    # Calculate the endTime
    endTime = time.time()

    return endTime

def delete_pending_move(move_key):
    """
    This function deletes the child reference from the move_key 
    given from the PendingMoves database. 
    """
    print('deleting move_key')
    try: 
        if(len(move_key) > 0):
            pendingMovesDBRef.child(move_key).delete()
        else:
            print('move_key is null.')
            wait_for_pending_moves()
    except KeyboardInterrupt:
            print('KeyBoardInterrupt')

def wait_for_pending_moves():
    """
    This function is going to sleep for periods of 3 seconds to poll for
    incoming moves in the queue
    """
    if pending_queue.empty():
        print("Queue is empty.. waiting for 1 second... get_pending_moves()")
        time.sleep(1)
        get_pending_moves()
    else:
        print("Queue is not empty.. waiting for 1 second... run_pending_moves()")
        run_pending_moves()

def run_pending_moves():
    """
    This function runs the pending moves from the queue
    and creates a completed move json packet to be sent to our
    completed moves database for our tracker to showcase

    """

    print("Running pending Moves")

    # If there are no pending moves, wait
    if pending_queue.empty():
        wait_for_pending_moves()

    try: 
        while not pending_queue.empty(): 
            #grab the current move_dict 
            item = pending_queue.get()
            move_key = item[0]
            move_dict = item[1]

            print(f"key: {move_key}, \ndict: {move_dict}")

            #start time
            startTime = time.time()
            direction = move_dict['direction']
            duration = move_dict['duration']
            moveId = move_dict['moveId']
            userId = move_dict['userId']
            initialTime = move_dict['initialTime']

            # Calculate the endtime of the jetson by sleeping for 
            # the duration of the move + 1

            #end_time = jetson_move(direction, duration)
            # time.sleep(duration + 1)
            endTime = startTime + 1

            # Push a completed move to the Moves database for the tracker.
            # Calculate the ending time from jetbot movement
            completed_move = moveDBRef.push({
                'direction'     : direction,
                'duration'      : duration,
                'moveId'        : moveId,
                'userId'        : userId,
                'initialTime'   : initialTime,

                #figure out unique jetbot id
                'jetbotId' : '01',
                'startTime' : time.ctime(startTime),
            
                #endTime should focus on when jetson nano finishes
                'endTime' : time.ctime(endTime),
                'status' : 'Complete'
            })

            # Call to delete the current pending move
            print(f"deleting user_key: {move_key}")
            delete_pending_move(move_key)

        else:
            print('queue is empty.. waiting for pending moves for 3 seconds')
            wait_for_pending_moves()
            time.sleep(3)
    except KeyboardInterrupt:
        # do something here
        print("End of check_pending")

def get_pending_moves():
    # This function grabs the pending moves from the database
    # and puts it in the queue as a tuple of (key, dict) pair
    # where key is the child reference to the database node 
    # and dict is the json user fields for our jetbot
    
    print("Tring to get pending moves from DB")

    try:
        try:
            for key, val in pendingMovesDBRef.get().items():
                pending_queue.put((key,val))
        except:
            # Error occurred
            wait_for_pending_moves()
        for key, val in pendingMovesDBRef.get().items():
            pending_queue.put((key,val))
        else:
            print(f"pending queue size: {pending_queue.qsize()}")
            return run_pending_moves()
    except:
        print("exception occurred in get_pending_moves")
        print("Going to wait 2 seconds pending moves")
        time.sleep(2)
        wait_for_pending_moves()
        return

# This is the main driver of the function
def run_poller():
    print("Running Jetson v1.0 Poller\n")
    try:
        while True:
            get_pending_moves()
        else:
            print('ending')
    except KeyboardInterrupt:
        print("Keyboard Interrupt.. Stopping poller")
        pass
