#  ![logo](https://github.com/caydennn/iap-submission/blob/main/logo.png) Seventeen

### Get to know someone in 17 seconds

Want to get know someone better, but don't have the patience to talk to them? 

Seventeen is a website where you use drawings to understand your friend better and learn how they perceive the world, without speaking a single world.
All in 17 seconds.


---



## :runner: Getting Started

You can check out Seventeen over [here](https://realtime-2p-canvas.herokuapp.com).

1. Create a room or join your friend's room via entering their Room ID (that they have to send to you)
2. If you're a host, click start. If not, wait for the host to start the game.
3. You'll be given a random topic to draw about. However you want to interpret or draw it is entirely up to you (and reflects who you are 😉)
4. You have 17 seconds. 
5. Click Next Question.
6. Continue forever.

---



## :white_check_mark: Features

- **Realtime Canvas:** Users can see exactly what the other party is drawing in real time. 
- **Private Rooms:** Only your friend whom you've sent the Room ID to can access it. 
- **Rejoin a game:** Users who disconnect from a game in progress can rejoin the game using the same room ID (upon the earliest "Next Question" button click)
- **Mobile responsive (Somewhat):** Can be accessed on tablet but with some limitations (see Known Issues section)]



---



## :hammer: Running Seventeen locally

> You need to have node installed to run Seventeen locally.

After downloading or cloning the repo, run:

```command
npm install
node server.js
```

Go to ``` localhost:8080``` and Seventeen should be up and running! :smile:



---



## :x: Known Issues

Below are some minor issues/bugs that are known to exist.

- There is no UI to show that a user has left the room while in the lobby or during a game in progress

- Drawing strokes appear as dots if the mouse is dragged too fast across the canvas 

- When drawing on a tablet, the browser scrolls with the drag action (making it impossible to draw anything sensible)


---



[Submission for the Introduction to Realtime Web Apps IAP] (http://realtime-apps-iap.github.io/competition)

  



