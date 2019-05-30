import {Selector } from 'testcafe';
import {helper} from './../actions/helper.js';

let adminElements = {
    HEADER: {
        searchBar: Selector(`input[placeholder*='Search']`),
    },
    CARD: {
        card: (name) => helper.textSelect(name, 'span'),
        menu: (name) => helper.xpathSelect(`${helper.xpathString(name, 'span', true)}/preceding::button[2]`),
        edit: helper.textSelect('Edit', 'div'),
        archive: helper.textSelect('Archive', 'div'),
        unrchive: helper.textSelect('Unarchive', 'div'),
        favorite: (name) => helper.xpathSelect(`${helper.xpathString(name, 'span', true)}/preceding::button[1]`),
    },
};

export {adminElements};