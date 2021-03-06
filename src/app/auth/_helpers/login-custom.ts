export class LoginCustom {

    static handleSignInFormSubmit() {
        $('#m_login_signin_submit').click(function(e) {
            let form = $(this).closest('form');
            form.validate({
                rules: {
                    username: {
                        required: true,
                    },
                    password: {
                        required: true
                    }
                }
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

    static displaySignUpForm() {
        let login = $('#m_login');
        login.removeClass('m-login--forget-password');
        login.removeClass('m-login--signin');

        login.addClass('m-login--signup');
        (<any>login.find('.m-login__signup')).animateClass('flipInX animated');
    }

    static displaySignInForm() {
        let login = $('#m_login');
        login.removeClass('m-login--forget-password');
        login.removeClass('m-login--signup');
        try {
            $('form').data('validator').resetForm();
        } catch (e) {
        }

        login.addClass('m-login--signin');
        (<any>login.find('.m-login__signin')).animateClass('flipInX animated');
    }

    static displayForgetPasswordForm() {
        let login = $('#m_login');
        login.removeClass('m-login--signin');
        login.removeClass('m-login--signup');

        login.addClass('m-login--forget-password');
        (<any>login.find('.m-login__forget-password')).animateClass('flipInX animated');
    }

    static displayTeamMembers() {
        let team = $('#m_login_team_parent');
        team.removeClass('m-login__team-intro');

        team.addClass('m-login__team');
        (<any>team.find('.m-login__team')).animateClass('fadeIn animated');
    }

    static displayTeamIntro() {
        let team = $('#m_login_team_parent');
        team.removeClass('m-login__team');

        team.addClass('m-login__team-intro');
        (<any>team.find('.m-login__team-intro')).animateClass('fadeIn animated');
    }

    static handleFormSwitch() {
        $('#m_login_forget_password').click(function(e) {
            e.preventDefault();
            LoginCustom.displayForgetPasswordForm();
        });

        $('#m_login_forget_password_cancel').click(function(e) {
            e.preventDefault();
            LoginCustom.displaySignInForm();
        });

        $('#m_login_signup').click(function(e) {
            e.preventDefault();
            LoginCustom.displaySignUpForm();
        });

        $('#m_login_signup_cancel').click(function(e) {
            e.preventDefault();
            LoginCustom.displaySignInForm();
        });

        $('#m-login__team').hide();
        $('#m_login_team').click(function(e) {
            $('#m-login__team-intro').hide();
            $('#m-login__team').show();
            e.preventDefault();
            LoginCustom.displayTeamMembers();
        });

        $('#m_login_back').click(function(e) {
            $('#m-login__team').hide();
            $('#m-login__team-intro').show();
            e.preventDefault();
            LoginCustom.displayTeamIntro();
        });
    }

    static handleSignUpFormSubmit() {
        $('#m_login_signup_submit').click(function(e) {
            let btn = $(this);
            let form = $(this).closest('form');
            form.validate({
                rules: {
                    firstname: {
                        required: true
                    },
                    lastname: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true,
                        pattern: "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
                    },
                    password: {
                        required: true
                    },
                    rpassword: {
                        required: true
                    },
                }
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

    static handleForgetPasswordFormSubmit() {
        $('#m_login_forget_password_submit').click(function(e) {
            let btn = $(this);
            let form = $(this).closest('form');
            form.validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    }
                }
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

    static init() {
        LoginCustom.handleFormSwitch();
        LoginCustom.handleSignInFormSubmit();
        LoginCustom.handleSignUpFormSubmit();
        LoginCustom.handleForgetPasswordFormSubmit();
    }
}