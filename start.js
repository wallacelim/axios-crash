axios.defaults.headers.common["X-Auth-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// GET REQUEST
async function getTodos() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5",
    {
      timeout: 500, // Add a timeout of 500ms
    }
  );
  showOutput(response);
}

// POST REQUEST
function addTodo() {
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title: "New Todo",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
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
async function customHeaders() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "some-jwt-token",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/todos",
    {
      title: "New Todo",
      completed: false,
    },
    config
  );
  showOutput(response);
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello World",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };

  axios(options).then((res) => showOutput(res));
}

// ERROR HANDLING
async function errorHandling() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todoss?_limit=5",
      {
        validateStatus: (status) => status < 500, // Reject only statuses that are >= 500
      }
    );
    showOutput(response);
  } catch (error) {
    // Server responds with anything other than 2xx
    if (error.response) {
      console.error(error.response);
    } else if (error.request) {
      // Request was made but no response
      console.error("There was no response");
    }
  }
}

// CANCEL TOKEN
async function cancelToken() {
  const source = axios.CancelToken.source();
  const response = axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5", {
      cancelToken: source.token,
    })
    .then(showOutput)
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request cancelled", thrown.message);
      }
    });
  if (true) {
    source.cancel("Request cancelled!");
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (error) => Promise.reject(error)
);

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Notice now the path is simply concatenated to baseURL
axiosInstance.get("/comments").then(showOutput);

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
