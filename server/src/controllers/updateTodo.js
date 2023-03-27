exports.updateTodo = function updateTodo(req, res) {
  console.log("   ");
  console.log("Server - updateTodo");
  // i req finns loggedInUser
  // i req.cookies finns authToken
  // i req.body finns isChecked
  console.log(req.loggedInUser);
  console.log(req.cookies);
  console.log(req.body);

  const sql = `update todoList set marked = ? where userID = ?`;
};
