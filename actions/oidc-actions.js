import { t, Selector } from 'testcafe';
import { waitForReact, ReactSelector } from 'testcafe-react-selectors';
import {helper} from './helper.js';
import {generalElements, oidcElements} from './../elements/general-elements.js';

let oidcActions = {
    clickUserIcon: async function(first ='q', last ='', failedOnce = false) {
        if (await helper.checkExists(generalElements.userIcon(first, last, true))) {
            await t.click(generalElements.userIcon(first, last, true));
        } else if (await helper.checkExists(generalElements.userIcon(first, last, false))) {
            await t.click(generalElements.userIcon(first, last, false));
        } else {
            if (failedOnce) {
                await t.expect(false).ok('Could not find user icon');
            } else {
                await t.click(generalElements.SIDEBAR.users);
                await this.clickUserIcon(first, last, true);
            }
        }
    },
    gotoAccountInfo: async function(first ='q', last ='') {
        await this.clickUserIcon(first, last);
        await t.click(generalElements.accountInfo);
        await t.wait(1000);
        await helper.requireURL('/user/profile');
    },
    editEmail: async function(newEmail, password, first ='', last ='') {
        if (! await helper.checkURL('/user/profile')) {
            await this.gotoAccountInfo(first, last);
        }
    },
};

export {oidcActions};