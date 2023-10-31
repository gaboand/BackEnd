import React from "react";
import appFirebase from '../../services/firebase/firebaseConfig'
import './Form.css';
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'


const db = getFirestore(appFirebase)
const storage = getStorage(appFirebase)

const Form = () => {

    let urlImg;

    const guardarInfo = async(e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const precio = e.target.precio.value;
        const stock = e.target.stock.value;
        const description = e.target.description.value; 
        const category = e.target.category.value;

        const newPrenda = {
            name: name,
            precio: precio,
            stock: stock,
            description: description,
            category: category,
            img: urlImg
        }

        // funcion de guardado
try {
    const docRef = await addDoc(collection(db, 'products'), newPrenda);
    console.log('Documento escrito con ID: ', docRef.id);
} catch (error) {
    console.error('Error al escribir el documento: ', error);
}

        e.target.name.value = '';
        e.target.precio.value = '';
        e.target.stock.value = '';
        e.target.description.value = '';
        e.target.category.value = '';
        e.target.file.value = '';
    } 

const fileHandler = async (e) => {
    //detectar el archivo
    const archivoI = e.target.files[0];
    //cargar al storage
    const refArchivo  = ref(storage, `documentos/${archivoI.name}` )
    await uploadBytes(refArchivo, archivoI)
    //obtener la url de la imagen
    urlImg = await getDownloadURL(refArchivo)
}

    return(
        <div className="container">
            <h3>Agregar Producto</h3>
            <form className="formulario"  onSubmit={guardarInfo}>
                
                <input className="campos" type="text" id="name" placeholder='Nombre' required />

                <input className="campos" type="number" id="precio" placeholder='Precio' required />

                <input className="campos" type="number" id="stock" placeholder='Stock' required />

                <input className="campos" type="text" id="description" placeholder='Descripción' required />

                <input className="campos" type="text" id="category" placeholder='Categoría' required />

                <div className="file-container">
                    <label className="etiqueta-imagen" htmlFor="file">Seleccione la Imagen</label>
                    <input className="boton-imagen" type="file" id ="file" placeholder='Imagen' onChange={fileHandler} required/>    
                </div>
                
                <button className="boton">Guardar</button>
            </form>
        </div>
    )
}

export default Form