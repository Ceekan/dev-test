import { ModuleWithProviders, NgModule } from "@angular/core";
import { OAuthModule } from "angular-oauth2-oidc";
import { AuthorizationGuard } from "../guards/authorization.guard";

@NgModule({
	imports: [
		OAuthModule.forRoot()
	]
})
export class SharedModule {	
	static forRoot(): ModuleWithProviders<SharedModule> {
		return {
			ngModule: SharedModule,
			providers: [
				AuthorizationGuard
			]
		};
	}
}