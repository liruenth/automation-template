import {Selector } from 'testcafe';
import {helper} from './../actions/helper.js';

let frontendElements = {
    DASHBOARD:  {
        zeroContent: helper.textSelect('Nothing currently available'),
    },
};

export {frontendElements};