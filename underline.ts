//pipe to render all headings and underline text

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';




@Pipe({
  name: 'sanitized'
})
export class SanitizedPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) {

    const renderer = new marked.Renderer();
    renderer.heading = (text: string, level: number) => {
      return `<h${level}>${text}</h${level}>`;
    }

    renderer.text = (text: string) => {
      const underlineRegex = /\+\+(.*?)\+\+/g;
      const result = text.replace(underlineRegex, '<u>$1</u>');
      return result;
    };

    marked.setOptions({renderer})
  }


  
  transform(value: string): SafeHtml {

    const markdownHtml = marked(value);
    return this.sanitized.bypassSecurityTrustHtml(markdownHtml);
      
  }
}

//main chat component where message is being sent
import TurndownService from 'turndown';

private turndownService: TurndownService;

constructor(){
  this.turndownService = new TurndownService()

    this.turndownService.addRule('underline', {
      filter: ['u'],
      replacement: (content) => {
        return `++${content}++`;
      }
    })    --> replace u tag with ++

    this.turndownService.addRule('strike', {
      filter: ['s'],
      replacement: (content) => {
        return `~~${content}~~`
      }
    }) --> add strike 
}

messageSent(){

    if(!this.text){
      return;
    }

    const markdown = this.turndownService.turndown(this.text);

    this.messageService.send(markdown)
    
    this.text="";
    
  }

//html
<markdown  [innerHTML]="markdown | sanitized"></markdown>

// app module.ts

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';



imports: [
MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
      }
    }),

}
