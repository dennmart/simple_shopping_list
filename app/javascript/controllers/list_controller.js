import { Controller } from "stimulus";
import { v4 as uuidv4 } from "uuid";

export default class extends Controller {
  static targets = ["items", "itemList"];

  connect() {
    this.initializeLocalStorage();

    if (this.shoppingListItems.length === 0) {
      this.renderEmptyMessage();
    } else {
      this.renderItems();
    }
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

  renderEmptyMessage() {
    const emptyIllustration = document.createElement("img");
    emptyIllustration.classList.add("px-24", "py-4");
    emptyIllustration.setAttribute("src", "/no_items_illustration.png");
    emptyIllustration.setAttribute("alt", "No shopping list items");

    const emptyMessageEl = document.createElement("div");
    emptyMessageEl.classList.add(
      "p-4",
      "text-xl",
      "text-center",
      "font-bold",
      "text-gray-900"
    );
    emptyMessageEl.innerText =
      "You have no items in your shopping list. Add some!";

    this.itemsTarget.appendChild(emptyIllustration);
    this.itemsTarget.appendChild(emptyMessageEl);
  }

  renderItems() {
    const list = document.createElement("ul");
    list.setAttribute("data-target", "list.itemList");

    this.shoppingListItems.forEach((item) => {
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
      listCheckbox.setAttribute("value", item);
      listCheckbox.setAttribute("data-action", "list#completed");
      listCheckbox.classList.add("ml-8", "mr-3", "h-6", "w-6");
      listItem.appendChild(listCheckbox);

      const listLabel = document.createElement("label");
      listLabel.classList.add("text-lg", "text-gray-800");
      listLabel.innerText = item;
      listItem.appendChild(listLabel);

      list.appendChild(listItem);
    });

    this.itemsTarget.appendChild(list);
  }

  completed(event) {
    const checkbox = event.target;

    const updatedList = this.shoppingListItems.filter(
      (item) => item !== checkbox.value
    );
    this.shoppingListItems = JSON.stringify(updatedList);
    checkbox.setAttribute("disabled", "disabled");

    checkbox.nextSibling.classList.add("line-through", "text-gray-300");
    checkbox.parentElement.classList.add(
      "transition",
      "duration-1000",
      "opacity-0"
    );

    setTimeout(() => {
      checkbox.parentElement.remove();

      if (this.shoppingListItems.length === 0) {
        this.itemListTarget.remove();
        this.renderEmptyMessage();
      }
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
