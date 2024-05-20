import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
  const formData = new FormData();
  formData.append('type', 'Horizontal Strip');
  formData.append('tags', 'animal,animals,pet,pets,dog,cat,drink,food,clothing,fashion');

// Define the loadAd function
function loadAd(data: FormData) {
  const iframe = document.getElementById('adIframe') as HTMLIFrameElement | null;
  if (!iframe) {
      console.error('Iframe element not found');
      return;
  }

  const adServerUrl = 'https://ad.simaneka.com/api/get'; // Replace with your ad server URL

  const adRequest = new XMLHttpRequest();
  adRequest.open('POST', adServerUrl, true);
  // Set authorization header
  adRequest.setRequestHeader("Authorization", "yvUIGkL3un3iOxqbJpzbv5G6RJCLKoy1");
  adRequest.onreadystatechange = function () {
      if (adRequest.readyState === 4) {
          if (adRequest.status === 200) {
              if (iframe.contentDocument && iframe.contentWindow && iframe.contentWindow.document) {
                console.log("connection established.");
                  const doc = iframe.contentDocument || iframe.contentWindow.document;
                  doc.open();
                  doc.write(adRequest.responseText);
                  doc.close();
              } else {
                  console.error('Iframe content document/window is null');
              }
          } else {
              console.error('Failed to load ad. Status code: ' + adRequest.status);
          }
      }
  };
  adRequest.send(data);
}

// Listen for custom events
document.addEventListener('adDataReceived', function (event: Event) {
  console.log("listening...");
  const customEvent = event as CustomEvent;
  const data = customEvent.detail as FormData;
  loadAd(data);
});


/*
var formdata = new FormData();
formdata.append("type", "Verticle Strip");
formdata.append("tags", "animal,animals,pet,pets,dog,cat,drink,food,clothing,fashion");

var ajax = new XMLHttpRequest();
ajax.addEventListener("load", completeHandler, false);

ajax.open("POST", "https://ad.simaneka.com/api/get");
ajax.setRequestHeader("authorisation", "yvUIGkL3un3iOxqbJpzbv5G6RJCLKoy1");

ajax.send(formdata);

function completeHandler(event: ProgressEvent<XMLHttpRequestEventTarget>) {
  const xhr = event.target as XMLHttpRequest | null;
  if (xhr) {
      const response = JSON.parse(xhr.responseText);

      console.log(response);

      const advertIMG = document.querySelector('.advertIMG') as HTMLImageElement | null;
      const anchorElement = document.querySelector('.anchorElement') as HTMLAnchorElement | null;
      const headerText = document.querySelector('.headerText') as HTMLElement | null;

      if (advertIMG) {
          advertIMG.src = response.link || '';
          advertIMG.alt = response.alt || '';
      }

      if (anchorElement) {
          anchorElement.href = response.href;
      }

      if (headerText) {
          headerText.innerHTML = response.message;
      }
  } else {
      console.error('event.target is null');
  }
}*/


