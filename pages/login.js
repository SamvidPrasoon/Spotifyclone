import {getProviders,signIn} from "next-auth/react"
const Login = ({providers}) => {
    return ( 
        <div className=" bg-black flex flex-col items-center justify-center w-full h-screen">
          

           <img  className="w-72 mb-5" src="https://raw.githubusercontent.com/detain/svg-logos/780f25886640cef088af994181646db2f6b1a3f8/svg/spotify-1.svg "/>
          {Object.values(providers).map((provider)=>(
              <div key={provider.name}>
              <button onClick={()=>signIn(provider.id,{callbackUrl:"/"})} className=" bg-green-500 p-5 rounded-full text-blue-50 text-bold text-lg">
                 Login with {provider.name}
              </button>
              </div>


          ))}


          
        </div>
     );
}
 
export default Login;
export const getServerSideProps =  async()=>{
   const providers = await getProviders()
    return{
      props:{
        providers,
      },
    }
  }