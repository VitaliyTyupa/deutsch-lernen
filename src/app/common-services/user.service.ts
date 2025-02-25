import { Injectable } from '@angular/core';
import {User} from '../types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user!: User;

  constructor() { }
}
