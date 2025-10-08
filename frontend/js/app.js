/* ==========================
   GrantFinder AI - Frontend JS
   Handles UI events, API calls, and Google/OpenAI hooks
   ========================== */

document.addEventListener("DOMContentLoaded", () => {
  console.log("GrantFinder AI frontend initialized ✅");

  // Elements
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchQuery");
  const resultsContainer = document.getElementById("results");
  const approveButton = document.getElementById("approveSelected");
  const generateDraftsButton = document.getElementById("generateDrafts");
  const statusAlert = document.getElementById("statusAlert");

  // ✅ Sample placeholder opportunities (replace with API search)
  let opportunities = [
    { id: 1, title: "Community Impact Grant", agency: "ABC Foundation", deadline: "2025-12-31" },
    { id: 2, title: "Youth Empowerment RFP", agency: "XYZ Org", deadline: "2025-11-15" },
    { id: 3, title: "Tech for Good Grant", agency: "Innovation Fund", deadline: "2025-10-30" }
  ];

  // ==========================
  // Search Functionality
  // ==========================
  searchForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    const filtered = opportunities.filter(o =>
      o.title.toLowerCase().includes(query) ||
      o.agency.toLowerCase().includes(query)
    );
    renderResults(filtered);
  });

  // ==========================
  // Render Search Results
  // ==========================
  function renderResults(list) {
    resultsContainer.innerHTML = "";
    if (list.length === 0) {
      resultsContainer.innerHTML = `<p>No results found.</p>`;
      return;
    }

    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Select</th>
          <th>Title</th>
          <th>Agency</th>
          <th>Deadline</th>
        </tr>
      </thead>
      <tbody>
        ${list.map(item => `
          <tr>
            <td><input type="checkbox" class="opportunity-checkbox" data-id="${item.id}"></td>
            <td>${item.title}</td>
            <td>${item.agency}</td>
            <td>${item.deadline}</td>
          </tr>
        `).join("")}
      </tbody>
    `;
    resultsContainer.appendChild(table);
  }

  // Initial render
  renderResults(opportunities);

  // ==========================
  // Approve & Send to Google Sheets (Backend Hook)
  // ==========================
  approveButton?.addEventListener("click", async () => {
    const selectedIds = [...document.querySelectorAll(".opportunity-checkbox:checked")]
      .map(cb => parseInt(cb.dataset.id));
    const selectedItems = opportunities.filter(o => selectedIds.includes(o.id));

    if (selectedItems.length === 0) {
      showAlert("Please select at least one opportunity to approve.", "warning");
      return;
    }

    try {
      // Send to backend for Google Sheets + Email
      const res = await fetch("/api/save-to-sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunities: selectedItems })
      });

      if (res.ok) {
        showAlert("Approved opportunities saved to Google Sheet and emailed ✅", "success");
      } else {
        showAlert("Failed to save to Google Sheet ❌", "error");
      }
    } catch (err) {
      console.error(err);
      showAlert("Error connecting to backend.", "error");
    }
  });

  // ==========================
  // Generate Drafts (Backend Hook)
  // ==========================
  generateDraftsButton?.addEventListener("click", async () => {
    try {
      const res = await fetch("/api/generate-drafts", { method: "POST" });
      if (res.ok) {
        showAlert("5 grant/RFP drafts generated and emailed ✅", "success");
      } else {
        showAlert("Failed to generate drafts ❌", "error");
      }
    } catch (err) {
      console.error(err);
      showAlert("Error generating drafts.", "error");
    }
  });

  // ==========================
  // Utility: Alert Box
  // ==========================
  function showAlert(message, type = "info") {
    if (!statusAlert) return;
    let color = "#e2e8f0";
    if (type === "success") color = "#bbf7d0";       // green-200
    if (type === "error") color = "#fecaca";         // red-200
    if (type === "warning") color = "#fde68a";       // amber-200

    statusAlert.style.backgroundColor = color;
    statusAlert.textContent = message;
    statusAlert.style.display = "block";

    setTimeout(() => {
      statusAlert.style.display = "none";
    }, 4000);
  }

});
