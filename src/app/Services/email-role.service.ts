import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailRoleService {

  constructor() { }
  getRoleFromEmail(email: string): string | null {
    const parts = email.split('@');
    if (parts.length < 2) {
      return null; // Invalid email
    }

    const domainParts = parts[1].split('-');
    if (domainParts.length < 2) {
      return null; // No role in email
    }

    return domainParts[0]; // Return the role
  }
}
