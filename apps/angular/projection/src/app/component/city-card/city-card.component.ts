import { AsyncPipe } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent, ListItemDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" class="bg-light-blue">
      <img card-image src="assets/img/city.png" width="200px" />
      <ng-template listItem let-city>
        <app-list-item (deleteItemEmitter)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
      <ng-container card-footer>
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addNewCity()">
          Add
        </button>
      </ng-container>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [ListItemComponent, ListItemDirective, CardComponent, AsyncPipe],
})
export class CityCardComponent implements OnInit {
  cities: Signal<City[]> = toSignal(this.store.cities$, { initialValue: [] });

  constructor(
    private store: CityStore,
    private http: FakeHttpService,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
  }

  addNewCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
