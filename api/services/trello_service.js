const axios = require("axios");
const { json } = require("body-parser");
const { response } = require("express");

const BASE_URL = process.env.TRELLO_API
const key = process.env.TRELLO_API_KEY;
const token = process.env.TRELLO_API_TOKEN;
const board_id = process.env.TRELLO_BOARD_ID;


//return Label object call 'name' from the board. Otherwise, empty list
const getLabelOnBoard = async (name) => {
  let url = `${BASE_URL}1/boards/${board_id}/labels?key=${key}&token=${token}`;
  const resp = await axios.get(url);
  const label = await resp.data.filter(item => item.name.toLowerCase() === name );

  if (resp.status !== 200){
    throw Error('Error with trello api')
  }

  return label;
};

//return List object call 'name' from the board. Otherwise, empty list
const getListOnBoard = async (name) => {
  let url = `${BASE_URL}1/boards/${board_id}/lists?key=${key}&token=${token}`;

  const resp = await axios.get(url);
  const list_board = await resp.data.filter(item => item.name.toLowerCase() === name );

  if (resp.status !== 200){
    throw Error('Error with trello api')
  }
  return list_board;
};

//return one member id from the board
const getTrelloBoardsMemberRandom = async () => {
  let url = `${BASE_URL}1/boards/${board_id}/memberships?key=${key}&token=${token}`;
  const resp = await axios.get(url);
  const list = await resp.data.map(item => item.idMember);
  const member = await list[Math.floor(Math.random()*list.length)];

  if (resp.status !== 200){
    throw Error('Error with trello api')
  }

  return member;
};


module.exports = {
  getListOnBoard,
  getTrelloBoardsMemberRandom,
  getLabelOnBoard,
};