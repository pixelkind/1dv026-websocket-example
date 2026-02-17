const socket = new WebSocket(`ws://${location.host}`);
const messages = document.getElementById("messages");

socket.onmessage = (event) => {
  const li = document.createElement("li");
  li.textContent = event.data;
  messages.appendChild(li);
};

document.getElementById("btn").addEventListener("click", () => {
  const input = document.getElementById("input");
  socket.send(input.value);
  input.value = "";
});
