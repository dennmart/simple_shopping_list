import consumer from "./consumer";

consumer.subscriptions.create(
  {
    channel: "ListChannel",
    id: localStorage.getItem("shoppingListId"),
  },
  {
    received(data) {
      const list = document.getElementById("shopping_list");

      if (list === null) {
        return;
      }

      const items = JSON.parse(localStorage.getItem("shoppingListItems"));
      items.push(data);
      localStorage.setItem("shoppingListItems", JSON.stringify(items));

      const listItem = document.createElement("li");
      listItem.classList.add("pb-1");

      const listCheckbox = document.createElement("input");
      listCheckbox.setAttribute("type", "checkbox");
      listCheckbox.classList.add("mr-2");
      listItem.appendChild(listCheckbox);

      const listLabel = document.createElement("span");
      listLabel.innerText = data;
      listItem.appendChild(listLabel);

      if (list.querySelector("ul") === null) {
        list.querySelector("div").remove();
        list.appendChild(document.createElement("ul"));
      }

      list.querySelector("ul").appendChild(listItem);
    },
  }
);
