document.addEventListener("DOMContentLoaded", function () {
    const contentDiv = document.getElementById("content");

    // Submenu Toggle
    const menuItems = document.querySelectorAll(".has-submenu");
    menuItems.forEach((item) => {
        const link = item.querySelector("a");
        link.addEventListener("click", function (e) {
            e.preventDefault();

            // Close all other submenus
            menuItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove("open");
                }
            });

            // Toggle the clicked submenu
            item.classList.toggle("open");
        });
    });

    // Navigation handling
    const navLinks = document.querySelectorAll(".dropdown-link");
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach((l) => l.classList.remove("active"));

            // Add active class to clicked link
            this.classList.add("active");

            // Load the corresponding section
            const targetSection = this.getAttribute("data-section");
            const targetCategory = this.getAttribute("data-category"); // القسم الرئيسي (مثل "sales")

            if (targetSection && targetCategory) {
                // Save the current section and category to localStorage
                localStorage.setItem("currentCategory", targetCategory);
                localStorage.setItem("currentSection", targetSection);

                // Load the section
                loadSection(targetCategory, targetSection);
            }
        });
    });

    // Date filter buttons
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            filterBtns.forEach((b) => b.classList.remove("active"));
            this.classList.add("active");
            updateCharts(this.textContent.trim());
        });
    });

    // Load the saved section or default to dashboard
    const savedCategory =
        localStorage.getItem("currentCategory") || "dashboard";
    const savedSection = localStorage.getItem("currentSection") || "dashboard";
    loadSection(savedCategory, savedSection);

    // Initialize charts
    initializeCharts();
});

// Function to load sections dynamically
function loadSection(category, section) {
    const contentDiv = document.getElementById("content");

    // Fetch the HTML content from the corresponding file
    fetch(`sections/${category}/${section}.html`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Section not found");
            }
            return response.text();
        })
        .then((data) => {
            contentDiv.innerHTML = data;

            // Reinitialize charts if the loaded section contains charts
            if (section === "dashboard") {
                initializeCharts();
            }

            // Highlight the active link in the sidebar
            highlightActiveLink(category, section);
        })
        .catch((error) => {
            console.error("Error loading section:", error);
            contentDiv.innerHTML = `<p>Error loading section: ${error.message}</p>`;
        });
}

// Function to highlight the active link in the sidebar
function highlightActiveLink(category, section) {
    const navLinks = document.querySelectorAll(".dropdown-link");
    navLinks.forEach((link) => {
        link.classList.remove("active");

        const linkCategory = link.getAttribute("data-category");
        const linkSection = link.getAttribute("data-section");

        if (linkCategory === category && linkSection === section) {
            link.classList.add("active");
        }
    });
}

function initializeCharts() {
    // Sales Chart
    const salesCtx = document.getElementById("salesChart");
    if (salesCtx) {
        new Chart(salesCtx, {
            type: "line",
            data: {
                labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
                datasets: [
                    {
                        label: "المبيعات",
                        data: [12000, 19000, 15000, 25000, 22000, 30000],
                        borderColor: "#2563eb",
                        tension: 0.4,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "تحليل المبيعات الشهرية",
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }

    // Products Distribution Chart
    const productsCtx = document.getElementById("productsPieChart");
    if (productsCtx) {
        new Chart(productsCtx, {
            type: "doughnut",
            data: {
                labels: ["منتج 1", "منتج 2", "منتج 3", "منتج 4"],
                datasets: [
                    {
                        data: [30, 25, 25, 20],
                        backgroundColor: [
                            "#2563eb",
                            "#3b82f6",
                            "#60a5fa",
                            "#93c5fd",
                        ],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                },
            },
        });
    }

    // Customers Distribution Chart
    const customersCtx = document.getElementById("customersPieChart");
    if (customersCtx) {
        new Chart(customersCtx, {
            type: "pie",
            data: {
                labels: ["عملاء جدد", "عملاء حاليون", "عملاء متكررون"],
                datasets: [
                    {
                        data: [30, 50, 20],
                        backgroundColor: ["#10b981", "#2563eb", "#f59e0b"],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                },
            },
        });
    }
}

function updateCharts(period) {
    // This function would update the charts based on the selected time period
    console.log(`Updating charts for period: ${period}`);
    // In a real application, you would fetch new data and update the charts
}
