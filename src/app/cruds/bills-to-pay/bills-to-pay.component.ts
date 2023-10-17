import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BiilsToPayService } from 'src/app/services/biils-to-pay.service';
import { map } from 'rxjs';
import { BillToPay } from 'src/app/interfaces/bill-to-pay';

@Component({
    templateUrl: './bills-to-pay.component.html',
    providers: [MessageService]
})
export class BillsToPayComponent implements OnInit {
    public cols: any[] = [];
    public rowsPerPageOptions = [5, 10, 20];
    public form!: FormGroup;
    public items: BillToPay[] = [];
    public item!: BillToPay;
    public itemDialog: boolean = false;
    public deleteItemDialog: boolean = false;

    constructor(private messageService: MessageService, private formBuilder: FormBuilder, private billsToPayService: BiilsToPayService) { }

    ngOnInit() {
        this.onCreateForm();
        this.onLoadItems();
    }

    openNew() {
        this.itemDialog = true;
        this.form.reset();
        delete this.item.id;
    }

    hideDialog() {
        this.itemDialog = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onCreateForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            documentDate: ['', Validators.required],
            documentNumber: ['', Validators.required],
            supplierName: ['', Validators.required],
            amount: ['', Validators.required],
            installmentQuantity: ['', Validators.required],
            dueDate: ['', Validators.required]
        })
    }

    onLoadItems() {
        this.billsToPayService.getAll().snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ id: c.payload.doc.id, ...c.payload.doc.data() })
              )
            )
          ).subscribe(data => {
            this.items = data;
          });
    }

    onSaveForm() {
       console.log(this.item);
       if (!this.item?.id) {
           return this.createBillPay();
       }

       return this.updateBillPay(this.item.id);
    }

    createBillPay() {
        this.billsToPayService.create(this.form.value).then(() => {
            this.itemDialog = false;
            this.form.reset();
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Contas a pagar criada!', life: 3000 });
        });
    }

    updateBillPay(id: string) {
        this.billsToPayService.update(id, this.form.value).then(res => {
            this.itemDialog = false;
            this.form.reset();
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Contas a pagar atualizada!', life: 3000 });
        })
    }

    deleteBillPay(billPay: BillToPay) {
        this.deleteItemDialog = true;
        this.item = billPay;
    }

    confirmDeleteBillPay() {
        if (!this.item.id){
            return;
        }
        this.billsToPayService.delete(this.item.id).then(res => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Contas a pagar deletada!', life: 3000 });

            this.deleteItemDialog = false;
        })
    }

    editBillPay(item: BillToPay) {
        const id = item.id;
        this.item = item;
        delete item.id;
        this.form.setValue(item);

        this.itemDialog = true;
        this.item.id = id;
    }
}
