# An interface to host and play a tabletop game that is oddly similar to Delta Green.

## Getting started

`yarn`
`yarn start`
Go to the host url: http://localhost:3000/host
Open a new tab to http://localhost:3000
From the host, click on Create Offer
Go to the guest tab, click on Join. The offer will be accepted and the guest response will be returned
Go back to the host tab, click Accept Response
Tada RTC!

## General Architecture

The goal is to have the Host instance connect to each player instance via a different RTC connection. Eventually the goal is to dispatch player specific events to individual players or messages to everyone at once.

TODO:
Host
[ ] make ui not bad
[ ] create rows for players
[ ] determine event pattern
[ ] figure out what an event structure would look like

Guest
[ ] figure out how to serve events
[ ] persist name/profession/background
[ ] save state to local storage
[ ] load state from local storage
[ ] Combine inventory and bonds tab
[ ] Player icons
