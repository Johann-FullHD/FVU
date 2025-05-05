document.addEventListener("DOMContentLoaded", function () {
  // Form navigation elements
  const form = document.getElementById("report-form");
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const step3 = document.getElementById("step-3");
  const step4 = document.getElementById("step-4");

  const step1Indicator = document.getElementById("step-1-indicator");
  const step2Indicator = document.getElementById("step-2-indicator");
  const step3Indicator = document.getElementById("step-3-indicator");
  const step4Indicator = document.getElementById("step-4-indicator");

  const toStep2Btn = document.getElementById("to-step-2");
  const backToStep1Btn = document.getElementById("back-to-1");
  const toStep3Btn = document.getElementById("to-step-3");
  const backToStep2Btn = document.getElementById("back-to-2");
  const toStep4Btn = document.getElementById("to-step-4");
  const backToStep3Btn = document.getElementById("back-to-3");

  // Form elements
  const incidentType = document.getElementById("incident-type");
  const otherTypeContainer = document.getElementById("other-type-container");
  const otherType = document.getElementById("other-type");
  const recipient = document.getElementById("recipient");
  const incidentDate = document.getElementById("incident-date");
  const incidentLocation = document.getElementById("incident-location");
  const incidentDescription = document.getElementById("incident-description");
  const fileUpload = document.getElementById("file-upload");
  const fileNames = document.querySelector(".file-names");
  const anonymousToggle = document.getElementById("anonymous-toggle");
  const toggleStatus = document.getElementById("toggle-status");
  const contactFields = document.getElementById("contact-fields");
  const reporterName = document.getElementById("reporter-name");
  const reporterEmail = document.getElementById("reporter-email");
  const sendCopy = document.getElementById("send-copy");
  const termsAgreement = document.getElementById("terms-agreement");

  // Review elements
  const reviewIncidentType = document.getElementById("review-incident-type");
  const reviewRecipient = document.getElementById("review-recipient");
  const reviewIncidentDate = document.getElementById("review-incident-date");
  const reviewIncidentLocation = document.getElementById(
    "review-incident-location"
  );
  const reviewIncidentDescription = document.getElementById(
    "review-incident-description"
  );
  const reviewAttachments = document.getElementById("review-attachments");
  const reviewAnonymous = document.getElementById("review-anonymous");
  const reviewContactInfo = document.getElementById("review-contact-info");
  const reviewReporterName = document.getElementById("review-reporter-name");
  const reviewReporterEmail = document.getElementById("review-reporter-email");
  const reviewSendCopy = document.getElementById("review-send-copy");

  // Modal elements
  const termsModal = document.getElementById("terms-modal");
  const termsLink = document.getElementById("terms-link");
  const closeModal = document.querySelector(".close-modal");
  const acceptTerms = document.getElementById("accept-terms");
  const successModal = document.getElementById("success-modal");
  const successDetails = document.getElementById("success-details");
  const closeSuccess = document.getElementById("close-success");

  // Empfänger-Mapping
  const recipientEmails = {
    "liaison-teacher": "kramer.johann@gykl.lernsax.de",
    "school-counselor": "kramer.johann@gykl.lernsax.de",
    "social-worker": "kramer.johann@gykl.lernsax.de",
    principal: "kramer.johann@gykl.lernsax.de",
  };

  // EmailJS initialisieren
  emailjs.init("BmhT-PwUHoiHBZghr");

  // --- Form Steps Navigation ---
  toStep2Btn.addEventListener("click", function () {
    if (validateStep1()) {
      step1.style.display = "none";
      step2.style.display = "block";
      step1Indicator.classList.add("completed");
      step2Indicator.classList.add("active");
      window.scrollTo(0, 0);
    }
  });

  backToStep1Btn.addEventListener("click", function () {
    step2.style.display = "none";
    step1.style.display = "block";
    step2Indicator.classList.remove("active");
    window.scrollTo(0, 0);
  });

  toStep3Btn.addEventListener("click", function () {
    if (validateStep2()) {
      step2.style.display = "none";
      step3.style.display = "block";
      step2Indicator.classList.add("completed");
      step3Indicator.classList.add("active");
      window.scrollTo(0, 0);
    }
  });

  backToStep2Btn.addEventListener("click", function () {
    step3.style.display = "none";
    step2.style.display = "block";
    step3Indicator.classList.remove("active");
    window.scrollTo(0, 0);
  });

  toStep4Btn.addEventListener("click", function () {
    if (validateStep3()) {
      updateReviewSection();
      step3.style.display = "none";
      step4.style.display = "block";
      step3Indicator.classList.add("completed");
      step4Indicator.classList.add("active");
      window.scrollTo(0, 0);
    }
  });

  backToStep3Btn.addEventListener("click", function () {
    step4.style.display = "none";
    step3.style.display = "block";
    step4Indicator.classList.remove("active");
    window.scrollTo(0, 0);
  });

  // --- Formularelemente ---
  incidentType.addEventListener("change", function () {
    if (this.value === "other") {
      otherTypeContainer.style.display = "block";
      otherType.setAttribute("required", "");
    } else {
      otherTypeContainer.style.display = "none";
      otherType.removeAttribute("required");
    }
  });

  fileUpload.addEventListener("change", function () {
    fileNames.innerHTML = "";
    if (this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        if (file.size > 5 * 1024 * 1024) {
          alert(`File "${file.name}" exceeds the 5MB size limit.`);
          continue;
        }
        const validTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (!validTypes.includes(file.type)) {
          alert(
            `File "${file.name}" is not a supported format. Please use JPG, PNG, or PDF.`
          );
          continue;
        }
        const fileElement = document.createElement("div");
        fileElement.className = "file-name";
        fileElement.innerHTML = `
            <i class="fas ${getFileIcon(file.type)}"></i> 
            ${file.name} 
            <span class="remove-file" data-index="${i}">
                <i class="fas fa-times-circle"></i>
            </span>
          `;
        fileNames.appendChild(fileElement);
      }
      document.querySelectorAll(".remove-file").forEach((button) => {
        button.addEventListener("click", function () {
          fileUpload.value = "";
          fileNames.innerHTML = "";
        });
      });
    }
  });

  anonymousToggle.addEventListener("change", function () {
    if (this.checked) {
      toggleStatus.textContent = "Yes";
      contactFields.style.display = "none";
      reporterName.removeAttribute("required");
      reporterEmail.removeAttribute("required");
    } else {
      toggleStatus.textContent = "No";
      contactFields.style.display = "block";
      reporterName.setAttribute("required", "");
      reporterEmail.setAttribute("required", "");
    }
  });

  // --- Modal Handling ---
  termsLink.addEventListener("click", function (e) {
    e.preventDefault();
    termsModal.style.display = "flex";
  });

  closeModal.addEventListener("click", function () {
    termsModal.style.display = "none";
  });

  acceptTerms.addEventListener("click", function () {
    termsAgreement.checked = true;
    termsModal.style.display = "none";
  });

  window.addEventListener("click", function (e) {
    if (e.target === termsModal) {
      termsModal.style.display = "none";
    }
    if (e.target === successModal) {
      successModal.style.display = "none";
      resetForm();
    }
  });

  closeSuccess.addEventListener("click", function () {
    successModal.style.display = "none";
    resetForm();
  });

  // --- Form Submission ---
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!termsAgreement.checked) {
      alert("You must agree to the terms and conditions to submit the report.");
      return;
    }

    const recipientValue = recipient.value;
    const recipientEmail = recipientEmails[recipientValue];

    if (!recipientEmail) {
      alert("Please select a valid recipient.");
      return;
    }

    const formData = {
      incident_type:
        incidentType.value === "other"
          ? otherType.value
          : incidentType.options[incidentType.selectedIndex].text,
      recipient_email: recipientEmail,
      incident_date: incidentDate.value,
      incident_location: incidentLocation.value,
      incident_description: incidentDescription.value,
      reporter_name: anonymousToggle.checked ? "Anonymous" : reporterName.value,
      reporter_email: anonymousToggle.checked
        ? "Anonymous"
        : reporterEmail.value,
      send_copy: sendCopy.checked ? "Yes" : "No",
    };

    console.log(formData);
    emailjs.send("service_766sama", "template_pjl3ijd", formData).then(
      function (response) {
        successDetails.textContent = anonymousToggle.checked
          ? "Ihre Meldung wurde anonym versendet."
          : "Ihre Meldung wurde erfolgreich versendet.";
        successModal.style.display = "flex";
      },
      function (error) {
        alert("There was an error sending your report. Please try again.");
      }
    );
  });

  // --- Hilfsfunktionen ---
  function validateStep1() {
    let isValid = true;
    if (!incidentType.value) {
      markInvalid(incidentType, "Please select an incident type");
      isValid = false;
    } else {
      markValid(incidentType);
    }
    if (incidentType.value === "other" && !otherType.value.trim()) {
      markInvalid(otherType, "Please specify the incident type");
      isValid = false;
    } else if (incidentType.value === "other") {
      markValid(otherType);
    }
    if (!recipient.value) {
      markInvalid(recipient, "Please select a recipient");
      isValid = false;
    } else {
      markValid(recipient);
    }
    return isValid;
  }

  function validateStep2() {
    let isValid = true;
    if (!incidentDate.value) {
      markInvalid(incidentDate, "Please select a date");
      isValid = false;
    } else {
      markValid(incidentDate);
    }
    if (!incidentLocation.value.trim()) {
      markInvalid(incidentLocation, "Please enter a location");
      isValid = false;
    } else {
      markValid(incidentLocation);
    }
    if (!incidentDescription.value.trim()) {
      markInvalid(incidentDescription, "Please provide a description");
      isValid = false;
    } else {
      markValid(incidentDescription);
    }
    return isValid;
  }

  function validateStep3() {
    let isValid = true;
    if (!anonymousToggle.checked) {
      if (!reporterName.value.trim()) {
        markInvalid(reporterName, "Please enter your name");
        isValid = false;
      } else {
        markValid(reporterName);
      }
      if (!reporterEmail.value.trim()) {
        markInvalid(reporterEmail, "Please enter your email");
        isValid = false;
      } else if (!validateEmail(reporterEmail.value)) {
        markInvalid(
          reporterEmail,
          "Please enter a valid @gykl.lernsax.de email address"
        );
        isValid = false;
      } else {
        markValid(reporterEmail);
      }
    }
    return isValid;
  }

  function validateEmail(email) {
    const regex = /@gykl\.lernsax\.de$/;
    return regex.test(email);
  }

  function markInvalid(element, message) {
    const formGroup = element.closest(".form-group");
    formGroup.classList.add("error");
    let errorMessage = formGroup.querySelector(".error-message");
    if (!errorMessage) {
      errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      formGroup.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
    element.setAttribute("aria-invalid", "true");
  }

  function markValid(element) {
    const formGroup = element.closest(".form-group");
    formGroup.classList.remove("error");
    const errorMessage = formGroup.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
    element.setAttribute("aria-invalid", "false");
  }

  function updateReviewSection() {
    reviewIncidentType.textContent =
      incidentType.value === "other"
        ? otherType.value
        : incidentType.options[incidentType.selectedIndex].text;
    reviewRecipient.textContent =
      recipient.options[recipient.selectedIndex].text;
    reviewIncidentDate.textContent = formatDate(incidentDate.value);
    reviewIncidentLocation.textContent = incidentLocation.value;
    reviewIncidentDescription.textContent = incidentDescription.value;
    if (fileUpload.files.length > 0) {
      const fileList = Array.from(fileUpload.files)
        .map((file) => file.name)
        .join(", ");
      reviewAttachments.textContent = fileList;
    } else {
      reviewAttachments.textContent = "No files attached";
    }
    reviewAnonymous.textContent = anonymousToggle.checked ? "Yes" : "No";
    if (anonymousToggle.checked) {
      reviewContactInfo.style.display = "none";
    } else {
      reviewContactInfo.style.display = "block";
      reviewReporterName.textContent = reporterName.value;
      reviewReporterEmail.textContent = reporterEmail.value;
      reviewSendCopy.textContent = sendCopy.checked ? "Yes" : "No";
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  function getFileIcon(fileType) {
    if (fileType === "application/pdf") {
      return "fa-file-pdf";
    } else if (fileType.startsWith("image/")) {
      return "fa-file-image";
    } else {
      return "fa-file";
    }
  }

  function resetForm() {
    form.reset();
    fileNames.innerHTML = "";
    step4.style.display = "none";
    step3.style.display = "none";
    step2.style.display = "none";
    step1.style.display = "block";
    step2Indicator.classList.remove("active", "completed");
    step3Indicator.classList.remove("active", "completed");
    step4Indicator.classList.remove("active", "completed");
    step1Indicator.classList.add("active");
    step1Indicator.classList.remove("completed");
    otherTypeContainer.style.display = "none";
    contactFields.style.display = "block";
    toggleStatus.textContent = "No";
    document.querySelectorAll(".form-group.error").forEach((group) => {
      group.classList.remove("error");
      const errorMessage = group.querySelector(".error-message");
      if (errorMessage) {
        errorMessage.remove();
      }
    });
    reporterName.setAttribute("required", "");
    reporterEmail.setAttribute("required", "");
    otherType.removeAttribute("required");
    window.scrollTo(0, 0);
  }

  // Set max date for incident date to today
  const today = new Date().toISOString().split("T")[0];
  incidentDate.setAttribute("max", today);

  // Add accessibility attributes
  document.querySelectorAll(".form-step").forEach((step, index) => {
    step.setAttribute("aria-labelledby", `step-${index + 1}-indicator`);
  });
});
