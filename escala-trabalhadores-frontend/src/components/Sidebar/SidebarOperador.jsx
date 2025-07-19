import "../../styles/SidebarOperador.css";

import { FaHome, FaClipboardList, FaChartBar, FaFileAlt } from 'react-icons/fa';
import { useState } from 'react';

function SidebarOperador() {
  const [hovered, setHovered] = useState(false);

  return (
    <aside
      className={`sidebar ${hovered ? 'expanded' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="sidebar-top">
        <div className="sidebar-logo">logo</div>
        <nav className="sidebar-menu">
          <a href="#" className="sidebar-item"><FaHome /> <span>Início</span></a>
          <a href="#" className="sidebar-item"><FaClipboardList /> <span>Chamadas</span></a>
          <a href="#" className="sidebar-item"><FaChartBar /> <span>Relatórios</span></a>
          <a href="#" className="sidebar-item"><FaFileAlt /> <span>Documentos</span></a>
        </nav>
      </div>
    </aside>
  );
}

export default SidebarOperador;
