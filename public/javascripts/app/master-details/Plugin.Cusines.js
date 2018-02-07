/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
; (function ($, window, document, undefined) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    var // plugin name
        pluginName = "CusinesPlugin",
        // key using in $.data()
        dataKey = "plugin_" + pluginName;


    var Plugin = function (element, options) {
        this.element = element;

        this.options = {
            container: "",
            cusineTab: ""
        };
        this.options.container = element;
        this.options.cusineTab = element.find("#cusineTab");
        this.init(options);
    };

    function _configureMasterTab(options) {
        options.cusineTab.ejTab(
            {
                headerPosition: "left",
                enableTabScroll: true
            });
    }

    Plugin.prototype = {
        // initialize options
        init: function (options) {
            $.extend(this.options, options);
            _configureMasterTab(this.options);
        }
    };

    /*
     * Plugin wrapper, preventing against multiple instantiations and
     * return plugin instance.
     */
    $.fn[pluginName] = function (options) {

        var plugin = this.data(dataKey);

        // has plugin instantiated ?
        if (plugin instanceof Plugin) {
            // if have options arguments, call plugin.init() again
            if (typeof options !== 'undefined') {
                plugin.init(options);
            }
        } else {
            plugin = new Plugin(this, options);
            this.data(dataKey, plugin);
        }

        return plugin;
    };

}(jQuery, window, document));