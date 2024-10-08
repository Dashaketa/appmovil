import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /* Objeto JSON para usuario */
  user = {
    username: '',
    password: '',
    nombre: '',
    apellido:'',
    fechaNacimiento:''
  };
  showPassword:boolean=false;
  /* mensaje de respuesta */
  mensaje = '';
  /* Estado de carga */
  spinner = false;

  constructor(private router: Router, private animationController: AnimationController) {


  }
  ngAfterContentInit() {
    this.animarLogin();
  }
  animarLogin() {
    /* seleccionamos el item desde el Front con un query selector y reconocemos el elemento como HTMLElement para que sea compatible con la animacion */
    const loginIcon = document.querySelector(".login img") as HTMLElement;
    /* Creamos y configuramos la animacion */
    const animacion = this.animationController.create()
      .addElement(loginIcon)
      .duration(4000)
      .iterations(Infinity)
      /* la configuracion de keyframe permite editar el diseño segun el tiempo de la animacion empezando desde 0 hasta 1 usando los decimales(0.5,0.25 ,0.2) */
      .keyframes([
        { offset: 0, transform: 'translateX(0)', opacity: '1' },// Empieza en el centro
        { offset: 0.5, transform: 'translateX(50vw)', opacity: '0.2' }, // Se mueve a la derecha y cambia la opacidad 
        { offset: 1, transform: 'translateX(0)', opacity: '1' } // Vuelve al centro
      ]);
    animacion.play();
  }

  /* NGIF = permite realizar una validacion entre html y ts validando que la variable sea true o false */
  /* Permite cambiar el valor por defecto del spinner y comprobarlo con ngIF */
  cambiarSpinner() {
    this.spinner = !this.spinner;
  }
  validar() {
    const complexPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.,\-!])[a-zA-Z0-9.,\-!]*$/;
    if (this.user.username.length != 0) {
      if (this.user.password.length >= 8 && complexPattern.test(this.user.password)) {
        //Funciona
        this.mensaje = 'Conexion exitosa';
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
            password: this.user.password,
          },
        };
        this.cambiarSpinner();
        /* setTimeout = permite generar un pequeño delay para realizar la accion */
        setTimeout(() => {

          this.router.navigate(['/perfil'], navigationExtras);
          this.cambiarSpinner();
          this.mensaje = "";
        }, 3000);
      } else {
        console.log('Contraseña vacia');
        this.mensaje = 'Su contraseña debe tener un largo de 8 caracteres y contener al menos 1 número, 1 letra y 1 símbolo';
        //No funciona
      }
    } else {
      console.log('Usuario vacio');
      this.mensaje = 'Usuario Vacio';
      //Tampoco funciona
    }
  }
  /* Método para alternar la visibilidad de la contraseña */
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}

