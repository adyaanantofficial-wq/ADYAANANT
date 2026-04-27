(function () {
    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    }

    function initCountdown(root) {
        const display = root.querySelector("[data-countdown-display]") || root;
        let remaining = Number(root.getAttribute("data-countdown-seconds")) || 600;

        function render() {
            display.textContent = formatTime(Math.max(remaining, 0));
            root.setAttribute("data-countdown-state", remaining > 0 ? "running" : "ended");
        }

        render();

        if (remaining <= 0) {
            return;
        }

        const timer = window.setInterval(function () {
            remaining -= 1;

            if (remaining <= 0) {
                remaining = 0;
                render();
                window.clearInterval(timer);
                return;
            }

            render();
        }, 1000);
    }

    function initProductDetailTimers() {
        document.querySelectorAll("[data-countdown-seconds]").forEach(initCountdown);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initProductDetailTimers);
    } else {
        initProductDetailTimers();
    }
}());
