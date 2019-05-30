import {t, Selector} from 'testcafe';

let helper = {
    checkURL: async function(url, required = false) {
        const windowLocation = await t.eval(() => window.location);
        if (required) {
            await t.expect(windowLocation.pathname).contains(url);
        } else {
            return (windowLocation.pathname.includes(url));
        }
    },

    requireURL: async function(url) {
        await this.checkURL(url, true);
    },

    checkFullURL: async function(url, required = false) {
        const windowLocation = await t.eval(() => window.location);
        if (required) {
            await t.expect(windowLocation.href).contains(url);
        } else {
            return (windowLocation.href.includes(url));
        }
    },

    requireFullURL: async function(url) {
        await this.checkFullURL(url, true);
    },

    checkText: async function(element, str, required = false) {
        let elementText = await element.innerText;
        if (required) {
            await t.expect(elementText).contains(str);
        } else {
            return elementText.includes(str);
        }
    }, 

    requireText: async function (element, str) {
        await this.checkText(element, str, true);
    },

    checkExists: async function(element) {
        return await element.exists;
    },

    requireElementExists: async function(element, msg='Element should exist') {
        await t.expect(await this.checkExists(element)).ok(msg);
    },

    requireElementNotExists: async function(element, msg='Element should not exist') {
        await t.expect(await this.checkExists(element)).notOk(msg);
    },

    checkElementValue: async function (element, expected, required = false) {
        if (required) {
            await t.expect(element.value).contains(expected);
        } else {
            return await element.value.toString().includes(expected);
        }
    },

    requireElementValue: async function (element, expected) {
        await this.checkElementValue(element, expected, true);
    },

    checkMultiPresent: async function(items, required = false, strict = false) {
        if (required) {
            for (let i = 0; i < items.length; i++) {
                await this.requireElementExists(this.textSelect(items[i], '*', strict), `"${items[i]}" should have been present`);
            };
        } else {
            let found = true;
            for (let i = 0; i < items.length; i++) {
                if (! await this.checkExists(this.textSelect(items[i], '*', strict))) {
                    found = false;
                }
            };
            return found;
        }
    },

    requireMultiPresent: async function(items, strict = false) {
        await this.checkMultiPresent(items, true, strict);
    },

    checkMultiNotPresent: async function (items, required = false, strict = false) {
        if (required) {
            for (let i = 0; i < items.length; i++) {
                await this.requireElementNotExists(this.textSelect(items[i], '*', strict), `"${items[i]}" shouldn't have been present`);
            };
        } else {
            let found = false;
            for (let i = 0; i < items.length; i++) {
                if (await this.checkExists(this.textSelect(items[i], '*', strict))) {
                    found = true;
                }
            };
            return found;
        }
    },

    requireMultiNotPresent: async function(items, strict = false) {
        await this.checkMultiNotPresent(items, true, strict);
    },

    getDescendant: async function (parentElem, descendantText, descendantTag, strict = false) {
        if (strict) {
            await parentElem.find(descendantTag).withExactText(descendantText);
        } else {
            await parentElem.find(descendantTag).withText(descendantText);
        }
    },

    checkMultiDescendantPresent: async function (parent, items, required = false, strict = false) {
        if (required) {
            if (strict) {
                for (let i = 0; i < items.length; i++) {
                    await this.requireElementExists(parent.find('*').withExactText(items[i]), `"${items[i]}" should have been present`);
                };
            } else {
                for (let i = 0; i < items.length; i++) {
                    await this.requireElementExists(parent.find('*').withText(items[i]), `"${items[i]}" should have been present`);
                };
            }   
        } else {
            let exists = true;
            if (strict) {
                for (let i = 0; i < items.length; i++) {
                    if (! await this.checkElementExists(parent.find('*').withExactText(items[i]), `"${items[i]}" should have been present`)) {
                        exists = false;
                    }
                };
            } else {
                for (let i = 0; i < items.length; i++) {
                    if (! await this.checkElementExists(parent.find('*').withText(items[i]), `"${items[i]}" should have been present`)) {
                        exists = false;
                    }                
                };
            }  
            return exists;
        }
    },

    requireMultiDescendantPresent: async function (parent, items, strict = false) {
        await this.checkMultiDescendantPresent(parent, items, true, strict);
    },

    signup: async function(firstName = 'first', lastName = 'last', email = 'email', 
            password = 'password', terms = false) {
        await t.typeText(Selector("input[name*='first']"), firstName)
            .typeText(Selector("input[name*='last']"), lastName)
            .typeText(Selector("input[name*='email']"), email)
            .typeText(Selector("input[name*='password']"), password)
            .typeText(Selector("input[name*='confirm']"), password);

        if (terms) {
            await t.click(Selector("input[name*='terms']"));
        }

        await t.click(Selector("button[type='submit']"));
    },

    signin: async function(username = 'username', password = 'password') {
        await t.typeText(Selector('input[type="text"]'), username, {replace: true})
            .typeText(Selector("input[type*='password']"), password, {replace: true})
            .click(Selector("button[type='submit']"));

        return ! await this.checkExists(this.textSelect('Password'));
    },

    failSignin: async function (email, password, failMsg = 'Signin did not fail') {
        let signedIn = await helper.signin(email, password);
        await t.expect(signedIn).notOk(failMsg);
    },

    succeedSignin: async function (email, password, failMsg = "Signin failed") {
        let signedIn = await helper.signin(email, password);
        await t.expect(signedIn).ok(failMsg);
    },

    clickHoverMenuItem: async function(menuLocator, itemLocator) {
        await t.hover(menuLocator)
            .wait(500)
            .click(itemLocator);
    },

    reload: async function() {
        await t.eval(() => location.reload(true))
            .wait(1000);
    },

    textSelect: function (text, tag = '*', strict = false) {
        if (strict) {
            return Selector(tag).withExactText(text).nth(-1);
        } else {
            return Selector(tag).withText(text).nth(-1);
        }
    },

    xpathSelect: Selector((xpath) => {
        let nodes = document.evaluate(xpath, document.body, null, XPathResult.ANY_TYPE, null);
        return nodes.iterateNext();
    }),

    xpathString: function (text, tag = '*', strict = false) {
        let str;
        if (! strict) {
            str = `.//${tag}[text()[contains(., "${text}")]][1]`;
        } else {
            str = `.//${tag}[text() = "${text}"][1]`;
        }
        return str;
    },
};

export {helper};