document.addEventListener("DOMContentLoaded", function () {
    // Initialize Bootstrap tabs
    var tabElements = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabElements.forEach(function (tabElement) {
        new bootstrap.Tab(tabElement);
    });

    // Handle file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.addEventListener("change", function (e) {
            if (e.target.files.length > 0) {
                // Handle file upload here
                console.log("File selected:", e.target.files[0].name);
            }
        });
    }

    // Handle paid checkbox
    const paidCheck = document.getElementById("paidCheck");
    if (paidCheck) {
        paidCheck.addEventListener("change", function () {
            // Add any additional logic for when the checkbox changes
        });
    }
});
