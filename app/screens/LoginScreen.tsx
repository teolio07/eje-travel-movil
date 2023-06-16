import { StyleSheet,TextInput,Button,Alert,ScrollView,Text, View } from 'react-native';
import React, { useState } from 'react';


export default function TabOneScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisibleLogin, setIsVisibleLogin] = useState(true);
  

  const executeFunctionLogin = () => {
    // Lógica de tu función aquí
    // Por ejemplo, puedes cambiar la visibilidad del componente
    setIsVisibleLogin(false);
  };

  const handleEmailChange = (text:string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text:string) => {
    setPassword(text);
  }
  const handleSubmitLogin = async () => {
    // Crear un objeto FormData y agregar los campos del formulario
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Password', password);
    formData.append('Type', '3');


    try {
      // Enviar los datos del formulario mediante una solicitud POST usando fetch
      const response = await fetch('https://apimainejetravel.azurewebsites.net/api/Autenticacion/Validar', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // La solicitud fue exitosa
        const data = await response.json();

        
        if(data.response == "No estas registrado, registrate!"){
          return Alert.alert('No estas registrado');
        }
        Alert.alert('Sesion iniciada')
        executeFunctionLogin();
        console.log('Respuesta del servidor:', data.response);
      } else {
        // La solicitud falló
        console.error('Error en la solicitud:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }

    };

    const handleSubmitRegister = async () => {
      // Crear un objeto FormData y agregar los campos del formulario
      const formData = new FormData();
      formData.append('Email', email);
      formData.append('Password', password);
      formData.append('Type', '3');
  
  
      try {
        // Enviar los datos del formulario mediante una solicitud POST usando fetch
        const response = await fetch('https://apimainejetravel.azurewebsites.net/api/Autenticacion/Validar', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          // La solicitud fue exitosa
          const data = await response.json();
  
          
          if(data.response == "No estas registrado, registrate!"){
            return Alert.alert('No estas registrado');
          }
          Alert.alert('Sesion iniciada')
          executeFunctionLogin();
          console.log('Respuesta del servidor:', data.response);
        } else {
          // La solicitud falló
          console.error('Error en la solicitud:', response.status);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
  
      };
  return (
    <ScrollView >
      <View  style={styles.containerMain}>
      
            {isVisibleLogin && (
        
            <View style={styles.containerForm}>
        
              <Text style={styles.title}>Inicio sesión</Text>
              
              <TextInput
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Ingrese email"
                placeholderTextColor="gray"
                style={styles.boxInput}
              />

              <TextInput
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
                placeholder="Ingrese contraseña"
                placeholderTextColor="gray"
                style={styles.boxInput}
              />
              <Button  title="Iniciar sesión" onPress={handleSubmitLogin} />
              
              
            </View>
        
      )}
  
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    height: '270%',
    width: '100%',
    backgroundColor:'orange',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  containerForm: {
    width:'90%',
    height: '90%',
    backgroundColor:'white',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    zIndex:2
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
    top: '8%',
    left: '8%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  boxInput:{
    borderWidth:1,
    borderColor:'black',
    height:'7.5%',
    width:'80%',
    padding:'2%',
    marginTop:'8%',
    marginBottom:'4%',

  },
  buttonForm:{
    margin:'10%',
    borderBottomWidth: 5,
    borderBottomColor: 'black',
  }
});
