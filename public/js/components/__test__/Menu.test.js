import {createRenderer} from 'react-addons-test-utils';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import React from 'react';

import Menu from '../Menu/Menu';

const test = addAssertions(tape, {jsxEquals});

test('Menu Component', (t) => {
    const renderer = createRenderer();
    const extra_menu = [{"label":"Admin","href":"admin.html","submenu":[{"label":"admincart","href":"admincart.html"},{"label":"adminprofile","href":"admincart.html"}]}];
    renderer.render(
        <Menu extraMenu={extra_menu}/>
    );

    let actualElement = renderer.getRenderOutput();
    let expectedElement =  <nav><ul><li><a href="index.html">Home</a></li><li><a href="admin.html">Admin</a><ul><li><a href="admincart.html">admincart</a></li><li><a href="admincart.html">adminprofile</a></li></ul></li></ul></nav>

    let unexpectedElement = <nav><ul><li><a href="index.html">Home</a></li></ul></nav>;

    t.jsxEquals(actualElement, expectedElement, "this sholud work");
    t.jsxEquals(actualElement, unexpectedElement, "this sholud die!");
    t.end();
});