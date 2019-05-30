import {helper} from './actions/helper.js';
import {adminActions} from './actions/admin-actions.js';
import {oidcActions} from './actions/oidc-actions.js';
import {adminRoles} from './elements/role-names.js';
import {secrets} from './secrets.js';
import {generalElements, oidcElements} from './elements/general-elements.js';
import {adminElements} from './elements/admin-elements.js';
import {frontendElements} from './elements/frontend-elements.js';

let {url, email, password, first, last} = secrets;

fixture`Login Actions`.page(url).beforeEach(async t => {
  t.ctx.time = Date.now();
  await t.maximizeWindow();
});

test('Login', async t => {
  let signedIn = await helper.signin(email, password);
  await t.expect(signedIn).ok('Not signed in');
});

test('Fail Login', async t => {
  await helper.failSignin('test@gmail.com', 'password');
});

test('Forgot Password', async t => {
  await oidcActions.forgotPassword();
});