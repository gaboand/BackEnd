import React, { useEffect, useState } from "react";
import './Lista.css';
import appFirestone from '../../services/firebase/firebaseConfig'
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(appFirestone);

const Lista = () => {
    console.log('Renderizando Lista');
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    }
    getLista();
  }, []);

  return (
    <div className="tablacontainer">
      <h3>Stock de Productos</h3>
      <table className="table">
        <thead>
          <tr className="titlestyle">
            <th scope="col1">Nombre</th>
            <th scope="col2">Precio</th>
            <th scope="col2">Stock</th>
            <th scope="col2">Descripción</th>
            <th scope="col2">Categoria</th>
            <th scope="col3">Imagen</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((List) => (
            <tr className="rowstyle" key={List.id}>
              <td className="columna1">{List.name}</td>
              <td className="columna2">$ {List.precio}</td>
              <td className="columna2">{List.stock}</td>
              <td className="columna2">{List.description}</td>
              <td className="columna2">{List.category}</td>
              <td className="columna3"><img height={50} width={32} src={List.img} alt="prenda" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Lista;
