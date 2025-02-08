export const workItemColumns = [
    { selector: row => row.section, name: 'סעיף', sortable: true },
    { selector: row => row.description, name: 'תיאור', sortable: true },
    { selector: row => row.contract_amount, name: 'כמות בחוזה', sortable: true },
    { selector: row => row.actual_amount, name: 'כמות בפועל', sortable: true },
    { selector: row => row.unit_cost, name: 'עלות ליחידה', sortable: true },
    { selector: row => row.totalSectionCost, name: 'סה"כ עלות לסעיף', sortable: true },
    // { selector: row => row.status, name: 'סטטוס ביצוע', sortable: true },
    { selector: row => row.status_display, name: 'סטטוס ביצוע', sortable: true },
    { selector: row => row.work_type, name: 'סוג עבודה', sortable: true },
];
// export const workItemColumns = [{
//     selector: row => row.section,
//     name: 'סעיף',
// }, {
//     selector: row => row.description,
//     name: 'תיאור',
// }, {
//     selector: row => row.contractAmount,
//     name: 'כמות בחוזה',
// }, {
//     selector: row => row.actualAmount,
//     name: 'כמות בפועל',
//
// }, {
//     selector: row => row.unitCost,
//     name: 'עלות ליחידה',
// }, {
//     selector: row => row.totalSectionCost,
//     name: 'סה"כ עלות לסעיף',
// },
// {
//     selector: row => row.status,
//     name: 'סטטוס ביצוע',
// }
// ]
