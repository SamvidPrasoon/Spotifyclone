import Head from 'next/head'
import Sidebar from "../components/sidebar"
import Center from "../components/center"
import { getSession } from 'next-auth/react'
export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden '>
      <Head>
        <title>Spot on</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
     <div className='flex'>
       <Sidebar/>
       <Center/>
     </div>

    </div>
  )
}
export async function getServerSideProps(context){
  const session = await getSession(context)
  return {
      props:{
        session
      }
  }
} 