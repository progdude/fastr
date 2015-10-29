var nw = require('nw.gui');

var win = nw.Window.get();


var fs = require('fs');
    // Window menu
    var windowMenu = new nw.Menu({
        type: 'menubar'
    });

    // Help menu
    var fileMenu = new nw.Menu();

    // Add to window menu
    windowMenu.append(new nw.MenuItem({
        label: 'File',
        submenu: helpMenu
    }));

    // About sub-entry
    helpMenu.append(new nw.MenuItem({
        label: 'Save HTML',
        click: function(){
          click('files');
        }
    }));

    helpMenu.append(new nw.MenuItem({
        label: 'Save CSS',
        click: function(){
          click('files');
        }
    }));

    helpMenu.append(new nw.MenuItem({
        label: 'Save JavaScript',
        click: function(){
          click('files');
        }
    }));

function save(path, doc){

}

function click(id){
    var event = document.createEvent('MouseEvent');
    event.initMouseEvent('click');
    document.getElementById(id).dispathEvent(id);
}


    // Assign to window
    nw.Window.get().menu = windowMenu;