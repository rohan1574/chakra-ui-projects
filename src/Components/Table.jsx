import React, { useEffect, useState } from 'react';
import { getData, removeCard } from '../../public/localStorage';

const Table = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        setData(getData())
      }, [])
      console.log(data)

      const handleDelete=(id)=>{
        console.log(id)
        removeCard(id)
      }
    return (
        <div>
           {
            data.map((item, i) =>{
                return <div>
                    <h1>{item.lastName}</h1>
                    {item?.statusName === 'complete' ? <h1 className='text-red-500' >{item.statusName}</h1> : <div>{item.statusName}</div> }
                    <button onClick={()=>handleDelete(item.id)} className='border border-syan-500'>delete</button>
                </div>
            })
           }
        </div>
    );
};

export default Table;