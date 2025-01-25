import React from 'react'

export default function Menu() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="/homeAdmin" className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                    <span className="brand-text font-weight-light">Admin</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    

                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">                                       
                                           
                        <li className="nav-header mt-3">PRODUTOS</li>
                            <li className="nav-item">
                                <a href="/cadastrarProduto" className="nav-link">
                                    <i className="nav-icon fas fa-plus-circle" />
                                    <p>
                                        Cadastrar
                                    </p>
                                </a>
                            </li>
                        <li className="nav-item">
                            <a href="/listarProdutos" className="nav-link">
                                <i className="nav-icon fas fa-list "/>
                                <p>
                                    Listar
                                </p>
                            </a>
                        </li>
                        <li className="nav-header mt-3">FORNECEDOR</li>
                            <li className="nav-item">
                                <a href="/cadastrarFornecedor" className="nav-link">
                                    <i className="nav-icon fas fa-plus-circle" />
                                    <p>
                                        Cadastrar
                                    </p>
                                </a>
                            </li>
                        <li className="nav-item">
                            <a href="/listarFornecedor" className="nav-link">
                                <i className="nav-icon fas fa-list "/>
                                <p>
                                    Listar
                                </p>
                            </a>
                        </li>
                        <li className="nav-header mt-3">ESTOQUE</li>
                            <li className="nav-item">
                                <a href="/gerarEstoque" className="nav-link">
                                    <i className="nav-icon fas fa-plus-circle" />
                                    <p>
                                        Inserir
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/listarEstoque" className="nav-link">
                                    <i className="nav-icon fas fa-list" />
                                    <p>
                                        Listar
                                    </p>
                                </a>
                            </li>
                            <li className="nav-header mt-3">OPERADOR</li>
                            <li className="nav-item">
                                <a href="/cadastrarOperador" className="nav-link">
                                    <i className="nav-icon fas fa-user-plus" />
                                    <p>
                                        Cadastrar
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/listarOperador" className="nav-link">
                                    <i className="nav-icon fas fa-list" />
                                    <p>
                                        Listar
                                    </p>
                                </a>
                            </li>
                    </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        )
}
