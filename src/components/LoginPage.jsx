import {  useForm} from "react-hook-form";
 import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
 function LoginPage() {

    const { 
      register,
      handleSubmit,
      formState: {errors },
    } = useForm();

    const{signin, errors: signinErrors,isAuthenticated} =  useAuth();
    const navigate = useNavigate()

  const onSubmit = handleSubmit((data)=>{
    signin(data)
  });

  useEffect(()=>{
    if(isAuthenticated) navigate('/dashboard')
  },[isAuthenticated])
   return (
     
    <div className=" h-screen w-[400px] flex flex-col justify-center items-center mx-auto" >
      
        { signinErrors.map((error,i) =>(
          <div  className=" bg-cyan-200 bg-opacity-60 p-1 text-black font-semibold" key={i}>
            {error}
          </div>
        ))}
      <form  className="bg-teal-100  bg-opacity-45  h-96  justify-center space-y-3 w-[350px] rounded-lg flex flex-col"  onSubmit={onSubmit}>
        <center> <img src="https://i.imgur.com/0Pn6RMu.png" alt="Escudo de la Municipalidad Distrital de Pucusana" className="w-[100px] md:w-[80px] lg:w-[100px] xl:w-[120px]" />  </center>
        <center className="text-black text-3x1 font-bold" >BIENVENIDO AL PANEL ESTADISTICO MUNICIPAL</center>
        <center>
        <input type="text" {...register("username",{required:true})}
            className="w-[300px]   rounded-lg flex px-3  bg-cyan-200 bg-opacity-60 hover:bg-teal-200  border text-black font-extrabold border-white h-10"
            placeholder="usuario"
        />
        
        {
          errors.username &&(
            <p className=" bg-cyan-200 bg-opacity-60 p-1 text-black font-semibold" > El usuario es requerido  </p>
          )
        }
        </center>
        <center>
        <input type="password" {...register("password",{required:true})} 
        className="w-[300px] rounded-lg flex px-3 bg-cyan-200 bg-opacity-60  hover:bg-teal-200   border  text-black font-extrabold  border-white h-10"
        placeholder="contraseña"
      
        />
         {
          errors.password &&(
            <p className=" bg-cyan-200 bg-opacity-60 p-1 text-black font-semibold"  > La contraseña es requerida  </p>
          )
        }
        </center>
        <center>
        <button className="w-[100px]  text-black bg-teal-300 bg-opacity-60 hover:bg-teal-600 active:bg-teal-700 h-10 rounded-lg text-lg font-bold" type="submit"> Iniciar </button>
        </center>
        </form>
     </div>
     
   )
 }
 
 export default LoginPage