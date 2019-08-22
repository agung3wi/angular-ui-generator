const constant = {
    column_type_list : [
        'int',
        'bigint',
        'varchar',
        'text',
        'boolean',
        'date',
        'datetime'
    ],
    field_list : [
        'none',
        'text',
        'textarea',
        'integer',
        'numeric',
        'date',
        'dropdown',
        'radio',
        'checkbox'
    ],
    validation_list : [
        {'key' : 'required'},
        {'key' : 'email'},
        {'key' : 'integer'},
        {'key' : 'numeric'},
        {'key' : 'boolean'},
        {'key' : 'dateformat:YmdHis'}
    ],
    logical_list : [
        {'key' : '='},
        {'key' : "LIKE '%%'"},
        {'key' : "ILIKE '%%'"},
        {'key' : '!='},
        {'key' : '>'},
        {'key' : '<'},
        {'key' : '>='},
        {'key' : '<='},
    ]
}

export default constant;