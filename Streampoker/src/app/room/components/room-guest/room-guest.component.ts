import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { AppUser, Room, RoomServiceInjectionToken, RoomService } from '@shared.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-room-guest',
  templateUrl: './room-guest.component.html',
  styleUrls: ['./room-guest.component.scss']
})
export class RoomGuestComponent implements OnInit, OnDestroy {

  @Input() appUser: AppUser;
  @Input() room: Room;
  
  private pingSubscription: Subscription;

  constructor(
    @Inject(RoomServiceInjectionToken)
    private roomService: RoomService) { }

  ngOnInit() {
    const timer = Observable.timer(10, 2000);
    this.pingSubscription = timer.subscribe(t => this.pingGuest());
  }

  ngOnDestroy(): void {
    this.pingSubscription.unsubscribe();
  }

  private pingGuest() {
    this.roomService.pingGuest(this.appUser, this.room);
  }
}
