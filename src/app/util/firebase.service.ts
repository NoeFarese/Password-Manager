import {inject, Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {Eintrag} from '../models/eintrag';
import {map, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

type UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db = inject(AngularFireDatabase);
  private auth = inject(AngularFireAuth);

  isAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(map(user => !!user));
  }

  upsertEintrag(eintrag: Eintrag): Promise<void> {
    return this.auth.currentUser.then((user) => {
      if (!user) throw new Error("Kein Benutzer angemeldet!");
      return this.db.database.ref('eintrag').child(user.uid).child(eintrag.uuid).update(eintrag);
    });
  }

  deleteEintrag(eintrag: Eintrag): Promise<void> {
    return this.auth.currentUser.then((user) => {
      if (!user) throw new Error("Kein Benutzer angemeldet!");
      return this.db.database.ref('eintrag').child(user.uid).child(eintrag.uuid).remove();
    });
  }

  getEintraege(): Observable<Eintrag[]> {
    return new Observable((observer) => {
      this.auth.currentUser.then((user) => {
        if (!user) throw new Error("Kein Benutzer angemeldet!");
        const ref = this.db.database.ref('eintrag').child(user.uid);
        const listener = ref.on('value', (snapshot) => {
          if (snapshot.exists()) {
            observer.next(Object.values(snapshot.val()) as Eintrag[]);
          } else {
            observer.next([]);
          }
        });
        return () => ref.off('value', listener);
      });
    });
  }

  login(email: string, password: string): Promise<UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  signup(email: string, password: string): Promise<UserCredential> {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  signOut(): Promise<void> {
    return this.auth.signOut();
  }
}
