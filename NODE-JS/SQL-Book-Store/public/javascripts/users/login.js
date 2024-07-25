$('form').submit(function (event) {
    event.preventDefault();

    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    if (!email) {
        return Toast.fire({
            icon: "warning",
            title: "Email Field is Required"
        });
    };

    if (!password) {
        return Toast.fire({
            icon: "warning",
            title: "Password Field is Required"
        });
    };

    $.ajax({
        type: "POST",
        url: "/login",
        data: {
            email: email.toLowerCase(),
            password: password
        },
        success: function (response) {
            if (response?.success) {
                window.location.href = '/';
                Toast.fire({
                    icon: "success",
                    title: "Successfully LoggedIn"
                });
            } else if (response?.validation) {
                Toast.fire({
                    icon: "warning",
                    title: response.validation
                });
            }
        },
        error: function (error) {
            Toast.fire({
                icon: "error",
                title: error.message
            });
        }
    });
});