import { BrowserWindow, ipcMain } from 'electron';
import { TitleBarEventNames } from '../event-names/titleBarEventNames';

export default function registerTitleBarEvents() {
  const window = BrowserWindow.getFocusedWindow();

  if (window) {
    window.on('maximize', () => {
      window.webContents.send(TitleBarEventNames.WAS_MAXIMIZED);
    });

    window.on('unmaximize', () => {
      window.webContents.send(TitleBarEventNames.WAS_UNMAXIMIZED);
    })
  }

  ipcMain.on(TitleBarEventNames.MINIMIZE, () => {
    if (window) {
      window.minimize();
    }
  })

  ipcMain.on(TitleBarEventNames.UNMAXIMIZE, () => {
    if (window) {
      window.unmaximize();
    }
  })

  ipcMain.on(TitleBarEventNames.MAXIMIZE, () => {
    if (window) {
      window.maximize();
    }
  })

  ipcMain.on(TitleBarEventNames.CLOSE, () => {
    if (window) {
      window.close();
    }
  })
};
