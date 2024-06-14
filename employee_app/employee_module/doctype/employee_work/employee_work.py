
import frappe
from frappe.model.document import Document


class EmployeeWork(Document):
	pass


@frappe.whitelist()
def get_work_value(item,employee):
	values = frappe.db.get_value('Employee Item',{"parent": employee,'item':item},['name','item','rate'],as_dict=True)
	if values is None:
		values = frappe.db.get_value('Item',{'name':item},['name','rate'],as_dict=True)
	return values