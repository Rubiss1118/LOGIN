
   // PROTECCIÓN DE ACCESO
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si está logueado
  if (sessionStorage.getItem('cafitoLoggedIn') !== 'true') {
    alert('⚠️ Acceso denegado. Debes iniciar sesión primero.');
    window.location.href = 'login.html';
    return;
  }});
    document.addEventListener('DOMContentLoaded', function() {
      // Add click effect to order buttons
      document.querySelectorAll('.btn-order').forEach(button => {
        button.addEventListener('click', function() {
          const productName = this.closest('.product-card').querySelector('.product-title').textContent;
          const price = this.closest('.product-card').querySelector('.product-price').textContent;
          
          // Cambiar temporalmente el texto del botón
          const originalText = this.textContent;
          this.innerHTML = '<i class="bi bi-check-circle me-1"></i>¡Agregado!';
          this.classList.add('btn-success');
          this.classList.remove('btn-order');
          
          // Restaurar después de 2 segundos
          setTimeout(() => {
            this.textContent = originalText;
            this.classList.remove('btn-success');
            this.classList.add('btn-order');
          }, 2000);
          
          console.log(`Producto ordenado: ${productName} - ${price}`);
        });
      });
    });
  
