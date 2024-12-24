export const locale = {
    lang: 'ar',
    data: {
        login: {
            title: 'تسجيل دخول',
            forget_password: 'هل نسيت كلمة المرور?',
            NO_ACCOUNT: 'ليس لديك حساب',
            SIGN_UP: 'انشيء حساب',

            labels: {
                email: 'البريد الالكتروني',
                password: 'كلمة المرور',
                REMEMBER_ME: 'تذكرني',
            },
            messages: {
                Email_required: 'البريد الإلكتروني مطلوب',
                password_required: 'ادخل كلمه المرور',
                Email_must_be_valid:
                    'يجب أن يكون البريد الإلكتروني عنوان بريد إلكتروني صالحًا',
            },
        },
        register: {
            title: 'انشاء حساب',
            sign_up: 'تسجيل',
            HAVE_ACCOUNT: 'هل لديك حساب بالفعل',
            AGREE: 'اوافق على',
            TERMS: 'الشروط و الاحكام',
            labels: {
                username: 'اسم المستخدم',
                email: 'البريد الالكتروني',
                PHONE_NUMBER: 'رقم الهاتف',
                country: 'الدولة',
                city: 'المدينة',
                firstname:"الاسم الاول",
                lastname:"الاسم الاخير"
            },
            messages: {
                USERNAME: 'من فضلك ادخل إسم المستخدم',
                FIRSTNAME: 'من فضلك ادخل الاسم الاول',
                LASTNAME: 'من فضلك ادخل الاسم الاخير',
                username_minlength:
                    'اسم المستخدم يجب ان يكون على الاقل من 3 حروف',
                password_minlength:
                    'كلمة المرور يجب ان يكون على الاقل من 3 حروف',
                phone_required: 'رقم الهاتف مطلوب',
                phone_minlength: 'رقم الهاتف يجب ان يكون على الاقل من 9 حروف',
                username_pattern:"اسم المستخدم يجب الا يحتوي على مسافات"
            },
        },
        AUTH: {
            Email_required: 'البريد الإلكتروني مطلوب',
            password_required: 'ادخل كلمه المرور',
            Rememberme:"تذكرني",
            lostPassword:"فقدت كلمة المرور الخاصة بك ؟",
            Email_must_be_valid:
                'يجب أن يكون البريد الإلكتروني عنوان بريد إلكتروني صالحًا',
            REGISTER: 'تسجيل حساب',
            LOGIN: 'تسجل الدخول',
            LOGIN_TITLE: 'تسجيل دخول',
            SING_UP_TITLE: 'تسجيل',
            pattern_password:
                'يجب أن تحتوي كلمة المرور على أكثر من 8 أحرف وحرف واحد صغير (a-z) واحد كبير (A-Z) و 1 حرف خاص @,#,&',
            Expattern_password: 'مثال : ( asd123ASD@@ )',

            LABELS: {
                EMAIL: 'البريد الإلكتروني ',
                PASSWORD: 'كلمة المرور',
                COMPANY_NAME: 'اسم الشركة',
                URL: 'رابط موقعك',
                CONFIRM_PASSWORD: 'تأكيد كلمة المرور',
                PHONE_NUMBER: 'رقم الهاتف',
                NEW_PASSWORD: 'كلمة المرور الجديدة',
                REMEMBER_ME: 'تذكرني',
                USERNAME: 'إسم المستخدم',
                AGREE: 'أوافق على',
                TERMS: 'الشروط والأحكام وسياسة الخصوصية',
                bank_name:"اسم البنك",
                bank_number:"رقم حساب البنك",
                address:"العنوان"
            },
            PLACE_HOLDERS: {
                EMAIL: 'username@domain.com',
                PASSWORD: 'من فضلك ادخل كلمة المرور',
                COMPANY_NAME: 'من فضلك ادخل اسم الشركة',
                URL: 'www.example.com',
                CONFIRM_PASSWORD: 'تأكيد كلمة المرور',
                PHONE_NUMBER: 'رقم الهاتف',
                NEW_PASSWORD: 'كلمة المرور الجديدة',
                USERNAME: 'من فضلك ادخل إسم المستخدم',
                bank_name:"من فضلك ادخل اسم البنك",
                bank_number: 'من فضلك ادخل رقم حساب البنك',
                address: 'من فضلك ادخل العنوان',
            },
            MESSAGES: {
                NOT_EMAIL: 'username@domain.com',
                EMAIL: 'username@domain.com',
                PASSWORD_REQUIRED: 'برجاء ادخال كلمة المرور',
                PASSWORD_LEAST:
                    'كلمة المرور يجب ان يكون على الاقل 8 حروف او ارقام',
                PASSWORD_MATCH: 'كلمة المرور غير متطابقة',
                OLD_PASSWORD_REQUIRED: 'برجاء ادخال كلمة المرور القديمه',
                NEW_PASSWORD_REQUIRED: 'برجاء ادخال كلمة المرور الجديدة',
                CONFIRM_PASSWORD_REQUIRED:
                    'برجاء ادخال تأكيد كلمة المرور الجديدة',
                COMPANY_NAME_REQUIRED: 'برجاء ادخال اسم الشركة.!',
                COMPANY_NAME_LEAST: 'اسم الشركة يجب ان يكون على الأقل 3 أحرف',
                URL_REQUIRED: 'برجاء ادخال هذا الرابط',
                URL_PATTERN: 'www.example.com',
                PHONE_NUMBER_REQUIRED: 'برجاء ادخال رقم الهاتف',
                mobile_PHONE_NUMBER_REQUIRED: 'برجاء ادخال رقم الهاتف',
                PHONE_NUMBER_LEAST: "رقم الهاتف يجب ان يكون {{ number }} ارقام"
            },
            LINKS: {
                FORGET_PASSWORD: 'نسيت كلمة المرور',
                NO_ACCOUNT: 'ليس لديك حساب',
                SIGN_UP: 'انشيء حساب',
                HAVE_ACCOUNT: 'هل لديك حساب بالفعل',
                LOGIN: 'تسجيل دخول',
                BACK_TO: 'الرجوع الى',
            },
            CONTENT: {
                TITLE: 'easily and effectively',
                SUB_TITLE: 'Own your online store in minutes',
                RESET_PASSWORD: {
                    SEND_EMAIL: {
                        TITLE: 'اعادة ضبط كلمة المرور',
                        SUB_TITLE:
                            'الرجاء إدخال عنوان بريدك الإلكتروني حتى نتمكن من مراسلتك',
                        SUB_TITLE2: 'رابط إعادة تعيين كلمة المرور.',
                    },
                    RESET_NEW_PASSWORD: {
                        TITLE: 'اعادة ضبط كلمة المرور',
                        SUB_TITLE: 'الرجاء إدخال كلمة المرور الجديدة الخاصة بك',
                        SUB_TITLE2: 'و تأكيدها',
                    },
                },
            },
        },
    },
};
