import {Selector } from 'testcafe';
import {helper} from './../actions/helper.js';
let generalElements = {
    submitButton: Selector("button[type='submit']"),
    cancelButton: helper.textSelect('Cancel'),
    userIcon: (first ='q', last ='', image = false) => {
        if (image) {
            return Selector(`img[alt='${first} ${last}']`);
        } else {
            let userInitials = `${first.charAt(0)}${last.charAt(0)}`;
            return helper.textSelect(userInitials.toUpperCase(), 'div');
        }
    },
    notificationBell: (first ='q', last ='', image = false) => {
        if (image) {
            return helper.xpathSelect(`.//img[alt = '${first} ${last}'][1]/preceding::div[1]`);
        } else {
            let userInitials = `${first.charAt(0)}${last.charAt(0)}`
            return helper.xpathSelect(`${helper.xpathString(userInitials, 'div', true)}/preceding::div[1]`);
        }
    },
    accountInfo: helper.textSelect('Account Info', 'li'),
    logout: helper.textSelect('Log Out', 'li'),
    login: helper.textSelect('Login', 'button'),
    paginateBack: (word = '<') => {
        return helper.textSelect(word, 'span');
    },
    paginatePage: (page) => {
        return helper.textSelect(page, 'span', true);
    },
    paginateNext: (word = '>') => {
        return helper.textSelect(word, 'span');
    },
    dropdown: (value) => {
        return Selector(`.//option[value=${value}]/preceding::select[1]`);
    },
   
    DATE_PICKER: {
        nextMonth: helper.xpathSelect('.//div.DayPickerNavigation/following::button[2]'),
        previousMonth: helper.xpathSelect('.//div.DayPickerNavigation/following::button[1]'),
        currentMonth: helper.xpathSelect('.//div.CalendarMonth[data-visible="true"][1]/following::strong[1]'),
        day: Selector('td.CalendarDay--valid button'),
        //day: d => helper.xpathSelect(`.//div.CalendarMonth[data-visible="true"][1]/following::button[text() = "${d}"][1]`),
    },
    USER: {
        firstName: Selector('input[name="firstName"]'),
        lastName: Selector('input[name="lastName"]'),
        email: Selector('input[name="email"]'),
        sendInvite: Selector('input[name="sendEmail"]'),
        phone: Selector('input[name="phone_number"]'),
        jobTitle: Selector('input[name="job_title"]'),
        role: roleName => helper.textSelect(roleName, 'span', true),
    },
    SIDEBAR: {
        sidebarToggle: (name) => helper.xpathSelect(`${helper.xpathString(name, 'div')}/preceeding::div[1]`),
        backToAdmin: helper.textSelect("Back to Admin", 'span'),
        dashboard: Selector("a[href='/']"),
        users: Selector("a[href='/users']"),
        reports: Selector("a[href='/reports']"),
        inventory: Selector("a[href='/inventory']"),
        settings: Selector("a[href='/settings']"),
    },
    
};

let oidcElements = {
    back: helper.textSelect('Back', 'a'),
    submitOIDCForm: helper.textSelect('Submit', 'button'),
    cancelOIDCForm: helper.textSelect('Cancel', 'a'),
    USER_PROFILE: {
        uploadLabel: helper.textSelect("Upload a photo", "span"),
        uploadInput: Selector("input[id='picture']"),
        currentEmail: email => helper.textSelect(email, 'div'),
        currentPassword: helper.textSelect('•••', 'div'),
        editEmail: helper.xpathSelect(`${helper.xpathString('Email', 'label')}/following::a[1]`),
        editPassword: helper.xpathSelect(`${helper.xpathString('Password', 'label')}/following::a[1]`),
    },
    EMAIL_SETTINGS: {
        verifiedEmail: helper.textSelect("(Verified)", "span", true),
        unVerifiedEmail: helper.textSelect("(Not verified)", "span"),
        resendVerification: helper.textSelect("Resend Verification", "button"),
        cancelChangeEmail: helper.textSelect("Cancel", "button"),
        currentPassword: Selector("input[name='current']"),
        newEmail: Selector("input[name='email']"),
        changeEmailConfirmation: helper.textSelect('address provided', 'span'),
    },
    CHANGE_PASSWORD: {
        currentPassword: Selector('input[name="current"]'),
        newPassword: Selector("input[name='password']"),
        confirmPassword: Selector("input[name='pass2']"),
        passwordChangeSuccess: helper.textSelect('successfully', 'div'),
        passwordSuccessBack: helper.textSelect('Back', 'a', true),
    },
    FORGOT_PASSWORD: {
        forgotPassword: helper.textSelect('Forgot', 'a'),
        email: Selector('input[name="email"]'),
        login: helper.textSelect('Log In', 'a'),
        success: helper.textSelect('check your email', 'div'),
    },
};

export {generalElements, oidcElements};
