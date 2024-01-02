import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { LoaderInterceptor } from './loader.interceptor';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { TodoEffects } from '../store/effects/todo.effects';
import { todoReducer } from '../store/reducers/todo.reducer';
import { ResponseInterceptor } from './response-interceptor';

const rootReducer = {
  todo: todoReducer,
};

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    provideStore(rootReducer),
    provideEffects(TodoEffects),
  ],
};
