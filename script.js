document.addEventListener("DOMContentLoaded", () => {
  loadLaborList();
  initMap();
  document.getElementById("search-bar").addEventListener("input", filterLabor);
});

// Load workers dynamically
function loadLaborList() {
  const laborContainer = document.getElementById("labor-container");
  const workers = [
    {
      name: "John Doe",
      skill: "Electrician",
      location: "Delhi",
      availability: "Morning",
    },
    {
      name: "Jane Smith",
      skill: "Plumber",
      location: "Mumbai",
      availability: "Afternoon",
    },
    {
      name: "Michael Johnson",
      skill: "Carpenter",
      location: "Chennai",
      availability: "Evening",
    },
  ];

  laborContainer.innerHTML = "";
  workers.forEach((worker) => {
    const workerCard = document.createElement("div");
    workerCard.classList.add("worker-card");
    workerCard.innerHTML = `
            <h3>${worker.name}</h3>
            <p><strong>Skill:</strong> ${worker.skill}</p>
            <p><strong>Location:</strong> ${worker.location}</p>
            <p><strong>Availability:</strong> ${worker.availability}</p>
        `;
    laborContainer.appendChild(workerCard);
  });
}

// Filter workers dynamically
function filterLabor() {
  const searchValue = document.getElementById("search-bar").value.toLowerCase();
  const workers = document.querySelectorAll(".worker-card");

  workers.forEach((worker) => {
    const workerText = worker.innerText.toLowerCase();
    worker.style.display = workerText.includes(searchValue) ? "block" : "none";
  });
}

// Initialize Leaflet.js map
function initMap() {
  const map = L.map("map").setView([20.5937, 78.9629], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const workers = [
    { name: "John Doe", coords: [28.7041, 77.1025] },
    { name: "Jane Smith", coords: [19.076, 72.8777] },
    { name: "Michael Johnson", coords: [13.0827, 80.2707] },
  ];

  workers.forEach((worker) => {
    L.marker(worker.coords)
      .addTo(map)
      .bindPopup(
        `<strong>${worker.name}</strong><br>Location: ${worker.coords[0]}, ${worker.coords[1]}`
      )
      .openPopup();
  });
}
