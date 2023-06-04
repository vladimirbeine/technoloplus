import { defaultAppConfigs } from 'src/app/services/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from './service';

@Injectable({ providedIn: 'root' })
export class CommentsService extends Service {
    constructor(public http: HttpClient) { 
        super(http, 'comments', null);
    }

    getAllCommentsForPostById(postId, page) {
        return this.getItemList(`post=${postId}`, null, null, page, defaultAppConfigs.numberOfItemPerPage)
    }

    addComment(postId, content, author, email, url="") {
        let body = {}
  
        if (postId) {
            body['post'] =  postId;
        }
        if (content) {
            body['content'] =  content;
        }
        if (author) {
            body['author_name'] =  author;
        }
        if (email) {
            body['author_email'] =  email;
        }
        if (url) {
            body['author_url'] =  url;
        }

        return this.http.post(`${this.getRootUrl()}`, body);
    }
}