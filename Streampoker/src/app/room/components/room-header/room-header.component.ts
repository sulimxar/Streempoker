import { Component, Inject, Input, OnInit } from '@angular/core';
import { AppUser, NavigationService, NavigationServiceInjectionToken, Room } from '@shared.module';


@Component({
  selector: 'app-room-header',
  templateUrl: './room-header.component.html',
  styleUrls: ['./room-header.component.scss']
})
export class RoomHeaderComponent implements OnInit {

  @Input() appUser: AppUser;
  @Input() room: Room;
  @Input() isRoomNotFound: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
