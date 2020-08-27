import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["item"];

  addNewItem(event) {
    event.preventDefault();

    if (this.itemTarget.value === "") {
      // Error message in form
      console.log("Please enter an item to add to your shopping list.");
      return;
    }

    if (this.shoppingListItems.includes(this.itemTarget.value)) {
      // Error message in form
      console.log(
        `You already have '${this.itemTarget.value}' in your shopping list.`
      );
      this.itemTarget.value = "";
      return;
    }

    const csrfToken = document.head.querySelector("[name='csrf-token']");
    const reqHeaders = new Headers({
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken.content,
    });

    fetch("/list", {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify({
        id: this.shoppingListId,
        item: this.itemTarget.value,
      }),
    }).then((response) => {
      if (response.status === 201) {
        this.itemTarget.value = "";
        this.itemTarget.focus();
        // Success message in form
      } else {
        // Error message in form
      }
    });
  }

  closeWindow() {
    window.close();
  }

  get shoppingListId() {
    return localStorage.getItem("shoppingListId");
  }

  get shoppingListItems() {
    return JSON.parse(localStorage.getItem("shoppingListItems"));
  }
}
