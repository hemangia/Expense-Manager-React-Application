const uuid = require("uuid").v4;

const sessions = {};

function addSession(username, password) {
  const sid = uuid();
  sessions[sid] = {
    username,
    password,
  };
  return sid;
}

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function getSessionPassword(sid) {
  return sessions[sid]?.password;
}
function deleteSession(sid) {
  delete sessions[sid];
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  getSessionPassword,
};
