# Rocket League Crate Simulator

[My Notes](notes.md)

A mimicry of Rocket League's old crate opening system where a user earns one of many crates by playing the game, then may opt to purchase keys for $1 each in order to open any crate of choice. The crate then returns a random item. The probabilities are decided by each item's rarity.

IP: http://https://98.84.223.42
Site: http://timmyr.click

HTML links index (Home), play (Play), and scoreboard (Scoreboard) pages. Index is a simple login page requiring a username and password. Play is where the crates are selected, amount is chosen, and session total for each rarity is displayed. It also shows live updates on what other players have pulled from their crates. Scoreboard displays the totals for each username and each of their crate rarities opened.

> [!NOTE]
<!-- >  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing. -->

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] Proper use of Markdown
- [X] A concise and compelling elevator pitch - short, sweet, and to the point
- [X] Description of key features - I'm certain this list will change as I get more into the project
- [X] Description of how you will use each technology - I'm unsure of how accurately my uses are, this will likely be updated later on
- [X] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

As a big Rocket League enjoyer, I was rather distraught when Epic Games bought out Psyonix and changed the crate system to blueprints. Consequently the prices of the more expensive items skyrocketed rather than being worth the $1 key that you spent to open the crate. Although unable to return to those prime days of obtaining in-game items and decals, we can simulate opening crates to mimic the rush felt by opening the crates through a simple website.

### Design
Diagram of how a server request to open a crate returns the item to the player and notifies other players.

```mermaid
    sequenceDiagram
    actor Player1
    actor Player2
    actor Player3
    Player1->>Server: Open a Triumph crate
    Server->>Player1: Samurai
    Server -->>Player2: Player1 opened a Samurai
    Server -->>Player3: Player1 opened a Samurai
    Player3->Server: Open a Ferocity crate
    Player3->>Server: Gale-Fire
    Server -->>Player1: Player3 opened Gale-Fire
    Server -->>Player2: Player3 opened Gale-Fire
```

### Key features

- HTTPS login
- Multiple crates to choose from
- All items opened by other players live is shown
- Scoreboard totals for each rarity per player 
- Several selectors/options that allow for a personalized game

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Login, opening crate, scoreboard
- **CSS** - Create a clean look for all, with emphasis on opening page
- **React** - Affirms login, opens crate, allows for selections on menus
- **Service** - Backend service to update public recent openings live, calculate what each opened item will be
- **DB/Login** - Login registry and temporary public openings
- **WebSocket** - When finalized, the opened item is shown to all players

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Server deployed and accessible with custom domain name** - [My server link](https://timmyr.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
