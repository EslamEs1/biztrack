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



// دالة لإضافة حقل جديد فى اضافة دورات شهرية 
function addNewField() {
    const container = document.getElementById('time-of-sending-fields');

    // إنشاء الحقل الجديد
    const newField = document.createElement('div');
    newField.classList.add('row', 'mb-3');

    newField.innerHTML = `
        <div class="col-md-6">
            <div class="form-group">
                <select class="form-control">
                    <option selected disabled>اختر متى</option>
                    <option>فى تاريخ الاصدار</option>
                    <option>فى تاريخ الفاتورة</option>
                    <option>فى تاريخ الاستحقاق</option>
                    <option>قبل ميعاد الفاتورة (عدد أيام)</option>
                    <option>بعد ميعاد الفاتورة (عدد أيام)</option>
                </select>
            </div>
        </div>
        <div class="col-md-6">
            <button class="btn btn-icon text-danger" onclick="removeField(this)">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `;

    // إضافة الحقل الجديد إلى القسم
    container.appendChild(newField);
}

// دالة لحذف الحقل
function removeField(button) {
    const fieldRow = button.closest('.row');
    fieldRow.remove();
}
