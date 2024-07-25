$(document).ready(function () {
    $('#example').DataTable({
        responsive: true,
        dom: 'Bfrtip',
        lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "All"]],
        paging: true,
        searching: true,
        ordering: true,

        language: {
            search: "",
            searchPlaceholder: "Search Table.....",
            lengthMenu: "Rows _MENU_",
            info: "Rows _START_ / _END_ | _TOTAL_",
            infoEmpty: "Rows 0 / 0 | 0",
            infoFiltered: "", //(filtered from _MAX_ total records)
            zeroRecords: "No matching records found",
            paginate: {
                "next": ">",
                "previous": "<"
            }
        },
        buttons: [
            {
                extend: 'pdf',
                className: 'dt-button'
            },
            {
                extend: 'csv',
                className: 'dt-button'
            },
            {
                extend: 'excel',
                className: 'dt-button'
            },
        ],
    });
});