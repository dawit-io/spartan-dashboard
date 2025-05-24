import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = signal<boolean>(false);

  isDarkMode = this.darkMode.asReadonly();

  setDarkMode(isDark: boolean) {
    this.darkMode.set(isDark);
  }

  toggleDarkMode() {
    this.darkMode.update(dark => !dark);
  }
}
