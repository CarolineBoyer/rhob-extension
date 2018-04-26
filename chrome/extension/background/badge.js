chrome.storage.local.get('state', (obj) => {
    //place on what to do for badget Text on icon
    console.log(obj);
  // let todos = obj.todos;
  // if (todos) {
  //   todos = JSON.parse(todos);
  //   const len = todos.filter(todo => !todo.marked).length;
  //   if (len > 0) {
  //     chrome.browserAction.setBadgeText({ text: len.toString() });
  //   }
  // } else {
  //   // Initial
  //   chrome.browserAction.setBadgeText({ text: '1' });
  // }
});
