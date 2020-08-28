import { v4 as uuidv4 } from "uuid";
import consumer from "./consumer";

const channelId = localStorage.getItem("shoppingListId") || uuidv4();

consumer.subscriptions.create(
  {
    channel: "ListChannel",
    id: channelId
  },
  {
    initialized() {
      if (localStorage.getItem("shoppingListId") === null) {
        localStorage.setItem("shoppingListId", channelId);
      }
    },

    received(data) {
      const list = document.getElementById("shopping_list");

      if (list === null) {
        return;
      }

      const items = JSON.parse(localStorage.getItem("shoppingListItems"));
      items.push(data);
      localStorage.setItem("shoppingListItems", JSON.stringify(items));

      const listItem = document.createElement("li");
      listItem.classList.add(
        "flex",
        "items-center",
        "py-3",
        "border-b",
        "border-teal-200",
        "last:border-b-0"
      );

      const listCheckbox = document.createElement("input");
      listCheckbox.setAttribute("type", "checkbox");
      listCheckbox.setAttribute("value", data);
      listCheckbox.setAttribute("data-action", "list#completed");
      listCheckbox.classList.add("ml-8", "mr-3", "h-6", "w-6");
      listItem.appendChild(listCheckbox);

      const listLabel = document.createElement("label");
      listLabel.classList.add("text-lg", "text-gray-800");
      listLabel.innerText = data;
      listItem.appendChild(listLabel);

      if (list.querySelector("ul") === null) {
        list.querySelector("img").remove();
        list.querySelector("div").remove();

        const itemList = document.createElement("ul");
        itemList.setAttribute("data-target", "list.itemList");
        list.appendChild(itemList);
      }

      list.querySelector("ul").appendChild(listItem);
    },
  }
);
