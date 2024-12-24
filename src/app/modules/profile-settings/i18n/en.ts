export const locale = {
    lang: 'en',
    data: {
        save: "Save",
        profile_info: {
            title: "My profile",
            desc: "Manage and edit your account details",
            form: {
                labels: {
                    name: "Name",
                    phone: "Phone number",
                    email: "E-mail",
                    first_name:"First name",
                    last_name:"Last name"
                },
                messages: {
                    name: "Please enter name",
                    name_pattern:"name must not contain spaces",
                    first_name: "Please enter first name",
                    last_name: "Please enter last name",
                    phone: "Please enter phone",
                    email: "Please enter email",
                    Email_must_be_valid: 'Email must be a valid email address',

                }
            }
        },
        change_password: {
            title: "Change password",
            desc: "Manage and edit your password",
            form: {
                labels: {
                    old_password: "Old password",
                    new_password: "New password",
                    confirm_new_password: "Confirm new password"
                },
                messages: {
                    confirm_password: "New password and confirm new password is not match",
                    pattern_password:
                        'Password must contain more than 8 characters, 1 lowercase letter (a-z), 1 uppercase letter (A-Z), and 1 special character @,#,&',
                    Expattern_password: 'ex:( asd123ASD@@ )',
                    old_password_required: "Please enter old password",
                    new_password_required: "Please enter new password",
                    confirm_new_password_requires: "Please enter confirm new password"
                }
            }
        }
    }
}