// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path')
const log = require('electron-log');
let shuttingDown;
let webServer;
// Make sure to set the logging level to the
log.transports.console.level = 'info';
log.transports.file.level = 'info';

function startExpress() {

  // Create the path of the express server to pass in with the spawn call
  var webServerDirectory = path.join(__dirname, 'dist', 'app.js');
  log.info('starting node script: ' + webServerDirectory);

  var nodePath = "/usr/local/bin/node";
  if (process.platform === 'win32') {
    // Overwrite with the windows path...only testing on mac currently
  }

  // Optionally update environment variables used
  var env = JSON.parse(JSON.stringify(process.env));

  // Start the node express server
  const spawn = require('child_process').spawn;
  webServer = spawn(nodePath, [webServerDirectory], {
    env: env
  });

  // Were we successful?
  if (!webServer) {
    log.info("couldn't start web server");
    return;
  }

  // Handle standard out data from the child process
  webServer.stdout.on('data', function (data) {
    console.log(data);
    log.info('data: ' + data);
  });

  // Triggered when a child process uses process.send() to send messages.
  webServer.on('message', function (message) {
    console.log(message);
    log.info(message);
  });

  // Handle closing of the child process
  webServer.on('close', function (code) {
    log.info('child process exited with code ' + code);
    webServer = null;

    // Only restart if killed for a reason...
    if (!shuttingDown) {
      log.info('restarting...');
      startExpress();
    }
  });

  // Handle the stream for the child process stderr
  webServer.stderr.on('data', function (data) {
    log.info('stderr: ' + data);
  });

  // Occurs when:
  // The process could not be spawned, or
  // The process could not be killed, or
  // Sending a message to the child process failed.
  webServer.on('error', function (err) {
    log.info('web server error: ' + err);
  });
}



function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000');

  ipcMain.on('select-dirs', async (event, arg) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    })
    console.log('directories selected', result.filePaths)
    mainWindow.webContents.send("fromMain", result.filePaths);
  })

  ipcMain.on("toMain", (event, args) => {
  });



  // // and load the index.html of the app.
  // mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  shuttingDown = false;
  startExpress();
  createWindow();
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()

})
app.on('before-quit', () => {
  shuttingDown = true;
  webServer.kill();
});
app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
