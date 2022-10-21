import axios from "axios";

const headerConfig = {
  headers: {
    token: localStorage.getItem("token"),
  },
};
export const createBoard = (obj) => {
  let responce = axios.post(
    "http://localhost:3003/api/v1/boards/newBoard",
    obj,
    headerConfig
  );
  return responce;
};

export const getAllBoardsName = () => {
  let responce = axios.get(
    "http://localhost:3003/api/v1/boards/getAllBoardName",
    headerConfig
  );
  return responce;
};

export const getBoardById = (id) => {
  let url = "http://localhost:3003/api/v1/boards//getBoard/" + id;

  let response = axios.get(url, headerConfig);
  return response;
};

export const createCard = (id, body) => {
  let responce = axios.patch(
    "http://localhost:3003/api/v1/boards/addCard/" + id.id,
    body,

    headerConfig
  );
  return responce;
};

export const updateCard = (id, body) => {
  let responce = axios.patch(
    "http://localhost:3003/api/v1/boards/updateCard/" + id.id,
    body,

    headerConfig
  );
  return responce;
};
export const deleteCard = (id, body) => {
  let responce = axios.patch(
    "http://localhost:3003/api/v1/boards/deleteCard/" + id.id,
    body,

    headerConfig
  );
  return responce;
};
