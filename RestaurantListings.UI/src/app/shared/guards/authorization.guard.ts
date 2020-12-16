import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";
import { Observable } from "rxjs";
//import { authCodeFlowConfig } from '../../auth.config';

@Injectable({
	providedIn: "root"
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {
	constructor(private oauthService: OAuthService) {}

	canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> | boolean {
		let authenticated: boolean = this.oauthService.hasValidAccessToken();	

		if (authenticated) {			
			return authenticated;
		} else {
			this.oauthService.initCodeFlow();
			return authenticated;
		}
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		return this.canActivate(route, state);
	}
}
