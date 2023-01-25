import { NextPage } from "next/types";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Layout } from '../Components/layouts';
import { useContext } from 'react';
import { EntriesContext } from '../context/entries/EntriesContext';
import { EntryList, NewEntry } from "@/Components/ui";


const HomePage: NextPage = () => {
  const { entries } = useContext( EntriesContext )
  return (
    <Layout title='OpenJira Next'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="TO DO" />
              <NewEntry />
              <EntryList status='pending' />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="WIP" />
            <EntryList status='in-progress' />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="DONE" />
            <EntryList status='finished' />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage;
