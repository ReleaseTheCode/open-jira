import { Typography } from "@mui/material";
import { NextPage } from "next/types";
import { Layout } from '../Components/layouts';


const HomePage: NextPage = () => {
  return (
    <Layout title='OpenJira Next'>
      <Typography variant="h1" color='primary'>Next Mundo</Typography>
    </Layout>
  )
}

export default HomePage;
