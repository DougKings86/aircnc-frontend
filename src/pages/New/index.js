import React  , {useState , useMemo }from 'react';
import camera from '../../assets/camera.svg';
import api from '../../services/api';
import './styles.css';

export default function New({history}){
    const [company , setCompany] = useState('');
    const [techs , setTechs] = useState('');
    const [price , setPrice] = useState('');
    const [thumbnail , setThumbnail] = useState(null);

    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData();
        data.append('thumbnail' , thumbnail);
        data.append('company' , company);
        data.append('techs' , techs);
        data.append('price' , price);
        const user_id = localStorage.getItem('user');

        await api.post(
            '/spots' ,
             data , {
             headers : { user_id } 
            });
            history.push('/dashboard');
    }
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    } ,
        [thumbnail]
    );
    
    return (
        <form onSubmit={handleSubmit}>
            
            <label 
                id="thumbnail" 
                style={{ backgroundImage : `url(${preview}`}}
                className={thumbnail ? 'has_thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select Img"/>
            </label>


            <label htmlFor="company">EMPRESA*</label>
            <input 
                id="empresa"
                placeholder="Sua empresa Incrível"
                value={company}
                onChange={event => setCompany(event.target.value)}
                />
            <label htmlFor="techs">TECNOLOGIAS* <span>(separadas por vírgula)</span></label>
            <input 
                id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}          
            />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input 
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />
            <button type="submit" className="btn">
                Cadastrar
            </button>
        </form>
    )
}
