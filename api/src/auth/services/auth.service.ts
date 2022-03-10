import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/user/models/user.interface';
const bcrypt = require('bcrypt')


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // MAKE LINK UNTIL JWT AND OUR USER
  generateJWT(user: User): Observable<string> {
    return from(this.jwtService.signAsync(user));
  }

  // MAKE A PASSWORD WITH HASH SECURITY
  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  // COMPARE REGULAR PASSWORD WITH PREVIOUS HASH PASSWORD 
  comparePasswords(newPassword: string, passwordHash: string): Observable<any | boolean> {
    return of<any | boolean>(bcrypt.compare(newPassword, passwordHash));
  }
}
