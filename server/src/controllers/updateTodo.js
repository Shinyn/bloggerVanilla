exports.updateTodo = function updateTodo(req, res) {
  console.log("hej från updateTodo");
  // userID hittas i authToken om jag minns rätt
  console.log(req.body);

  const sql = `update todoList set marked = ? where userID = ?`;
};
