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
            homeContainer: "",
            container: "",
            cusineTab: "",
            gridCusines: "",
            gridMeals: "",
            gridDishes: "",
            gridDishesMapping: "",
            dvCuisinesMapping: "",
            gridCuisinesMapping: "",
            gridMealsMapping: "",
            dishesMappingAccordion: "",
            cusinesEJModel: [],
            cusines_ddl_EJModel: [],
            mealsandSnacksEJModel: [],
            mealsandSnacks_ddl_EJModel: [],
            dishesEJModel: [],
            restaurantsEJModel: [],
            btnDishMapping: "",

            restaurantsMappingAccordion: "",
            gridRestCuisinesMapping: "",
            gridRestMealsMapping: "",
            gridRestDishMapping: "",
            btnRestaurantMapping: "",
            gridRestaurantMapping: "",

            dtlDishesWindow: "",
            gridRestaurantDtlDishes: ""

        };

        this.options.homeContainer = $("#homeContainer");
        this.options.container = element;
        this.options.cusineTab = element.find("#cusineTab");
        this.options.gridCusines = element.find("#gridCusines");
        this.options.gridMeals = element.find("#gridMeals");
        this.options.gridDishes = element.find("#gridDishes");
        this.options.dvCuisinesMapping = element.find("#dvCuisinesMapping");
        this.options.gridCuisinesMapping = element.find("#gridCuisinesMapping");
        this.options.gridMealsMapping = element.find("#gridMealsMapping");
        this.options.gridDishesMapping = element.find("#gridDishesMapping");
        this.options.dishesMappingAccordion = element.find("#dishesMappingAccordion");
        this.options.btnDishMapping = element.find("#btnDishMapping");

        this.options.restaurantsMappingAccordion = element.find("#RestaurantsMappingAccordion");
        this.options.gridRestCuisinesMapping = element.find("#gridRestCuisinesMapping");
        this.options.gridRestMealsMapping = element.find("#gridRestMealsMapping");
        this.options.gridRestDishMapping = element.find("#gridRestDishMapping");
        this.options.btnRestaurantMapping = element.find("#btnRestaurantMapping");
        this.options.gridRestaurantMapping = element.find("#gridRestaurantMapping");

        this.options.dtlDishesWindow = element.find("#dtlDishesWindow");
        this.options.gridRestaurantDtlDishes = element.find("#gridRestaurantDtlDishes");

        this.init(options);
    };

    function _configureMasterTab(options) {
        options.cusineTab.ejTab({ headerPosition: "top" });
    }

    function _ejAccordion(options) {
        options.dishesMappingAccordion.ejAccordion({ enableMultipleOpen: false });
        options.restaurantsMappingAccordion.ejAccordion({ enableMultipleOpen: false });
    }

    function _configureEvents(options) {
        options.btnDishMapping.unbind('click').bind('click', function (event) { _events_click_btnDishMapping(event, options); });
        options.btnRestaurantMapping.unbind('click').bind('click', function (event) { _events_click_btnRestaurantMapping(event, options); });
    }

    function _events_click_btnDishMapping(event, options) {
        event.preventDefault();
        options.container.HelperPlugin().ShowHideEjWaitingPopup(true);
        setTimeout(function () {
            options.container.HelperPlugin().ShowHideEjWaitingPopup(false);
            options.container.HelperPlugin().showPNotifyAlert(options, {
                title: "Message",
                text: "Mapping has been successfully completed...", type: "info"
            });
        }, 2500);
    }

    function _events_click_btnRestaurantMapping(event, options) {
        event.preventDefault();
        options.container.HelperPlugin().ShowHideEjWaitingPopup(true);
        setTimeout(function () {
            options.container.HelperPlugin().ShowHideEjWaitingPopup(false);
            options.container.HelperPlugin().showPNotifyAlert(options, {
                title: "Message",
                text: "Mapping has been successfully completed...", type: "info"
            });
        }, 2500);
    }

    function _cusines_ddl_StubData(options) {
        _.forEach(options.cusinesEJModel, function (value) {
            options.cusines_ddl_EJModel.push({ text: value.Name, value: value.ID });
        });
    }

    function _cusinesStubData(options) {
        options.cusinesEJModel = [];
        options.cusinesEJModel.push({ ID: 1, Name: 'Iranian', Description: 'Iranian' });
        options.cusinesEJModel.push({ ID: 2, Name: 'Fried Chicken', Description: 'Fried Chicken' });
        options.cusinesEJModel.push({ ID: 3, Name: 'Yemeni', Description: 'Yemeni' });
        options.cusinesEJModel.push({ ID: 4, Name: 'Syrian', Description: 'Syrian' });
        options.cusinesEJModel.push({ ID: 5, Name: 'Afghani', Description: 'Afghani' });
        options.cusinesEJModel.push({ ID: 6, Name: 'African', Description: 'African' });
        options.cusinesEJModel.push({ ID: 7, Name: 'American', Description: 'American' });
        options.cusinesEJModel.push({ ID: 8, Name: 'Argentinian', Description: 'Argentinian' });

        return options.cusinesEJModel;
    }

    function _meals_ddl_StubData(options) {
        _.forEach(options.mealsandSnacksEJModel, function (value) {
            options.mealsandSnacks_ddl_EJModel.push({ text: value.Name, value: value.ID });
        });
    }

    function _mealsandSnacksStubData(options) {
        options.mealsandSnacksEJModel = [];
        options.mealsandSnacksEJModel.push({ ID: 1, Name: 'Meals', Description: 'Meals' });
        options.mealsandSnacksEJModel.push({ ID: 2, Name: 'Combos', Description: 'Combos' });
        options.mealsandSnacksEJModel.push({ ID: 3, Name: 'Starters', Description: 'Starters' });
        options.mealsandSnacksEJModel.push({ ID: 4, Name: 'Main Course', Description: 'Main Course' });
        options.mealsandSnacksEJModel.push({ ID: 5, Name: 'Breads', Description: 'Breads' });
        options.mealsandSnacksEJModel.push({ ID: 6, Name: 'Rice and Biryani', Description: 'Rice and Biryani' });
        options.mealsandSnacksEJModel.push({ ID: 7, Name: 'Deserts', Description: 'Deserts' });
        options.mealsandSnacksEJModel.push({ ID: 8, Name: 'Desserts and Beverages', Description: 'Desserts and Beverages' });

        return options.mealsandSnacksEJModel;
    }

    function _dishesStubData(options) {
        options.dishesEJModel = [];
        options.dishesEJModel.push({
            ID: Math.floor(Math.random() * 999999), Name: 'Lamb Soup',
            Description: 'Lamb Soup', Ingredients: '',
            Cusines: 'Iranian,Iranian,Iranian,Iranian,Iranian,Iranian,Iranian,Iranian,Iranian,Iranian',
            MealType: 'Meals'
        });
        options.dishesEJModel.push({
            ID: Math.floor(Math.random() * 999999), Name: 'Herring Potato, Beetroot, Mayon Salad,Mayon Salad,Mayon Salad,Mayon Salad',
            Description: 'Herring Potato, Beetroot, Mayon Salad,Mayon Salad,Mayon Salad,Mayon Salad', Ingredients: '', Cusines: 'Fried Chicken', MealType: 'Combos'
        });
        options.dishesEJModel.push({
            ID: Math.floor(Math.random() * 999999), Name: 'Meat, Potato, Carrot, Green Peas Salad',
            Description: 'Meat, Potato, Carrot, Green Peas Salad', Ingredients: 'Meat, Potato, Carrot, Green Peas Salad', Cusines: 'Yemeni', MealType: 'Starters'
        });
        options.dishesEJModel.push({
            ID: Math.floor(Math.random() * 999999), Name: 'Meat Dumplings',
            Description: 'Meat Dumplings', Ingredients: 'Meat Dumplings', Cusines: 'Syrian', MealType: 'Main Course'
        });

        return options.dishesEJModel;
    }

    function _restaurantsStubData(options) {
        options.restaurantsEJModel = [];

        options.restaurantsEJModel.push({
            ID: Math.floor(Math.random() * 999999), CompanyKey: 'aangan-restaurant', Name: 'Aangan Restaurant', DisplayName: 'Aangan Restaurant'
        });
        options.restaurantsEJModel.push({
            ID: Math.floor(Math.random() * 999999), CompanyKey: 'Aaraamam Restaurant', Name: 'Aaraamam Restaurant', DisplayName: 'Aaraamam Restaurant'
        });
        options.restaurantsEJModel.push({
            ID: Math.floor(Math.random() * 999999), CompanyKey: 'Abdul Aziz Restaurant', Name: 'Abdul Aziz Restaurant', DisplayName: 'Abdul Aziz Restaurant'
        });
        options.restaurantsEJModel.push({
            ID: Math.floor(Math.random() * 999999), CompanyKey: 'Baanthai', Name: 'Baanthai', DisplayName: 'Baanthai'
        });
        options.restaurantsEJModel.push({
            ID: Math.floor(Math.random() * 999999), CompanyKey: 'Bab Al Yam', Name: 'Bab Al Yam', DisplayName: 'Bab Al Yam'
        });
        options.restaurantsEJModel.push({
            ID: Math.floor(Math.random() * 999999), CompanyKey: 'Bab Khyber Restaurant', Name: 'Bab Khyber Restaurant', DisplayName: 'Bab Khyber Restaurant'
        });
        options.restaurantsEJModel.push({
            ID: Math.floor(Math.random() * 999999), CompanyKey: 'Bacchus The Fairmont Dubai', Name: 'Bacchus The Fairmont Dubai', DisplayName: 'Bacchus The Fairmont Dubai'
        });
        options.restaurantsEJModel.push({
            ID: Math.floor(Math.random() * 999999), CompanyKey: 'Cabana', Name: 'Cabana', DisplayName: 'Cabana'
        });
        options.restaurantsEJModel.push({
            ID: Math.floor(Math.random() * 999999), CompanyKey: 'Cactus Catering Co', Name: 'Cactus Catering Co', DisplayName: 'Cactus Catering Co'
        });
        options.restaurantsEJModel.push({
            ID: Math.floor(Math.random() * 999999), CompanyKey: 'Cafe and SWEET shop', Name: 'Cafe and SWEET shop', DisplayName: 'Cafe and SWEET shop'
        });

        return options.restaurantsEJModel;
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
            allowTextWrap: false,
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
            queryCellInfo: function (args) {
                //Add attributes to cells in queryCellInfo 
                $(args.cell).attr({
                    "data-toggle": "tooltip",
                    "data-container": "body",
                    "title": args.data[args.column.field]
                });
            },
            dataBound: function (args) {
                //Render tooltip in dataBound event.
                $("[data-toggle=tooltip]").tooltip();
            },
            toolbarClick: function (e) {
                this.exportGrid = this["export"];
                if (e.itemName == "Excel Export") {
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
            allowTextWrap: false,
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
            queryCellInfo: function (args) {
                //Add attributes to cells in queryCellInfo 
                $(args.cell).attr({
                    "data-toggle": "tooltip",
                    "data-container": "body",
                    "title": args.data[args.column.field]
                });
            },
            dataBound: function (args) {
                //Render tooltip in dataBound event.
                $("[data-toggle=tooltip]").tooltip();
            },
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

    function _loadDishesGrid(options) {

        _cusines_ddl_StubData(options);
        _meals_ddl_StubData(options);

        options.gridDishes.ejGrid({
            dataSource: _dishesStubData(options),
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
            allowTextWrap: false,
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
                { field: "Ingredients", headerText: 'Ingredients', width: 150 },
                {
                    field: "Cusines", headerText: "Cusines", editType: ej.Grid.EditingType.Dropdown, width: 85,
                    editTemplate: {
                        create: function () {
                            return "<input>";
                        },
                        read: function (args) {
                            return args.ejDropDownList("getValue");
                        },
                        write: function (args) {
                            args.element.ejDropDownList({ dataSource: options.cusines_ddl_EJModel });
                            args.element.ejDropDownList("setSelectedText", args.rowdata.Cusines);
                        }
                    }
                },
                {
                    field: "MealType", headerText: "Meals & Snacks", editType: ej.Grid.EditingType.Dropdown, width: 85,
                    editTemplate: {
                        create: function () {
                            return "<input>";
                        },
                        read: function (args) {
                            return args.ejDropDownList("getValue");
                        },
                        write: function (args) {
                            args.element.ejDropDownList({ dataSource: options.mealsandSnacks_ddl_EJModel });
                            args.element.ejDropDownList("setSelectedText", args.rowdata.MealType);
                        }
                    }
                },
            ],
            queryCellInfo: function (args) {
                //Add attributes to cells in queryCellInfo 
                $(args.cell).attr({
                    "data-toggle": "tooltip",
                    "data-container": "body",
                    "title": args.data[args.column.field]
                });
            },
            dataBound: function (args) {
                //Render tooltip in dataBound event.
                $("[data-toggle=tooltip]").tooltip();
            },
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

    function _loadCusinesMappingGrid(options) {
        options.gridCuisinesMapping.ejGrid({
            dataSource: _cusinesStubData(options),
            allowPaging: true,
            isResponsive: true,
            allowSorting: true,
            allowMultiSorting: true,
            allowFiltering: true,
            gridLines: ej.Grid.GridLines.Horizontal,
            filterSettings: { showFilterBarStatus: false, statusBarWidth: 500 },
            allowResizing: true,
            allowScrolling: true,
            scrollSettings: { width: '100%', height: '100%' },
            pageSettings: { pageSize: 5 },
            enableHeaderHover: true,
            filterSettings: { filterType: "menu" },
            allowTextWrap: false,
            columns: [
                { type: "checkbox", width: 8 },
                {
                    field: "ID", isPrimaryKey: true, headerText: "ID", textAlign: ej.TextAlign.Right,
                    validationRules: { required: true, number: true }, width: 20, visible: false
                },
                { field: "Name", headerText: 'Cuisine Name', width: 60 }
            ],
            queryCellInfo: function (args) {
                //Add attributes to cells in queryCellInfo 
                $(args.cell).attr({
                    "data-toggle": "tooltip",
                    "data-container": "body",
                    "title": args.data[args.column.field]
                });
            },
            dataBound: function (args) {
                //Render tooltip in dataBound event.
                $("[data-toggle=tooltip]").tooltip();
            }
        });
    }

    function _loadMealsMappingGrid(options) {
        options.gridMealsMapping.ejGrid({
            dataSource: _mealsandSnacksStubData(options),
            allowPaging: true,
            isResponsive: true,
            allowSorting: true,
            allowMultiSorting: true,
            allowFiltering: true,
            gridLines: ej.Grid.GridLines.Horizontal,
            filterSettings: { showFilterBarStatus: false, statusBarWidth: 500 },
            allowResizing: true,
            allowScrolling: true,
            scrollSettings: { width: '100%', height: '100%' },
            pageSettings: { pageSize: 5 },
            enableHeaderHover: true,
            filterSettings: { filterType: "menu" },
            allowTextWrap: false,
            columns: [
                { type: "checkbox", width: 8 },
                {
                    field: "ID", isPrimaryKey: true, headerText: "ID", textAlign: ej.TextAlign.Right,
                    validationRules: { required: true, number: true }, width: 20, visible: false
                },
                { field: "Name", headerText: 'Meals & Snacks Name', width: 60 }
            ],
            queryCellInfo: function (args) {
                //Add attributes to cells in queryCellInfo 
                $(args.cell).attr({
                    "data-toggle": "tooltip",
                    "data-container": "body",
                    "title": args.data[args.column.field]
                });
            },
            dataBound: function (args) {
                //Render tooltip in dataBound event.
                $("[data-toggle=tooltip]").tooltip();
            }
        });
    }

    function _loadDishesMappingGrid(options) {
        options.gridDishesMapping.ejGrid({
            dataSource: _dishesStubData(options),
            allowPaging: true,
            isResponsive: true,
            allowSorting: true,
            allowMultiSorting: true,
            allowFiltering: true,
            gridLines: ej.Grid.GridLines.Horizontal,
            filterSettings: { showFilterBarStatus: false, statusBarWidth: 500 },
            allowResizing: true,
            allowScrolling: true,
            scrollSettings: { width: '100%', height: '100%' },
            pageSettings: { pageSize: 10 },
            enableHeaderHover: true,
            filterSettings: { filterType: "menu" },
            allowTextWrap: false,
            columns: [
                { type: "checkbox", width: 20 },
                {
                    field: "ID", isPrimaryKey: true, headerText: "ID", textAlign: ej.TextAlign.Right,
                    validationRules: { required: true, number: true }, width: 20, visible: false
                },
                { field: "Name", headerText: 'Name', width: 100 },
                { field: "Cusines", headerText: 'Cusines', width: 100 },
                { field: "MealType", headerText: 'Meals & Snacks', width: 100 }
            ],
            queryCellInfo: function (args) {
                //Add attributes to cells in queryCellInfo 
                $(args.cell).attr({
                    "data-toggle": "tooltip",
                    "data-container": "body",
                    "title": args.data[args.column.field]
                });
            },
            dataBound: function (args) {
                //Render tooltip in dataBound event.
                $("[data-toggle=tooltip]").tooltip();
            }
        });
    }

    function _loadRestCusinesMappingGrid(options) {
        options.gridRestCuisinesMapping.ejGrid({
            dataSource: _cusinesStubData(options),
            allowPaging: true,
            isResponsive: true,
            allowSorting: true,
            allowMultiSorting: true,
            allowFiltering: true,
            gridLines: ej.Grid.GridLines.Horizontal,
            filterSettings: { showFilterBarStatus: false, statusBarWidth: 500 },
            allowResizing: true,
            allowScrolling: true,
            scrollSettings: { width: '100%', height: '100%' },
            pageSettings: { pageSize: 5 },
            enableHeaderHover: true,
            filterSettings: { filterType: "menu" },
            allowTextWrap: false,
            columns: [
                { type: "checkbox", width: 8 },
                {
                    field: "ID", isPrimaryKey: true, headerText: "ID", textAlign: ej.TextAlign.Right,
                    validationRules: { required: true, number: true }, width: 20, visible: false
                },
                { field: "Name", headerText: 'Cuisine Name', width: 60 }
            ],
            queryCellInfo: function (args) {
                //Add attributes to cells in queryCellInfo 
                $(args.cell).attr({
                    "data-toggle": "tooltip",
                    "data-container": "body",
                    "title": args.data[args.column.field]
                });
            },
            dataBound: function (args) {
                //Render tooltip in dataBound event.
                $("[data-toggle=tooltip]").tooltip();
            }
        });
    }

    function _loadRestMealsMappingGrid(options) {
        options.gridRestMealsMapping.ejGrid({
            dataSource: _mealsandSnacksStubData(options),
            allowPaging: true,
            isResponsive: true,
            allowSorting: true,
            allowMultiSorting: true,
            allowFiltering: true,
            gridLines: ej.Grid.GridLines.Horizontal,
            filterSettings: { showFilterBarStatus: false, statusBarWidth: 500 },
            allowResizing: true,
            allowScrolling: true,
            scrollSettings: { width: '100%', height: '100%' },
            pageSettings: { pageSize: 5 },
            enableHeaderHover: true,
            filterSettings: { filterType: "menu" },
            allowTextWrap: false,
            columns: [
                { type: "checkbox", width: 8 },
                {
                    field: "ID", isPrimaryKey: true, headerText: "ID", textAlign: ej.TextAlign.Right,
                    validationRules: { required: true, number: true }, width: 20, visible: false
                },
                { field: "Name", headerText: 'Meals & Snacks Name', width: 60 }
            ],
            queryCellInfo: function (args) {
                //Add attributes to cells in queryCellInfo 
                $(args.cell).attr({
                    "data-toggle": "tooltip",
                    "data-container": "body",
                    "title": args.data[args.column.field]
                });
            },
            dataBound: function (args) {
                //Render tooltip in dataBound event.
                $("[data-toggle=tooltip]").tooltip();
            }
        });
    }

    function _loadRestDishesMappingGrid(options) {
        options.gridRestDishMapping.ejGrid({
            dataSource: _dishesStubData(options),
            allowPaging: true,
            isResponsive: true,
            allowSorting: true,
            allowMultiSorting: true,
            allowFiltering: true,
            gridLines: ej.Grid.GridLines.Horizontal,
            filterSettings: { showFilterBarStatus: false, statusBarWidth: 500 },
            allowResizing: true,
            allowScrolling: true,
            scrollSettings: { width: '100%', height: '100%' },
            pageSettings: { pageSize: 10 },
            enableHeaderHover: true,
            filterSettings: { filterType: "menu" },
            allowTextWrap: false,
            columns: [
                { type: "checkbox", width: 8 },
                {
                    field: "ID", isPrimaryKey: true, headerText: "ID", textAlign: ej.TextAlign.Right,
                    width: 20, visible: false
                },
                { field: "Name", headerText: 'Name', width: 60 }
            ],
            queryCellInfo: function (args) {
                //Add attributes to cells in queryCellInfo 
                $(args.cell).attr({
                    "data-toggle": "tooltip",
                    "data-container": "body",
                    "title": args.data[args.column.field]
                });
            },
            dataBound: function (args) {
                //Render tooltip in dataBound event.
                $("[data-toggle=tooltip]").tooltip();
            }
        });
    }

    function _loadRestaurantsGrid(options) {
        options.gridRestaurantMapping.ejGrid({
            dataSource: _restaurantsStubData(options),
            contextClick: function (args) {
                if (_.isEqual(args.ID, 'dtlDishes')) {
                    _dishesDtlModal(options, args);
                }
            },
            contextMenuSettings: { enableContextMenu: true, contextMenuItems: [], customContextMenuItems: [{ id: 'dtlDishes', text: "Dishes" }] },
            allowPaging: true,
            isResponsive: true,
            allowSorting: true,
            allowMultiSorting: true,
            allowFiltering: true,
            gridLines: ej.Grid.GridLines.Horizontal,
            filterSettings: { showFilterBarStatus: false, statusBarWidth: 500 },
            allowResizing: true,
            allowScrolling: true,
            scrollSettings: { width: '100%', height: '100%' },
            pageSettings: { pageSize: 10 },
            enableHeaderHover: true,
            filterSettings: { filterType: "menu" },
            allowTextWrap: false,
            columns: [
                { type: "checkbox", width: 8 },
                {
                    field: "ID", isPrimaryKey: true, headerText: "ID", textAlign: ej.TextAlign.Right, width: 20, visible: false
                },
                { field: "DisplayName", headerText: 'Restaurant Name', width: 100 }
            ],
            queryCellInfo: function (args) {
                //Add attributes to cells in queryCellInfo 
                $(args.cell).attr({
                    "data-toggle": "tooltip",
                    "data-container": "body",
                    "title": args.data[args.column.field]
                });
            },
            dataBound: function (args) {
                //Render tooltip in dataBound event.
                $("[data-toggle=tooltip]").tooltip();
            }
        });
    }

    function _dishesDtlModal(options, args) {
        if (!_.isNull(options.dtlDishesDialog))
            options.dtlDishesDialog.open();
    }

    function _initdishesDtlModal(options) {
        if (_.isNull(options.dtlDishesWindow)) { return; }

        options.dtlDishesWindow.ejDialog(
            {
                enableModal: true,
                enableResize: false,
                width: 800,
                containment: ".clshomeContainer",
                showOnInit: false,
                title: "Dishes"
            });

        options.dtlDishesDialog = options.dtlDishesWindow.data("ejDialog");

        if (!_.isNull(options.dtlDishesDialog)) {
            _loadRestaurantDishesDtlGrid(options);
        }
    }

    function _loadRestaurantDishesDtlGrid(options) {
        options.gridRestaurantDtlDishes.ejGrid({
            dataSource: _dishesStubData(options),
            allowPaging: true,
            isResponsive: true,
            allowSorting: true,
            allowMultiSorting: true,
            allowFiltering: true,
            gridLines: ej.Grid.GridLines.Horizontal,
            filterSettings: { showFilterBarStatus: false, statusBarWidth: 500 },
            allowResizing: true,
            allowScrolling: true,
            scrollSettings: { width: '100%', height: '100%' },
            pageSettings: { pageSize: 10 },
            enableHeaderHover: true,
            filterSettings: { filterType: "menu" },
            allowTextWrap: false,
            columns: [
                {
                    field: "ID", isPrimaryKey: true, headerText: "ID", textAlign: ej.TextAlign.Right, width: 20, visible: false
                },
                { field: "Name", headerText: 'Name', width: 100 },
                { field: "Cusines", headerText: 'Cusines', width: 100 },
                { field: "MealType", headerText: 'Meals & Snacks', width: 100 }
            ],
            queryCellInfo: function (args) {
                //Add attributes to cells in queryCellInfo 
                $(args.cell).attr({
                    "data-toggle": "tooltip",
                    "data-container": "body",
                    "title": args.data[args.column.field]
                });
            },
            dataBound: function (args) {
                //Render tooltip in dataBound event.
                $("[data-toggle=tooltip]").tooltip();
            }
        });
    }

    Plugin.prototype = {
        // initialize options
        init: function (options) {
            $.extend(this.options, options);
            _configureMasterTab(this.options);
            _configureEvents(this.options);
            _loadCusinesGrid(this.options);
            _loadmealsandSnacksGrid(this.options);
            _loadDishesGrid(this.options);
            _ejAccordion(this.options);
            _loadCusinesMappingGrid(this.options);
            _loadMealsMappingGrid(this.options);
            _loadDishesMappingGrid(this.options);
            _loadRestCusinesMappingGrid(this.options);
            _loadRestDishesMappingGrid(this.options);
            _loadRestMealsMappingGrid(this.options);
            _loadRestaurantsGrid(this.options);
            _initdishesDtlModal(this.options);
            this.options.container.HelperPlugin().InitEjWaitingPopup(this.options.homeContainer);
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