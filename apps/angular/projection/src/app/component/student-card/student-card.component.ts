import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent, ListItemDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students$ | async" class="bg-light-green">
      <img card-image src="assets/img/student.webp" width="200px" />
      <ng-template listItem let-student>
        <app-list-item (deleteItemEmitter)="deleteStudent(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
      <ng-container card-footer>
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addNewStudent()">
          Add
        </button>
      </ng-container>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, AsyncPipe, ListItemDirective, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students$!: Observable<Student[]>;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.students$ = this.store.students$;
  }

  addNewStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
