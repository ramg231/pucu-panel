import {
  Title,
  Tab,
  TabGroup,
  TabList,
  Card,
  Grid,
  TabPanel,
  TabPanels,
} from "@tremor/react";
import { Link } from "react-router-dom";
import {useAuth} from "../context/AuthContext"
import React, { useState } from "react";
import CardsCajeros from "../components/CardsCajeros";
import Meta from "../components/Meta";

function DashboardBase() {
  const {logout} = useAuth()
  return (
    <main className="bg-slate-200 p-6 sm:p-10">
      <Title className="text-black text-5xl font-bold" >
        DASHBOARD DE REPORTES DE LA MUNICIPALIDAD DISTRITAL DE PUCUSANA
      </Title>
        <TabGroup>
        <TabList className="text-black text-3x1 font-bold mt-6">
          <Tab>META</Tab>
          <Tab>INGRESO POR CAJEROS</Tab>
          <Tab><Link  to='/' onClick={()=>{
          logout()
        }} >SALIR</Link> </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Meta />
          </TabPanel>
          <TabPanel>
            <Grid className="mt-6">
              <div>
                <CardsCajeros />
              </div>
            </Grid>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}

export default DashboardBase;
