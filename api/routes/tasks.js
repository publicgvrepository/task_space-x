const express = require('express');
const axios = require("axios");
const router = express.Router();
const trello_service = require('../services/trello_service')
const cryptoRandomString = require('crypto-random-string');
const { response } = require('express');

const BASE_URL = process.env.TRELLO_API;
const key = process.env.TRELLO_API_KEY;
const token = process.env.TRELLO_API_TOKEN;


router.post('/', async (req, res, next) => {

  let taskType = {
    type: req.body.type,
  }

  switch (taskType.type.toLowerCase()) {
    //task as issue
    case 'issue':
      taskType = {
        ...taskType,
        title: req.body.title,
        description: req.body.description
      }
      break;
    case 'bug':
      let word = cryptoRandomString({length: 4, characters: 'abcdefghijklmnopqrstuvwxyz'});
      let number = cryptoRandomString({length: 4, type: 'numeric'});
      taskType = {
        ...taskType,
        title: `bug-${word}-${number}`,
        description: req.body.description
      }
      break;
    case 'task':
      taskType = {
        ...taskType,
        title: req.body.title,
        category: req.body.category
      }
      break;
    }

  switch (taskType.type.toLowerCase()) {
    //task as issue
    case 'issue':
      try{
        const todo_list = await trello_service.getListOnBoard("to do")
        if (todo_list.length === 0){
          res.status(404).json({
            error: 'To Do list not found on board'
          });
        }
        else{
          let url_create_issue = `${BASE_URL}1/cards?idList=${todo_list[0].id}&name=${taskType.title}&desc=${taskType.description}&key=${key}&token=${token}`;
          await axios.post(url_create_issue)
            .then(response =>{
              res.status(201).json({
                message: "Issue created!",
                task: taskType
              });
            })
        }

      } catch (error){
          res.status(500).json({
            error: error.message
          });
      }
      break;

    //task as bug or a common task
    //goes to default board's list
    case 'task':
    case 'bug':
      try {
        const default_list = await trello_service.getListOnBoard("default")
        if (default_list.length === 0){
          res.status(404).json({
            error: 'Default list not found on board'
          });
        }
        else{
          let url_create = `${BASE_URL}1/cards?idList=${default_list[0].id}&name=${taskType.title}&key=${key}&token=${token}`;
          //If is a bug type, search that label name, otherwise search for label with name like category
          let label_name = taskType.type.toLowerCase()==="bug" ? "bug" : taskType.category.toLowerCase();
          const label = await trello_service.getLabelOnBoard(label_name);
          if (label.length === 0){
            res.status(404).json({
              error: `${label_name} label not found on board`
            });
          }
          else{
            let url_create_task = `${url_create}&idLabels=${label[0].id}`;
            if (taskType.type.toLowerCase()==="task") {
              await axios.post(url_create_task)
                .then(response =>{
                  res.status(201).json({
                    message: "Task created!",
                    task: taskType
                  });
                })
            }
            else{
              const id_member = await trello_service.getTrelloBoardsMemberRandom()
              let url_create_bug = `${url_create}&desc=${taskType.description}&idMembers=${id_member}&idLabels=${label[0].id}`;
              await axios.post(url_create_bug)
                .then(response =>{
                  res.status(201).json({
                    message: "Bug created!",
                    task: taskType
                  });
                })
            }
          }
        }

      } catch (error){
        res.status(500).json({
          error: error.message
        });
      }
      break;
    default:
      res.status(400).json({
        message:'Bad Request - Invalid task type'
      });
  }
});

module.exports = router;

// curl -H "Content-Type: application/json" -d '{"type": "issue", "title": "Send message","description": "Let Pilots send message to central"}' http://localhost:3000
// curl -H "Content-Type: application/json" -d '{"type": "bug", "description": "Cockpit is not depressurazing correctly"}' http://localhost:3000
// curl -H "Content-Type: application/json" -d '{"type": "task", "title": "Clean the rocket", "category": "Maintenance"}' http://localhost:3000