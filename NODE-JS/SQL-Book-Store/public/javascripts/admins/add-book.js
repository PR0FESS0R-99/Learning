
$(document).ready(function () {
    $('form').on('submit', function (event) {
        event.preventDefault();

        const book_title = $('#bookTitle').val();
        const author_name = $('#authorName').val();
        const price = $('#price').val();
        const description = $('#description').val();
        const image = $('#imageUpload').val();

        if (!book_title) {
            return Toast.fire({
                icon: "warning",
                title: "Book Title Field is Required"
            });
        };

        if (!author_name) {
            return Toast.fire({
                icon: "warning",
                title: "Author Name Field is Required"
            });
        };

        if (!price) {
            return Toast.fire({
                icon: "warning",
                title: "Price Field is Required"
            });
        };

        if (!Number(price)) {
            return Toast.fire({
                icon: "warning",
                title: "Invalid Price"
            });
        };

        if (!description) {
            return Toast.fire({
                icon: "warning",
                title: "Description Field is Required"
            });
        };

        if (description.length < 10) {
            return Toast.fire({
                icon: "warning",
                title: "Description Should Have Minimum 15 Letters"
            });
        };


        if (!image) {
            return Toast.fire({
                icon: "warning",
                title: "Image Field is Required"
            });
        };

        const formData = new FormData();

        formData.append('book_title', book_title);
        formData.append('author_name', author_name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', $('#imageUpload')[0].files[0]);

        $.ajax({
            type: 'POST',
            url: '/admin/add-book',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response?.success) {
                    Toast.fire({
                        icon: "success",
                        title: "Successfully added new book"
                    });
                    window.location.href = '/admin/books-list';
                } else if (response?.validation) {
                    Toast.fire({
                        icon: "warning",
                        title: response?.validation
                    });
                } 
            },
            error: function (error) {
                console.log(error);
                Toast.fire({
                    icon: "error",
                    title: error.responseJSON.error.message
                });
            }
        });
    });
});