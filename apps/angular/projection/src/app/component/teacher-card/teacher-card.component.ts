import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent, ListItemDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers$ | async"
      (addNewItemEmitter)="addNewTeacher()"
      class="bg-light-red">
      <img card-image src="assets/img/teacher.png" width="200px" />
      <ng-template listItem let-teacher>
        <app-list-item (deleteItemEmitter)="deleteTeacher(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
      <ng-container card-footer>
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addNewTeacher()">
          Add
        </button>
      </ng-container>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemDirective, AsyncPipe],
})
export class TeacherCardComponent implements OnInit {
  teachers$!: Observable<Teacher[]>;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.teachers$ = this.store.teachers$;
  }

  addNewTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    console.log(id);
    this.store.deleteOne(id);
  }
}
