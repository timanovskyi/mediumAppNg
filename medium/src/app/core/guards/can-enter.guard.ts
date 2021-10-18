import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { PersistanceService } from '../../shared/services/persistance.service';

@Injectable({
  providedIn: 'root'
})
export class CanEnterGuard implements CanActivate {

  constructor(private _localStorage: PersistanceService,
              private _router: Router,
              private _route: ActivatedRoute
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this._localStorage.get('accessToken');
    const authExistsInPath = this._route.snapshot.url.some(e => e.path === 'login');
    if (token || !authExistsInPath) {
      return true
    }
    return this._router.navigate(['auth/login']);

  }
}
