# Space-X (Trello Tasks)

This is just a little technical test to a job interview.

## Getting Started

The space-x team is designing their next launch to the international space station, they are recluting a group of the elite devs around the world and thought that you are gonna be a good fit.

Preparations are needed and they want to start organizing their tasks management so they’ve encoment you with your first task. The developer team uses Trello as their task manager app, but their management team (the one that creates the tasks) don’t want to use it, it’s too complicated for them. Is your job to create a bridge between these two teams.
The management team wants an endpoint that they can use to create the tasks, there are 3 flavors this day, but this could change in the future. A task may be:

- **1)** An issue: This represents a business feature that needs implementation, they will provide a short title and a description. All issues gets added to the “To Do” list as unassigned

- **2)** A bug: This represents a problem that needs fixing. They will only provide a description, the title needs to be randomized with the following pattern: bug-{word}-{number}. It doesn't matter that they repeat internally. The bugs should
be assigned to a random member of the board and have the “Bug” label.

- **3)** A task: This represents some manual work that needs to be done. It will count with just a title and a category (Maintenance, Research, or Test) each corresponding to a label in trello.


You need to create a post endpoint using Express.js that will receive the tasks
definition form the management team and create the corresponding cards in Trello


## Preconditions and assumptions

- You already have your Trello API KEY and API TOKEN.
- You already create a Board and you know it's id.
- On the Board you created to test this app, you also created two list ("To Do" and "Default").
- On the Board you created to test this app, you also created four labels ("Bug", "Maintenance", "Research" and "Test").
- Invite the members you want to the Board.
- When you created bug or a task, it gets added to the "Default" list.


## Installing

**1)** clone the repository

**2)** npm install

**3)** complete .env file with your API KEY, API TOKEN and BOARD ID

**4)** npm start

**5)** Enpoint on localhost:3000


## Usage

- curl -H "Content-Type: application/json" -d '{"type": "issue", "title": "Send message","description": "Let Pilots send message to central"}' http://localhost:3000
- curl -H "Content-Type: application/json" -d '{"type": "bug", "description": "Cockpit is not depressurazing correctly"}' http://localhost:3000
- curl -H "Content-Type: application/json" -d '{"type": "task", "title": "Clean the rocket", "category": "Maintenance"}' http://localhost:3000


## Built With

* [Express - 4.17.1]
* [Axios - 0.19.2]
* [Crypto-random-string - 3.2.0]


## Author

* **Gerardo Velazquez (GV)** - *Software Engineer* -

This project is also for personal research.
