const nameField = document.getElementById("name");
const addressField = document.getElementById("address");

nameField.addEventListener("invalid", (event) => {
    const field = event.target;
    const parentElement = field.parentElement;
    const errorMessageContent = parentElement.querySelector(".invalid-feedback");

    if (field.validity.valueMissing) {
        field.setCustomValidity("A név kitöltése kötelező!");
        parentElement.classList.add("was-validated");
        errorMessageContent.textContent = field.validationMessage;
    } else {
        field.setCustomValidity("");
    }
});

addressField.addEventListener("invalid", (event) => {
    const field = event.target;
    const parentElement = field.parentElement;
    const errorMessageContent = parentElement.querySelector(".invalid-feedback");

    if (field.validity.valueMissing) {
        field.setCustomValidity("A cím kitöltése kötelező!");
        parentElement.classList.add("was-validated");
        errorMessageContent.textContent = field.validationMessage;
    } else {
        field.setCustomValidity("");
    }
});

document.forms["foodOrder"].addEventListener("submit", async (event) => {
    event.preventDefault();

    if (event.target.checkValidity()) {
        const formElement = event.target;

        const formData = new FormData(formElement);

        const data = Object.fromEntries(formData);

        const jsonData = JSON.stringify(data);

        let response = await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        });

        let responseJson = await response.json();

        const orderDisplay = document.getElementById("orderDisplay");
        orderDisplay.textContent = "Sikeres megrendelés. A rendelés azonosítója " + responseJson._id;
        orderDisplay.classList = "alert alert-primary";

        nameField.value = "";
        addressField.value = "";
    }
});