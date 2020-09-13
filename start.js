// GET REQUEST
async function getTodos() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  showOutput(response);
}

// POST REQUEST
async function addTodo() {
  const response = await axios.post("https://jsonplaceholder.typicode.com", {
    data: {
      title: "New Todo",
      completed: false,
    },
  });
  showOutput(response);
}

// PUT/PATCH REQUEST
/**
 * NOTE: PUT is mostly used to replace an entire entry,
 * while PATCH is mostly used to update fields in an entry
 */
async function updateTodo() {
  const response = await axios.patch(
    "https://jsonplaceholder.typicode.com/todos/1",
    {
      title: "Updated Todo",
      completed: true,
    }
  );
  showOutput(response);
}

// DELETE REQUEST
async function removeTodo() {
  const response = await axios.delete(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  showOutput(response);
}

// SIMULTANEOUS REQUESTS
async function getData() {
  const responses = await axios.all([
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
    axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
  ]);
  const [todos, posts] = axios.spread((...responses) => [
    responses[0],
    responses[1],
  ])(responses);
  showOutput(posts);
}

// CUSTOM HEADERS
function customHeaders() {
  console.log("Custom Headers");
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log("Transform Response");
}

// ERROR HANDLING
function errorHandling() {
  console.log("Error Handling");
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");
}

// INTERCEPTING REQUESTS & RESPONSES

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
