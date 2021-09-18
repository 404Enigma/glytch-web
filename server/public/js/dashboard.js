$(document).ready(function () {
    $("table.display").DataTable({
        lengthMenu: [
            [5, 10, 15, -1],
            [5, 10, 15, "All"],
        ], // Show __ entries dropdown
        aaSorting: [], // Disables automatic sorting on page load
    });
});
