import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class BiilsToReceiveService {
  private dbPathBillsReceive = '/bills-receive';
  private billsReceiveRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
      this.billsReceiveRef = db.collection(this.dbPathBillsReceive);
  }

  getAll(): AngularFirestoreCollection<any> {
      return this.billsReceiveRef;
  }

  create(billToReceive: any): any {
      return this.billsReceiveRef.add({ ...billToReceive });
  }

  update(id: string, data: any): Promise<void> {
      return this.billsReceiveRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
      return this.billsReceiveRef.doc(id).delete();
  }
}
