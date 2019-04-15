export const menus = [
    {
        'name': 'Dashboard',
        'icon': 'dashboard',
        'link': '/admin/dashboard',
        'open': false,
        'chip': false,
    },
    {
        'name': 'Store',
        'icon': 'widgets',
        'link': false,
        'open': false,
        'chip': false,
        'sub': [
            {
                'name': 'Countries',
                'link': '/admin/store/countries',
                'icon': 'indeterminate_check_box',
                'chip': false,
                'open': false,
                'sub': false
            },
            {
                'name': 'Departments',
                'link': '/admin/store/departments',
                'icon': 'indeterminate_check_box',
                'chip': false,
                'open': false,
                'sub': false
            },
            {
                'name': 'List',
                'link': 'material-widgets/list',
                'icon': 'list',
                'chip': false,
                'open': false,
            },
        ]
    },
    {
        'name': 'Routes',
        'icon': 'list',
        'link': false,
        'open': false,
        'chip': {'value': 2, 'color': 'accent'},
        'sub': [
            {
                'name': 'Fixed',
                'icon': 'filter_list',
                'link': 'tables/fixed',
                'open': false,
            },
            {
                'name': 'Feature',
                'icon': 'done_all',
                'link': 'tables/featured',
                'open': false,
            },
            {
                'name': 'Responsive Tables',
                'icon': 'filter_center_focus',
                'link': 'tables/responsive',
                'open': false,
            }
        ]

    },

];
