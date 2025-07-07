document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");
  const loginButton = document.getElementById("loginButton");
  
  // Variables para el componente de ojo
  const inputContraseña = document.getElementById("password");
  const contenedorOjo = document.getElementById("contenedorOjo");
  const globosOculares = contenedorOjo.querySelectorAll('.globo-ocular');
  let esContraseñaVisible = false;
  let intervaloParpadeo;
  let intervaloMirarAlrededor;

  // ========== LÓGICA DEL LOGIN ==========
  
  // Handle form submission
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Credenciales válidas
    const CREDENCIALES_ADMIN = {
      email: "programacionweb@gmail.com",
      password: "programacion123"
    };

    // Validación básica
    if (!email || !password) {
      mostrarError("Por favor ingrese ambos campos");
      return;
    }

    // Mostrar estado de carga
    const originalButtonText = loginButton.innerHTML;
    loginButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span>PROCESANDO...';
    loginButton.disabled = true;

    // Simular validación
    setTimeout(() => {
     if (email === CREDENCIALES_ADMIN.email && password === CREDENCIALES_ADMIN.password) {
  // CREAR SESIÓN
  sessionStorage.setItem('cafitoLoggedIn', 'true');
  sessionStorage.setItem('cafitoUser', email);
  sessionStorage.setItem('cafitoLoginTime', new Date().getTime());
  
  loginButton.innerHTML = '<i class="bi bi-check-circle me-2"></i>¡BIENVENIDO!';
        
// Verificar si ya está logueado al cargar la página
if (sessionStorage.getItem('cafitoLoggedIn') === 'true') {
  window.location.href = "dasboard.html";
  return;
}
      } else {
        mostrarError("Correo o contraseña incorrectos. Por favor, intenta nuevamente.");
        loginButton.innerHTML = originalButtonText;
        loginButton.disabled = false;
      }
    }, 1500);
  });
  
  function mostrarError(mensaje) {
    errorMessage.textContent = mensaje;
    errorMessage.classList.add("show");
    loginForm.classList.add("shake");
    setTimeout(() => loginForm.classList.remove("shake"), 500);
    
    setTimeout(() => {
      errorMessage.classList.remove("show");
    }, 5000);
  }
  
  // Add input focus effects with Bootstrap validation
  const inputs = document.querySelectorAll(".form-control");
  inputs.forEach(input => {
    input.addEventListener("focus", function() {
      this.classList.remove("is-invalid");
      errorMessage.classList.remove("show");
    });
    
    input.addEventListener("blur", function() {
      if (this.hasAttribute('required') && this.value.trim() === "") {
        this.classList.add("is-invalid");
      } else {
        this.classList.remove("is-invalid");
      }
    });
  });

  // ========== FUNCIONES DEL COMPONENTE DE OJO ==========
  
  // Función para parpadeo automático
  function iniciarParpadeo() {
    intervaloParpadeo = setInterval(() => {
      if (Math.random() > 0.7) {
        const ojos = contenedorOjo.querySelectorAll('.ojo-individual');
        ojos.forEach(ojo => {
          ojo.style.animation = 'parpadear 0.3s ease';
        });
        setTimeout(() => {
          ojos.forEach(ojo => {
            ojo.style.animation = '';
          });
        }, 300);
      }
    }, 3000);
  }

  // Movimiento aleatorio de ojos
  function iniciarMirarAlrededor() {
    intervaloMirarAlrededor = setInterval(() => {
      // No mover los ojos si están enojados
      if (contenedorOjo.classList.contains('enojado')) {
        return;
      }

      if (!contenedorOjo.matches(':hover') && Math.random() > 0.6) {
        const x = (Math.random() - 0.5) * 4;
        const y = (Math.random() - 0.5) * 4;

        globosOculares.forEach(globoOcular => {
          globoOcular.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });

        setTimeout(() => {
          if (!contenedorOjo.classList.contains('enojado')) {
            globosOculares.forEach(globoOcular => {
              globoOcular.style.transform = 'translate(-50%, -50%)';
            });
            contenedorOjo.classList.remove('mirando');
          }
        }, 1500);
      }
    }, 4000);
  }

  // Seguimiento del mouse mejorado
  function seguirRaton(e) {
    // No seguir el mouse si el ojo está enojado
    if (contenedorOjo.classList.contains('enojado')) {
      return;
    }

    const rect = contenedorOjo.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centroX;
    const deltaY = e.clientY - centroY;
    const angulo = Math.atan2(deltaY, deltaX);
    const distancia = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const movimientoMaximo = 3;
    const distanciaMovimiento = Math.min(movimientoMaximo, distancia / 30);

    const x = Math.cos(angulo) * distanciaMovimiento;
    const y = Math.sin(angulo) * distanciaMovimiento;

    globosOculares.forEach(globoOcular => {
      globoOcular.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });

    contenedorOjo.classList.add('mirando');
  }

  // Seguimiento del mouse en toda la página
  document.addEventListener('mousemove', seguirRaton);

  // Toggle de visibilidad de contraseña con cejas enojadas
  contenedorOjo.addEventListener('click', function () {
    esContraseñaVisible = !esContraseñaVisible;

    contenedorOjo.classList.remove('contraseña-visible', 'contraseña-oculta', 'mirando', 'enojado');

    if (esContraseñaVisible) {
      inputContraseña.type = 'text';
      contenedorOjo.classList.add('contraseña-visible');
    } else {
      inputContraseña.type = 'password';
      contenedorOjo.classList.add('contraseña-oculta');
      contenedorOjo.classList.add('enojado'); // Activar enojo con cejas
      
      // Quitar el enojo después de 3 segundos
      setTimeout(() => {
        contenedorOjo.classList.remove('enojado');
      }, 3000);
    }
  });

  // Eventos del mouse para el ojo
  contenedorOjo.addEventListener('mouseenter', function () {
    clearInterval(intervaloParpadeo);
    clearInterval(intervaloMirarAlrededor);
    contenedorOjo.classList.add('mirando');
  });

  contenedorOjo.addEventListener('mouseleave', function () {
    setTimeout(() => {
      globosOculares.forEach(globoOcular => {
        globoOcular.style.transform = 'translate(-50%, -50%)';
      });
      contenedorOjo.classList.remove('mirando');
    }, 200);
    iniciarParpadeo();
    iniciarMirarAlrededor();
  });

  // Parpadeo al enfocar el input
  inputContraseña.addEventListener('focus', function () {
    const ojos = contenedorOjo.querySelectorAll('.ojo-individual');
    ojos.forEach(ojo => {
      ojo.style.animation = 'parpadear 0.5s ease';
    });
    setTimeout(() => {
      ojos.forEach(ojo => {
        ojo.style.animation = '';
      });
    }, 500);
  });

  // Iniciar animaciones automáticas del ojo
  iniciarParpadeo();
  iniciarMirarAlrededor();
});
