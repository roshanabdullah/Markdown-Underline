//custom renderer
import { Renderer } from "marked";


export class CustomRenderer extends Renderer {
    constructor(){
        super();
    }

    override text(text: string): string {

        const underlineRegex = /\+\+(.*?)\+\+/g;
        const result = text.replace(underlineRegex, '<u>$1</u>')
        return result;  --> add underline by using text ++text++
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
<markdown  [data]="markdown"></markdown>

// app module.ts

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { CustomRenderer } from './file';



imports: [
MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: () => {
          return {
            renderer: new CustomRenderer()
          }
        }
      }
    }),

}
