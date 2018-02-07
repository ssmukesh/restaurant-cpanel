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
            cusineTab: "",
            gridCusines: "",
            gridMeals: "",
            cusinesEJModel: [],
            mealsandSnacksEJModel: [],
        };
        this.options.container = element;
        this.options.cusineTab = element.find("#cusineTab");
        this.options.gridCusines = element.find("#gridCusines");
        this.options.gridMeals = element.find("#gridMeals");
        this.init(options);
    };

    function _configureMasterTab(options) {
        options.cusineTab.ejTab(
            {
                headerPosition: "left",
                enableTabScroll: true
            });
    }

    function _cusinesStubData(options) {
        options.cusinesEJModel.push({ ID: Math.floor(Math.random() * 999999), Name: 'Iranian', Description: 'Iranian' });
        options.cusinesEJModel.push({ ID: Math.floor(Math.random() * 999999), Name: 'Fried Chicken', Description: 'Fried Chicken' });
        options.cusinesEJModel.push({ ID: Math.floor(Math.random() * 999999), Name: 'Yemeni', Description: 'Yemeni' });
        options.cusinesEJModel.push({ ID: Math.floor(Math.random() * 999999), Name: 'Syrian', Description: 'Syrian' });

        return options.cusinesEJModel;
    }

    function _mealsandSnacksStubData(options) {
        options.mealsandSnacksEJModel.push({ ID: Math.floor(Math.random() * 999999), Name: 'Meals', Description: 'Meals' });
        options.mealsandSnacksEJModel.push({ ID: Math.floor(Math.random() * 999999), Name: 'Combos', Description: 'Combos' });
        options.mealsandSnacksEJModel.push({ ID: Math.floor(Math.random() * 999999), Name: 'Starters', Description: 'Starters' });
        options.mealsandSnacksEJModel.push({ ID: Math.floor(Math.random() * 999999), Name: 'Main Course', Description: 'Main Course' });
        options.mealsandSnacksEJModel.push({ ID: Math.floor(Math.random() * 999999), Name: 'Breads', Description: 'Breads' });
        options.mealsandSnacksEJModel.push({ ID: Math.floor(Math.random() * 999999), Name: 'Rice and Biryani', Description: 'Rice and Biryani' });
        options.mealsandSnacksEJModel.push({ ID: Math.floor(Math.random() * 999999), Name: 'Deserts', Description: 'Deserts' });
        options.mealsandSnacksEJModel.push({ ID: Math.floor(Math.random() * 999999), Name: 'Desserts and Beverages', Description: 'Desserts and Beverages' });

        return options.mealsandSnacksEJModel;
    }

    function _loadCusinesGrid(options) {
        options.gridCusines.ejGrid({
            dataSource: _cusinesStubData(options),
            allowPaging: true,
            isResponsive: true,
            allowSorting: true,
            allowMultiSorting: true,
            allowFiltering: true,
            gridLines: ej.Grid.GridLines.Horizontal,
            filterSettings: { showFilterBarStatus: true, statusBarWidth: 500 },
            allowResizing: true,
            allowScrolling: true,
            scrollSettings: { width: '100%', height: '100%' },
            pageSettings: { pageSize: 10 },
            enableHeaderHover: true,
            filterSettings: { filterType: "menu" },
            allowTextWrap: true,
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, editMode: "batch" },
            toolbarSettings: {
                showToolbar: true, toolbarItems:
                    [
                        ej.Grid.ToolBarItems.Add,
                        ej.Grid.ToolBarItems.Edit, ej.Grid.ToolBarItems.Delete, ej.Grid.ToolBarItems.Update, ej.Grid.ToolBarItems.Cancel,
                        ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.PdfExport
                    ]
            },
            columns: [
                {
                    field: "ID", isPrimaryKey: true, headerText: "ID", textAlign: ej.TextAlign.Right,
                    validationRules: { required: true, number: true }, width: 90, visible: false
                },
                { field: "Name", headerText: 'Cuisine Name', width: 150 },
                { field: "Description", headerText: 'Description', width: 150 },
            ],
            toolbarClick: function (e) {
                this.exportGrid = this["export"];
                if (e.itemName == "Excel Export") {
                    //this.exportGrid(window.baseurl + 'api/grid/ExcelExport')
                    options.container.HelperPlugin().showPNotifyAlert(options, { title: "Coming soon...", text: "An awesome export option is coming very soon.", type: "info" });
                    e.cancel = true;
                }
                else if (e.itemName == "Word Export") {
                    options.container.HelperPlugin().showPNotifyAlert(options, { title: "Coming soon...", text: "An awesome export option is coming very soon.", type: "info" });
                    e.cancel = true;
                }
                else if (e.itemName == "PDF Export") {
                    options.container.HelperPlugin().showPNotifyAlert(options, { title: "Coming soon...", text: "An awesome export option is coming very soon.", type: "info" });
                    e.cancel = true;
                }
            },
        });
    }

    function _loadmealsandSnacksGrid(options) {
        options.gridMeals.ejGrid({
            dataSource: _mealsandSnacksStubData(options),
            allowPaging: true,
            isResponsive: true,
            allowSorting: true,
            allowMultiSorting: true,
            allowFiltering: true,
            gridLines: ej.Grid.GridLines.Horizontal,
            filterSettings: { showFilterBarStatus: true, statusBarWidth: 500 },
            allowResizing: true,
            allowScrolling: true,
            scrollSettings: { width: '100%', height: '100%' },
            pageSettings: { pageSize: 10 },
            enableHeaderHover: true,
            filterSettings: { filterType: "menu" },
            allowTextWrap: true,
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, editMode: "batch" },
            toolbarSettings: {
                showToolbar: true, toolbarItems:
                    [
                        ej.Grid.ToolBarItems.Add,
                        ej.Grid.ToolBarItems.Edit, ej.Grid.ToolBarItems.Delete, ej.Grid.ToolBarItems.Update, ej.Grid.ToolBarItems.Cancel,
                        ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.PdfExport
                    ]
            },
            columns: [
                {
                    field: "ID", isPrimaryKey: true, headerText: "ID", textAlign: ej.TextAlign.Right,
                    validationRules: { required: true, number: true }, width: 90, visible: false
                },
                { field: "Name", headerText: 'Name', width: 150 },
                { field: "Description", headerText: 'Description', width: 150 },
            ],
            toolbarClick: function (e) {
                this.exportGrid = this["export"];
                if (e.itemName == "Excel Export") {
                    //this.exportGrid(window.baseurl + 'api/grid/ExcelExport')
                    options.container.HelperPlugin().showPNotifyAlert(options, { title: "Coming soon...", text: "An awesome export option is coming very soon.", type: "info" });
                    e.cancel = true;
                }
                else if (e.itemName == "Word Export") {
                    options.container.HelperPlugin().showPNotifyAlert(options, { title: "Coming soon...", text: "An awesome export option is coming very soon.", type: "info" });
                    e.cancel = true;
                }
                else if (e.itemName == "PDF Export") {
                    options.container.HelperPlugin().showPNotifyAlert(options, { title: "Coming soon...", text: "An awesome export option is coming very soon.", type: "info" });
                    e.cancel = true;
                }
            },
        });
    }

    Plugin.prototype = {
        // initialize options
        init: function (options) {
            $.extend(this.options, options);
            _configureMasterTab(this.options);
            _loadCusinesGrid(this.options);
            _loadmealsandSnacksGrid(this.options);
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