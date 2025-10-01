export function loadComponents() {
  const componentContainers = document.querySelectorAll("[data-component]");

  componentContainers.forEach((container) => {
    const componentName = container.dataset.component;
    if (componentName) {
      fetch(`components/${componentName}.html`)
        .then((response) => response.text())
        .then((html) => {
          container.innerHTML = html;
          // Initialize specific component functionalities
          if (componentName === "contact-form") {
            initializeContactForm(container);
          }
        })
        .catch((error) =>
          console.error(`Error loading ${componentName} component:`, error)
        );
    }
  });
}

function initializeContactForm(container) {
  const form = container.querySelector("#contact-form");
  const formFields = container.querySelector("#form-fields");
  const result = container.querySelector("#result");
  const successMessage = container.querySelector("#success-message");
  const spamMessage = container.querySelector("#spam-message");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      formFields.style.display = "none";
      result.innerHTML = "Please wait...";
      successMessage.classList.add("hidden");
      spamMessage.classList.add("hidden");

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })
        .then(async (response) => {
          let jsonResponse = await response.json();
          if (response.status === 200) {
            result.innerHTML = "";
            successMessage.classList.remove("hidden");
            setTimeout(() => {
              successMessage.classList.add("hidden");
              formFields.style.display = "block";
              form.reset();
            }, 5000);
          } else {
            console.log(response);
            result.innerHTML = jsonResponse.message + ". Please try again.";
            formFields.style.display = "block";
            if (object.botcheck) {
              spamMessage.classList.remove("hidden");
              setTimeout(() => {
                spamMessage.classList.add("hidden");
                formFields.style.display = "block";
                form.reset();
              }, 5000);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          result.innerHTML = "Something went wrong!";
          formFields.style.display = "block";
        });
    });
  }
}
