import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from './service';
import { CacheService } from './cache/cache.service';

@Injectable({ providedIn: 'root' })
export class UsersService extends Service {
  
  constructor(public http: HttpClient) { 
    super(http, 'users', new CacheService('users'));
  }
}