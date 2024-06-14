frappe.ui.form.on("Employee Work", {

    refresh(frm){

    },
    // employee_work(frm){
    //     let total = 0;
    //     console.log("hello")
    //     frm.doc.employee_work.forEach(element => {
    //         total += element.cost
    //     });
    //     frm.doc.total_cost = total
    // }

});

frappe.ui.form.on("Item Quantity Price", {
    item_name(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn)
        frappe.call({
            method: "employee_app.employee_module.doctype.employee_work.employee_work.get_work_value",
            args: {
                item: row.item_name,
                employee: frm.doc.employee
            },
            callback: function (response) {
                const data = response.message;
                frappe.model.set_value(cdt, cdn, 'rate', data.rate);
                frappe.model.set_value(cdt, cdn, 'cost', data.rate * row.quantity || 0);
            }
        })
    },
    quantity(frm,cdt,cdn){
        let row = frappe.get_doc(cdt, cdn)
        frappe.model.set_value(cdt, cdn, 'cost', row.rate * row.quantity || 0);
    },
    cost(frm, cdt, cdn){
        let total = 0;
        frm.doc.employee_work.forEach(element => {
            total += element.cost || 0;
        });
        frm.set_value('total_cost', total);
    }
})
