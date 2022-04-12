﻿import React from 'react'
import { Route } from 'react-router'
import Layout from '.././layout/Layout'
import Home from '.././pages/Home'
import Empresas from '../pages/Empresas'
import Funcionarios from '../pages/Funcionarios'
import Categoria from '../pages/Categorias'
import Perguntas from '../pages/Perguntas'

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/empresas" component={Empresas} />
    <Route path="/funcionarios" component={Funcionarios} />
    <Route path="/categoria" component={Categoria} />
    <Route path="/perguntas" component={Perguntas} />
  </Layout>
);
