
import React, { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/hero/hero';
import Certifications from './components/Certifications/Certifications';
import Header from './components/header/Header';
import Projects from './components/projects/Projects';

// Carga perezosa de componentes
const SobreMi = lazy(() => import('./components/about/SobreMi'));
const CertificationsPage = lazy(() => import('./components/Certifications/CertificationsPage'));
const Proyectos = lazy(() => import('./components/projects/Proyectos'));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Hero />
              <Certifications />
              <Projects />
            </Layout>
          } />
          <Route path='/inicio' element={
            <Layout>
              <Hero />
              <Certifications />
              <Projects />
            </Layout>
          }/>
          <Route path="/sobre-mi" element={
            <Layout>
              <SobreMi />
            </Layout>
          } />
          <Route path="/certificaciones" element={
            <Layout>
              <CertificationsPage />
            </Layout>
          } />
          
          <Route path="/Proyectos" element={
            <Layout>
              <Proyectos />
            </Layout>
          } />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
