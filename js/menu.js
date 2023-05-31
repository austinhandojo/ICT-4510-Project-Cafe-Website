'use strict';

const menuModule = (function () {

    const URL ='https://ict4510.herokuapp.com/api/menus?api_key=8e78f4a33ecb03d83adb6ed559653000';
    let obj = {};

    /**
     * Gets menu items
     */
    const get_menu_items = function () {

        fetch(URL)
            .then(function (response) {

                if (response.status === 200) {
                    return response.json();
                }

            })
            .then(function (json) {
                display_menu_items(json.menu);
            });
    };

    /**
     * Displayes menu items
     * @param menu
     * @returns {boolean}
     */
    const display_menu_items = function (menu) {
        let html = '';

        for (let i = 0;i<menu.length;i++) {

            let index = 0;

            if (index === 0) {
                index = index + 1;
            }

            html += `
            <div class="menulist">
                <div class="row">
                <div class="col"><p>${menu[i].item}</p></div>
                <div class="col"><p>${menu[i].description}</p></div>
                <div class="col"><p>$${menu[i].price}</p></div>
                </div>
            </div>
            `;
        }

        document.querySelector('#menu').innerHTML = html;
    };

    obj.init = function () {
        get_menu_items();
    };

    return obj;

}());

// init function calls get_menu_items() function when the page loads
menuModule.init();