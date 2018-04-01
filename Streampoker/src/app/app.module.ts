import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoomComponent } from './room/room.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { UserAuthGuard } from './services/user-auth-guard.service';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import { UserService } from './services/user.service';
import { NavigationHelperService } from './services/navigation-helper.service';
import { LoggingService } from './services/logging.service';
import { BusyService } from './services/busy.service';

export function tokenGetterFactory() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetterFactory,
        whitelistedDomains: []
      }
    }),
    RouterModule.forRoot([
      { path: '', component: RoomComponent, canActivate: [UserAuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent },
    ],
    // {
    //   onSameUrlNavigation: 'reload',
    //   initialNavigation: false
    // }
  )
  ],
  providers: [
    AuthService,
    UserAuthGuard,
    UserService,
    NavigationHelperService,
    LoggingService,
    BusyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }