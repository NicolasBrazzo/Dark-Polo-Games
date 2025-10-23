function loadSidebar() {
  const sidebarHTML = `
    <div class="sidebar-header-background"></div>

    <div class="sidebar-container-main">
      <button id="sidebar-toggle" class="sidebar-toggle-btn">
        <i data-lucide="menu" class="sidebar-toggle-icon"></i>
      </button>

      <aside class="sidebar-component">
        <div class="sidebar-title">
          <h3>Menu</h3>
        </div>
        <ul>
          <li>
            <i data-lucide="house" class="convert-clients-instruction-icon close-icon"></i>
            <a href="/index.html">Home</a>
          </li>
          <li>
            <i data-lucide="house" class="convert-clients-instruction-icon close-icon"></i>
            <a href="/userType/professionals/dashboard/profesDashboard.html">Dashboard</a>
          </li>
          <li>
            <i data-lucide="calendar" class="convert-clients-instruction-icon close-icon"></i>
            <a href="/userType/professionals/page-calendar/calendar.html">Calendario</a>
          </li>
          <li>
            <i data-lucide="user-pen" class="convert-clients-instruction-icon close-icon"></i>
            <a href="/userType/professionals/page-customer-management/customer-management.html">Gestione Clienti</a>
          </li>
          <li>
            <i data-lucide="pickaxe" class="convert-clients-instruction-icon close-icon"></i>
            <a href="/userType/professionals/page-services/services.html">Servizi</a>
          </li>
          <li>
            <i data-lucide="settings" class="convert-clients-instruction-icon close-icon"></i>
            <a href="/userType/professionals/page-settings/settings.html">Impostazioni</a>
          </li>
        </ul>
      </aside>
    </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
  
  // Reinizializza Lucide icons dopo aver inserito la sidebar
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Carica la sidebar quando il DOM è pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSidebar);
} else {
  loadSidebar();
}