function updateTimeAndDate() {
    const now = new Date();

    // تنسيق الوقت
    const time = now.toLocaleTimeString("ar-EG");
    document.getElementById("time").textContent = time;

    // التواريخ
    const options = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = now.toLocaleDateString("ar-EG", options);

    document.getElementById("current-date").textContent = currentDate;
}

// استدعاء الدالة كل ثانية لتحديث الوقت
setInterval(updateTimeAndDate, 1000);
updateTimeAndDate(); // تحديث أولي عند تحميل الصفحة
