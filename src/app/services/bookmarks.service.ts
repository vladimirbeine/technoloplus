import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({ providedIn: 'root' })
export class BookmarksService {
    constructor() {}

    save(post) {
        if (!post) {
            return;
        }
        if (!post.id) {
            return;
        }

        let bookmarkList = this.getAllBookmark();
        if (bookmarkList[post.id]) {
            return;
        } else {
            bookmarkList[post.id] = post;
            localStorage.setItem('bookmark', JSON.stringify(bookmarkList));
        }
    }   
    
    clearAll() {
        localStorage.removeItem("bookmark");
    }

    delete(post) {
        if (!post) {
            return;
        }
        if (!post.id) {
            return;
        }
        let bookmarkList = this.getAllBookmark();
        if (bookmarkList[post.id]) {
            delete bookmarkList[post.id]
            localStorage.setItem('bookmark', JSON.stringify(bookmarkList));
        }
    }

    getAllBookmark() {
        let bookmarkListString = localStorage.getItem('bookmark');
        if (!bookmarkListString) {
            return {};
        } else {
            return JSON.parse(bookmarkListString);
        }
    }

    getSettingsObject() {
        let result =  {
            'bookmark': localStorage.getItem('bookmark'),
            'isPushNotificationEnabled': localStorage.getItem('isPushNotificationEnabled'),
            'isLightColorSelected': localStorage.getItem('isLightColorSelected')       
        };
        return JSON.stringify(result);
    }

    writeToFile() {
        console.log('writeToFile');
        Filesystem.writeFile({ path: 'settings.json', data: `${this.getSettingsObject()}`, directory: Directory.Documents});
    }

    readFromFile() {
        console.log('readFile');
        return Filesystem.readFile({path: 'settings.json', directory: Directory.Documents, encoding: Encoding.UTF8});
    }
}