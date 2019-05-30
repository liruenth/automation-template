import { t, Selector } from 'testcafe';
import { waitForReact, ReactSelector } from 'testcafe-react-selectors';
import {helper} from './helper.js';
import {generalElements} from './../elements/general-elements.js';
import {adminElements} from './../elements/admin-elements.js';

let adminActions = {
    defaultAction: async function() {
        await t.click(generalElements.submitButton);
    },
};
export {adminActions};
