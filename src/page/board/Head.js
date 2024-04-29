import React from 'react';

function Header( {setIsAdding}) {
    return (
        <header>
            <h1>Employee Project - assesment</h1>
            <div>
            <button onClick={()=>setIsAdding(true)} className='btn'>ADD Button</button>

            </div>
        </header>
    );
}

export default Header;
