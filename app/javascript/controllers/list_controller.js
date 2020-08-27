import { Controller } from "stimulus";
import { v4 as uuidv4 } from "uuid";

export default class extends Controller {
  static targets = ["items"];

  connect() {
    this.initializeLocalStorage();
    this.renderItems();
  }

  openForm() {
    window.open("/list/new", "newForm", "width=600,height=400");
  }

  initializeLocalStorage() {
    if (this.shoppingListId === null) {
      this.shoppingListId = uuidv4();
    }

    if (this.shoppingListItems === null) {
      this.shoppingListItems = JSON.stringify([]);
    }
  }

  renderItems() {
    if (this.shoppingListItems.length === 0) {
      const emptyMessageEl = document.createElement("div");
      emptyMessageEl.classList.add("text-gray-500");
      emptyMessageEl.innerText =
        "You have no items in your shopping list. Add some!";

      this.itemsTarget.appendChild(emptyMessageEl);
    } else {
      const list = document.createElement("ul");

      this.shoppingListItems.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.classList.add("pb-1");

        const listCheckbox = document.createElement("input");
        listCheckbox.setAttribute("type", "checkbox");
        listCheckbox.setAttribute("value", item);
        listCheckbox.setAttribute("data-action", "list#completed");
        listCheckbox.classList.add("mr-2");
        listItem.appendChild(listCheckbox);

        const listLabel = document.createElement("span");
        listLabel.innerText = item;
        listItem.appendChild(listLabel);

        list.appendChild(listItem);
      });

      this.itemsTarget.appendChild(list);
    }
  }

  completed(event) {
    const checkbox = event.target;

    const updatedList = this.shoppingListItems.filter(
      (item) => item !== checkbox.value
    );
    this.shoppingListItems = JSON.stringify(updatedList);
    checkbox.setAttribute("disabled", "disabled");

    // Find span sibling and change classname (strikethrough, text gray)
    checkbox.nextSibling.classList.add("line-through", "text-gray-300");
    checkbox.parentElement.classList.add(
      "transition",
      "duration-1000",
      "opacity-0"
    );

    setTimeout(() => {
      checkbox.parentElement.remove();
    }, 1000);
  }

  get shoppingListItems() {
    if (localStorage.getItem("shoppingListItems") === null) {
      return null;
    }

    return JSON.parse(localStorage.getItem("shoppingListItems"));
  }

  set shoppingListItems(value) {
    localStorage.setItem("shoppingListItems", value);
  }

  get shoppingListId() {
    return localStorage.getItem("shoppingListId");
  }

  set shoppingListId(id) {
    return localStorage.setItem("shoppingListId", id);
  }
}
