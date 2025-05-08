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
  const otherIncidentTypeContainer = document.getElementById(
    "other-incident-type-container"
  );
  const otherIncidentType = document.getElementById("other-incident-type");
  const otherRecipientContainer = document.getElementById(
    "other-recipient-container"
  );
  const otherRecipient = document.getElementById("other-recipient");
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
    principal: "kramer.johann@gykl.lernsax.de",
    principal2: "kramer.johann@gykl.lernsax.de",
    "social-worker": "kramer.johann@gykl.lernsax.de",
    "trust-teacher": "kramer.johann@gykl.lernsax.de",
  };

  const darkmodeToggle = document.getElementById("darkmode-toggle");

  // Beim ersten Laden: Geräteeinstellung prüfen, falls noch nichts gespeichert
  if (localStorage.getItem("darkmode") === null) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.body.classList.add("darkmode");
      localStorage.setItem("darkmode", "true");
    }
  }

  // Beim Laden gespeicherten Modus anwenden
  if (localStorage.getItem("darkmode") === "true") {
    document.body.classList.add("darkmode");
  } else {
    document.body.classList.remove("darkmode");
  }

  darkmodeToggle.addEventListener("click", function () {
    document.body.classList.toggle("darkmode");
    localStorage.setItem(
      "darkmode",
      document.body.classList.contains("darkmode")
    );
  });

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

  function updatePrintButtonListener() {
    const printBtn = document.getElementById("print-summary");
    if (printBtn) {
      printBtn.onclick = () => window.print();
    }
  }

  toStep4Btn.addEventListener("click", function () {
    if (validateStep3()) {
      updateReviewSection();
      step3.style.display = "none";
      step4.style.display = "block";
      step3Indicator.classList.add("completed");
      step4Indicator.classList.add("active");
      window.scrollTo(0, 0);
      updatePrintButtonListener();
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
      otherIncidentTypeContainer.style.display = "block";
      otherIncidentType.setAttribute("required", "");
    } else {
      otherIncidentTypeContainer.style.display = "none";
      otherIncidentType.removeAttribute("required");
    }
  });

  // Empfänger "Andere Person"
  recipient.addEventListener("change", function () {
    if (this.value === "other") {
      otherRecipientContainer.style.display = "block";
      otherRecipient.setAttribute("required", "");
    } else {
      otherRecipientContainer.style.display = "none";
      otherRecipient.removeAttribute("required");
    }
  });

  fileUpload.addEventListener("change", function () {
    fileNames.innerHTML = "";
    if (this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        if (file.size > 5 * 1024 * 1024) {
          alert(`Datei "${file.name}" überschreitet das Limit von 5 MB.`);
          continue;
        }
        const validTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (!validTypes.includes(file.type)) {
          alert(
            `Datei "${file.name}" wird nicht unterstützt. Bitte verwenden sie PNG, JPG oder PDF.`
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
      toggleStatus.textContent = "Ja";
      contactFields.style.display = "none";
      reporterName.removeAttribute("required");
      reporterEmail.removeAttribute("required");
    } else {
      toggleStatus.textContent = "Nein";
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
      alert(
        "Um die Meldung einzureichen, müssen Sie den Nutzungsbedingungen zustimmen."
      );
      return;
    }

    const recipientValue = recipient.value;
    let recipientEmail = recipientEmails[recipientValue];
    if (recipientValue === "other") {
      recipientEmail = otherRecipient.value;
    }

    if (!recipientEmail) {
      alert("Bitte wählen Sie einen gültigen Empfänger.");
      return;
    }

    const formData = {
      incident_type:
        incidentType.value === "other"
          ? otherIncidentType.value
          : incidentType.options[incidentType.selectedIndex].text,
      recipient_email:
        recipient.value === "other"
          ? otherRecipient.value
          : recipientEmails[recipient.value],
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
        alert(
          "Beim Senden Ihrer Meldung ist ein Fehler aufgetreten: " + error.text
        );
      }
    );
  });

  // --- Hilfsfunktionen ---
  function validateStep1() {
    let isValid = true;
    if (!incidentType.value) {
      markInvalid(incidentType, "Bitte wählen Sie einen Vorfallstyp aus");
      isValid = false;
    } else {
      markValid(incidentType);
    }
    if (incidentType.value === "other" && !otherIncidentType.value.trim()) {
      markInvalid(
        otherIncidentType,
        "Bitte geben Sie die Art des Ereignisses an"
      );
      isValid = false;
    } else if (incidentType.value === "other") {
      markValid(otherIncidentType);
    }
    if (
      recipient.value === "other" &&
      !validateAnyEmail(otherRecipient.value)
    ) {
      markInvalid(
        otherRecipient,
        "Bitte geben Sie eine gültige E-Mail-Adresse an"
      );
      isValid = false;
    } else if (recipient.value === "other" && !otherRecipient.value.trim()) {
      markInvalid(
        otherRecipient,
        "Bitte geben Sie die E-Mail-Adresse des Empfängers an"
      );
      isValid = false;
    } else {
      markValid(recipient);
    }
    return isValid;
    function validateAnyEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  }

  function validateStep2() {
    let isValid = true;
    if (!incidentDate.value) {
      markInvalid(incidentDate, "Bitte wählen Sie ein gültiges Datum");
      isValid = false;
    } else if (new Date(incidentDate.value) > new Date()) {
      markInvalid(incidentDate, "Das Datum darf nicht in der Zukunft liegen");
      isValid = false;
    } else {
      markValid(incidentDate);
    }
    if (!incidentDescription.value.trim()) {
      markInvalid(
        incidentDescription,
        "Bitte geben Sie eine Beschreibung des Vorfalls an"
      );
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
        markInvalid(reporterName, "Bitte geben Sie Ihren Namen an");
        isValid = false;
      } else {
        markValid(reporterName);
      }
      if (!reporterEmail.value.trim()) {
        markInvalid(reporterEmail, "Bitte geben Sie Ihre E-Mail-Adresse ein");
        isValid = false;
      } else if (!validateEmail(reporterEmail.value)) {
        markInvalid(
          reporterEmail,
          "Bitte geben Sie eine gültige @gykl.lernsax.de E-Mail-Adresse ein"
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
        ? otherIncidentType.value
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
      reviewAttachments.textContent = "Keine Anhänge hinzugefügt";
    }
    reviewAnonymous.textContent = anonymousToggle.checked ? "Ja" : "Nein";
    if (anonymousToggle.checked) {
      reviewContactInfo.style.display = "none";
    } else {
      reviewContactInfo.style.display = "block";
      reviewReporterName.textContent = reporterName.value;
      reviewReporterEmail.textContent = reporterEmail.value;
      reviewSendCopy.textContent = sendCopy.checked ? "Ja" : "Nein";
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
    otherIncidentTypeContainer.style.display = "none";
    otherRecipientContainer.style.display = "none";
    contactFields.style.display = "block";
    toggleStatus.textContent = "Nein";
    document.querySelectorAll(".form-group.error").forEach((group) => {
      group.classList.remove("error");
      const errorMessage = group.querySelector(".error-message");
      if (errorMessage) {
        errorMessage.remove();
      }
    });
    reporterName.setAttribute("required", "");
    reporterEmail.setAttribute("required", "");
    otherIncidentType.removeAttribute("required");
    otherRecipient.removeAttribute("required");
    window.scrollTo(0, 0);
  }

  // Set max date for incident date to today
  const today = new Date().toISOString().split("T")[0];
  incidentDate.setAttribute("max", today);

  // Add accessibility attributes
  document.querySelectorAll(".form-step").forEach((step, index) => {
    step.setAttribute("aria-labelledby", `step-${index + 1}-indicator`);
  });

  const pdfBtn = document.getElementById("pdf-summary");
  if (pdfBtn) {
    pdfBtn.addEventListener("click", function () {
      const reviewArea = document.querySelector(".review-print-area");
      if (!reviewArea) return;

      // html2canvas und jsPDF müssen global verfügbar sein!
      html2canvas(reviewArea, { backgroundColor: "#fff" }).then(function (
        canvas
      ) {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new window.jspdf.jsPDF({
          orientation: "p",
          unit: "mm",
          format: "a4",
        });

        // Größe berechnen
        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pageWidth;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("zusammenfassung.pdf");
      });
    });
  }
});

// Local Storage
form.addEventListener("input", function () {
  const data = {
    incidentType: incidentType.value,
    otherIncidentType: otherIncidentType.value,
    recipient: recipient.value,
    otherRecipient: otherRecipient.value,
    incidentDate: incidentDate.value,
    incidentLocation: incidentLocation.value,
    incidentDescription: incidentDescription.value,
    reporterName: reporterName.value,
    reporterEmail: reporterEmail.value,
    sendCopy: sendCopy.checked,
    anonymous: anonymousToggle.checked,
  };
  localStorage.setItem("fvuFormData", JSON.stringify(data));
});
// Load data from local storage
const saved = localStorage.getItem("fvuFormData");
if (saved) {
  const data = JSON.parse(saved);
  incidentType.value = data.incidentType || "";
  otherIncidentType.value = data.otherIncidentType || "";
  recipient.value = data.recipient || "";
  otherRecipient.value = data.otherRecipient || "";
  incidentDate.value = data.incidentDate || "";
  incidentLocation.value = data.incidentLocation || "";
  incidentDescription.value = data.incidentDescription || "";
  reporterName.value = data.reporterName || "";
  reporterEmail.value = data.reporterEmail || "";
  sendCopy.checked = !!data.sendCopy;
  anonymousToggle.checked = !!data.anonymous;
}
// Clear local storage on form submission
form.addEventListener("submit", function () {
  localStorage.removeItem("fvuFormData");
});

// Made by Johann Kramer
// 2025

const printBtn = document.getElementById("print-summary");
if (printBtn) {
  printBtn.addEventListener("click", function () {
    window.print();
  });
}
