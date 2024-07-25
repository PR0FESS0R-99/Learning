$(document).ready(function () {
    $('#example').DataTable({
        responsive: true,
        paging: false,
        searching: true,
        ordering: false,

        language: {
            search: "",
            searchPlaceholder: "Search Table.....",
            lengthMenu: "Rows _MENU_",
            info: "Rows _START_ / _END_ | _TOTAL_",
            infoEmpty: "Rows 0 / 0 | 0",
            infoFiltered: "",
            zeroRecords: "No matching records found",
            paginate: {
                "next": ">",
                "previous": "<"
            }
        },
       
    });
});