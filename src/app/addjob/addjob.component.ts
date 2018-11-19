import { Component, OnInit } from '@angular/core';
import { exec, init } from 'pell'

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  editor = init({
    element: document.getElementById('editor'),
    onChange: html => {
      document.getElementById('html-output').textContent = html
    },
    defaultParagraphSeparator: 'p',
    styleWithCSS: true,
    actions: [
      'bold',
      'underline',
      {
        name: 'italic',
        result: () => exec('italic')
      },
      {
        name: 'backColor',
        icon: '<div style="background-color:pink;">A</div>',
        title: 'Highlight Color',
        result: () => exec('backColor', 'pink')
      },
      {
        name: 'image',
        result: () => {
          const url = window.prompt('Enter the image URL')
          if (url) exec('insertImage', url)
        }
      },
      {
        name: 'link',
        result: () => {
          const url = window.prompt('Enter the link URL')
          if (url) exec('createLink', url)
        }
      }
    ],
    classes: {
      actionbar: 'pell-actionbar-custom-name',
      button: 'pell-button-custom-name',
      content: 'pell-content-custom-name',
      selected: 'pell-button-selected-custom-name'
    }
  })

  // editor.content<HTMLElement>
  // To change the editor's content:
  // editor.content.innerHTML = '<b><u><i>Initial content!</i></u></b>'

}
