import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  icon = null;
  type = "dark";
  title = "alert";

  constructor() { }

  public show(style = null, message = null) {

    if(style == "success") {
      this.type = "success";
      this.icon = "fas fa-check";
      this.title = "Concluido !";  
    }
    if(style == "danger") {     
      this.type = "danger";
      this.icon = "fas fa-close";
      this.title = "Ops!";     
    }


    $.notify({
      // options
      icon: this.icon,
      title: this.title,
      message: message,
    }, {
      // settings
      type: this.type,
      template: '<div data-notify="container" class="alert_custom col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<p>' +
        '<span data-notify="icon"></span> ' +
        '<strong data-notify="title">{1}</strong> ' +
        '</p>' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}
