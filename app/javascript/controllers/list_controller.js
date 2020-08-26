import { Controller } from "stimulus";

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
    if (localStorage.getItem("shoppingListItems") === null) {
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

  get shoppingListItems() {
    return JSON.parse(localStorage.getItem("shoppingListItems"));
    // return ["Kiwi", "Cereal", "Milk"];
  }

  set shoppingListItems(value) {
    localStorage.setItem("shoppingListItems", value);
  }
}
