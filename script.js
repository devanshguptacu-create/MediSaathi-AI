
document.addEventListener("DOMContentLoaded", () => {
  // 1. Sidebar and dashboard navigation
  document.querySelectorAll("[data-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.target);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        document.querySelectorAll(".nav-item").forEach((item) => {
          item.classList.toggle("active", item === button);
        });
      }
    });
  });

  // 2. Get the HTML elements
  const fileInput = document.getElementById("fileInput");
  const uploadMessage = document.getElementById("uploadMessage");
  const readerPanel = document.getElementById("readerPanel");
  const readerStatus = document.getElementById("readerStatus");
  const extractBtn = document.getElementById("extractBtn");
  const pdfText = document.getElementById("pdfText");

  let selectedPdf = null;

  if (!fileInput || !uploadMessage) return;

  // 3. Validate the selected file
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png"
    ];

    if (!allowedTypes.includes(file.type)) {
      uploadMessage.textContent =
        "Choose a PDF, JPG or PNG file. / PDF, JPG या PNG चुनें।";
      fileInput.value = "";
      selectedPdf = null;
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      uploadMessage.textContent =
        "File exceeds 10 MB. / फ़ाइल 10 MB से बड़ी है।";
      fileInput.value = "";
      selectedPdf = null;
      return;
    }

    selectedPdf = file.type === "application/pdf" ? file : null;

    uploadMessage.textContent =
      `Selected: ${file.name}. / फ़ाइल चुनी गई।`;

    if (readerPanel) {
      readerPanel.hidden = false;

      if (pdfText) pdfText.value = "";

      if (selectedPdf) {
        readerStatus.textContent =
          "PDF selected. Click Extract text. / PDF चुनी गई। टेक्स्ट निकालें पर क्लिक करें।";
        extractBtn.disabled = false;
      } else {
        readerStatus.textContent =
          "Image OCR is not available yet. / इमेज टेक्स्ट रीडर अभी उपलब्ध नहीं है।";
        extractBtn.disabled = true;
      }
    }
  });

  // 4. Extract text from a PDF in the browser
  if (extractBtn) {
    extractBtn.addEventListener("click", async () => {
      if (!selectedPdf) {
        readerStatus.textContent =
          "Please select a PDF first. / पहले PDF चुनें।";
        return;
      }

      if (!window.pdfjsLib) {
        readerStatus.textContent =
          "PDF library not loaded. Check internet and refresh. / PDF लाइब्रेरी लोड नहीं हुई। इंटरनेट जाँचकर रीफ़्रेश करें।";
        return;
      }

      extractBtn.disabled = true;
      readerStatus.textContent =
        "Reading PDF... / PDF पढ़ी जा रही है...";
      pdfText.value = "";

      try {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        const buffer = await selectedPdf.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({
          data: new Uint8Array(buffer)
        }).promise;

        const pages = [];

        for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
          const page = await pdf.getPage(pageNo);
          const content = await page.getTextContent();

          const pageContent = content.items
            .map((item) => item.str || "")
            .join(" ");

          pages.push(`--- Page ${pageNo} ---\n${pageContent}`);
        }

        const extractedText = pages.join("\n\n").trim();

        if (!extractedText) {
          readerStatus.textContent =
            "No selectable text found. This may be a scanned PDF; OCR is needed. / टेक्स्ट नहीं मिला। स्कैन की गई PDF के लिए OCR चाहिए।";
        } else {
          pdfText.value = extractedText;
          readerStatus.textContent =
            `Text extracted from ${pdf.numPages} page(s). / ${pdf.numPages} पेज से टेक्स्ट निकाला गया।`;
        }
      } catch (error) {
        console.error("PDF extraction error:", error);
        readerStatus.textContent =
          "Could not read this PDF. Try another file. / PDF नहीं पढ़ी जा सकी। दूसरी फ़ाइल आज़माएँ।";
      } finally {
        extractBtn.disabled = false;
      }
    });
  }
});
