import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router'
import { AuthService } from './auth.service'
import decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data.expectedRoles

    const token = localStorage.getItem('currentuser')

    if (token) {
      const tokenPayload: any = this.authService.decodeToken(token);
      console.log(tokenPayload)
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['login'])
        return false
      } else if (!expectedRoles.includes(tokenPayload.role)) {
        this.router.navigate(['/'])
        return false
      }
      return true
    } else {
      this.router.navigate(['login'])
      return false
    }
  }
}
