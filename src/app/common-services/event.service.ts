import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  isLoading$: WritableSignal<boolean> = signal(false);

  constructor() { }
}
