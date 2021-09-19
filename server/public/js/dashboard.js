$(document).ready(function () {
    $("table.display").DataTable({
        lengthMenu: [
            [5, 10, 15, -1],
            [5, 10, 15, "All"],
        ], // Show __ entries dropdown
        aaSorting: [], // Disables automatic sorting on page load
    });
});

/* global bootstrap: false */
(function () {
    "use strict";
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
})();

// $(window).load(function () {
//     //Do the code in the {}s when the window has loaded
//     $("#loader").fadeOut("fast"); //Fade out the #loader div
// });
