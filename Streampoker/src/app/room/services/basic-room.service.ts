import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import {
  RoomService, RoomRepositoryServiceInjectionToken, RoomRepositoryService,
  UserServiceInjectionToken, UserService, Room
} from '@shared.module';
import { Guid } from '@shared.module';

@Injectable()
export class BasicRoomService implements RoomService {

  constructor(
    @Inject(RoomRepositoryServiceInjectionToken)
    private roomRepositoryService: RoomRepositoryService,
    @Inject(UserServiceInjectionToken)
    private userService: UserService,
  ) {

  }

  createRoom(roomName: string): Promise<string> {
    const ownerId = this.userService.appUser.uid;
    if (!ownerId) {
      throw new Error('Parameter ownerId cannot be null.');
    }

    const roomKey = this.generateRoomKey();

    return this.roomRepositoryService.addRoom(ownerId, roomKey, roomName).then<string>(uid => roomKey);
  }

  getRoom(roomKey: string): Observable<Room> {
    const rooms = this.roomRepositoryService.getRoom(roomKey);

    rooms.forEach(room => {
      room.guests = room.guests.filter(v => {
        return (Date.now() - (v.ping as number)) < 5000;
      });
    });

    return rooms;
  }

  private generateRoomKey(): string {
    const guid = Guid.newGuid();
    const roomKey = guid.substring(0, 5).toUpperCase();
    return roomKey;
  }
}
