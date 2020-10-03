const constant = {
    column_type_list: [
        'int',
        'bigint',
        'string',
        'numeric',
        'text',
        'boolean',
        'date',
        'datetime'
    ],
    field_list: [
        'none',
        'dropdown-list',
        'text',
        'textarea',
        'integer',
        'numeric',
        'date',
        'dropdown',
        'radio',
        'checkbox',
        'email',
        'number',
        'password',
        'time',
        'datetime',
        'select',
        'upload',
        'submit',
        'single-lookup',
        'multiple-lookup'

    ],
    validation_list: [
        'required',
        'email',
        'integer',
        'numeric',
        'boolean',
        'dateformat:YmdHis'
    ],
    logical_list: [
        { 'key': '=' },
        { 'key': "LIKE '%%'" },
        { 'key': "ILIKE '%%'" },
        { 'key': '!=' },
        { 'key': '>' },
        { 'key': '<' },
        { 'key': '>=' },
        { 'key': '<=' },
    ],
    type_module_list: [
        { key: 'table', value: 'In Table' },
        { key: 'module', value: 'In Module' },
        { key: 'list_module', value: 'List Module' },
    ],
    type_template_list: [
        { key: 'generate', value: 'Generate File' },
        { key: 'change', value: 'Add Content File' },
    ],
}

export default constant;